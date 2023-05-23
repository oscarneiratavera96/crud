import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import { useTodoApi } from "../../services/todoServices";
import { Todo } from "../../services/models/TodoModels";
import {
  actualizarTodoEditar,
  initialState,
} from "../../store/reducer/reducer";
import { useDispatch } from "react-redux";
import "../../assets/styles/TodoList.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Hook de la api de todos
   */
  const todoApi = useTodoApi();

  /**
   * useEffect es un hook de react que se ejecuta cuando el componente se monta y dispara el evento fetchTodos y poner el todo a editar en el estado inicial
   */
  useEffect(() => {
    fetchTodos();
    dispatch(actualizarTodoEditar(initialState.todo));
  }, []);

  /**
   * Función que trae los todos de la api
   */
  const fetchTodos = async () => {
    const todos = await todoApi.getTodos();
    setTodos(todos);
  };

  /**
   * Función que elimina un todo de la api
   * @param id id del todo a eliminar
   */
  const handleDeleteTodo = async (id: string) => {
    await todoApi.deleteTodo(id);
    fetchTodos();
  };

  /**
   * Función que edita un todo y lo pone en el estado del redux
   * @param todo todo a editar
   */
  const handleEditTodo = (todo: Todo) => {
    dispatch(actualizarTodoEditar(todo));
    navigate(`/dashboard/edit/${todo._id}`);
  };

  /**
   * Función que redirige a la página de creación de un todo
   */
  const handleCreateTodo = () => {
    navigate("/dashboard/create");
  };

  /**
   * Columnas de la tabla de todos
   */
  const columns = [
    {
      title: "Titulo",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Completeda",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (completed ? "Si" : "No"),
    },
    {
      title: "Hashtags",
      dataIndex: "hashtags",
      key: "hashtags",
      render: (hashtags: string[]) => hashtags.join(", "),
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "actions",
      render: (_: any, todo: Todo) => (
        <>
          <Button onClick={() => handleEditTodo(todo)}>Edit</Button>{" "}
          <Button onClick={() => handleDeleteTodo(todo._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "30px 100px" }}>
      <h1>Todo List</h1>
      <Button
        className="create-button"
        type="primary"
        onClick={handleCreateTodo}
      >
        Crear nueva tarea
      </Button>
      <Table columns={columns} dataSource={todos} rowKey="_id" />
    </div>
  );
};

export default TodoList;
