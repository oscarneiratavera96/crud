import { useNavigate } from "react-router-dom";
import { useTodoApi } from "../../services/todoServices";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Form, Input, Select, Checkbox, Button, Row, Col } from "antd";

const TodoForm: React.FC<{}> = () => {
  /**
   * Selector del todo que esta en el redux
   */
  const todo = useSelector((state: RootState) => state.homeReducer.todo);

  /**
   * Formulario de antd
   */
  const [form] = Form.useForm();

  /**
   * Hook de react router dom para navegar entre paginas
   */
  const navigate = useNavigate();

  /**
   * Select de antd
   */
  const { Option } = Select;

  /**
   * Opciones para el select de nombre de tarea
   */
  const optionsNombreTarea: string[] = [
    "Diseñar interfaz",
    "Codificar",
    "Testear",
    "Presentar",
    "Tomar un café",
  ];

  /**
   * Opciones para el select de hashtags
   */
  const optionHashtags: string[] = ["Personal", "Work", "Shopping"];

  /**
   * Hook de la api de todos
   */
  const todoApi = useTodoApi();

  /**
   * Titulo para el formulario de editar todo
   */
  const titleEditarTodo: string = "Editar Todo";

  /**
   * Titulo para el formulario de crear todo
   */
  const titleCrearTodo: string = "Crear Todo";

  const valueInitialTitleForm: string = "Diseñar interfaz";

  /**
   * Funcion que se ejecuta al enviar el formulario
   * @param values Valores del formulario
   */
  const handleSubmit = async (values: any) => {
    const newTodo: any = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      completed: values.completed,
      hashtags: values.hashtags || [],
    };

    if (todo.description !== "") {
      await todoApi.updateTodo(todo._id, newTodo);
    } else {
      const jsonString = JSON.stringify(newTodo);
      await todoApi.createTodo(jsonString);
    }

    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "40px",
        alignItems: "center",
        height: "100vh",
        minWidth: "700px",
      }}
    >
      <h1>{todo.description !== "" ? titleEditarTodo : titleCrearTodo}</h1>
      <Form
        style={{
          minWidth: "700px",
          backgroundColor: "#FEFBFB",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 2px 20px 0px rgba(9, 39, 84, 0.14)",
        }}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          title: todo?.title || valueInitialTitleForm,
          description: todo?.description || "",
          priority: todo?.priority || 1,
          completed: todo?.completed || false,
          hashtags: todo?.hashtags || [],
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          name="title"
          label="Titulo"
          rules={[{ required: true }]}
          labelAlign="left"
        >
          <Select>
            {optionsNombreTarea.map((option) => (
              <Option value={option} key={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true }]}
          labelAlign="left"
        >
          <Input type="text" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Prioridad"
          rules={[{ required: true }]}
          labelAlign="left"
        >
          <Input type="number" min={1} max={10} autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="completed"
          label="Completado"
          valuePropName="checked"
          labelAlign="left"
        >
          <Checkbox>Completado</Checkbox>
        </Form.Item>
        <Form.Item name="hashtags" label="Hashtags" labelAlign="left">
          <Select mode="multiple">
            {optionHashtags.map((option) => (
              <Option value={option} key={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Row justify="end" gutter={10}>
            <Col>
              <Button type="primary" htmlType="submit">
                {todo.description !== "" ? "Editar" : "Crear"}
              </Button>
            </Col>
            <Col>
              <Button onClick={handleCancel}>Cancelar</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoForm;
