import axios from "axios";
import { useSnackbar } from "notistack";
import { Todo } from "./models/TodoModels";

export const useTodoApi = () => {
  /**
   * Notificaciones mediante el uso de notistack
   */
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Función que obtiene los todos
   * @returns los todos
   */
  const getTodos = async (): Promise<Todo[]> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_COMPLETED}/todos`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        enqueueSnackbar("Error al obtener los todos", {
          variant: "error",
        });
        return response.data;
      }
    } catch (error) {
      enqueueSnackbar("Error al obtener los todos", { variant: "error" });
      throw error;
    }
  };

  /**
   * Función que crea un todo
   * @param todo que es el todo a crear
   * @returns la respuesta de la creación del todo
   */
  const createTodo = async (todo: any): Promise<Todo> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_COMPLETED}/todos`,
        todo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("El todo se creo correctamente", {
          variant: "success",
        });
        return response.data;
      } else {
        enqueueSnackbar("Error al crear el todo", {
          variant: "error",
        });
        return response.data;
      }
    } catch (error) {
      enqueueSnackbar("Error al crear el todo", { variant: "error" });
      throw error;
    }
  };

  /**
   * Función que actualiza un todo
   * @param id del todo a actualizar
   * @param todo que es el todo a actualizar
   * @returns
   */
  const updateTodo = async (id: string, todo: any): Promise<Todo> => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_COMPLETED}/todos/${id}`,
        todo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("El todo se actualizó correctamente", {
          variant: "success",
        });
        return response.data;
      } else {
        enqueueSnackbar("Error al actualizar el todo", {
          variant: "error",
        });
        return response.data;
      }
    } catch (error) {
      enqueueSnackbar("Error al actualizar el todo", { variant: "error" });
      throw error;
    }
  };

  /**
   * Función que elimina un todo
   * @param id del todo a eliminar
   */
  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_COMPLETED}/todos/${id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("El todo se eliminó correctamente", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Error al eliminar el todo", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error al eliminar el todo", { variant: "error" });
      throw error;
    }
  };

  /**
   * Función que obtiene los datos del login
   * @returns los datos del login
   */
  const loginData = async () => {
    try {
      const response = await axios.post(
        "https://dev-api.contender-logistics.draketechdev.ca/api/auth/login",
        {
          email: "frontend@draketech.ca",
          password: "123456",
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        enqueueSnackbar("Hubo un error. Por favor, intenta nuevamente.", {
          variant: "error",
        });
        return response.data;
      }
    } catch (error) {
      console.log("Error:", error);
      enqueueSnackbar("Hubo un error. Por favor, intenta nuevamente.", {
        variant: "error",
      });
      throw error;
    }
  };

  return {
    loginData,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
