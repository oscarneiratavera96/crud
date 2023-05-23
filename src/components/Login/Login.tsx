import React from "react";
import { Form, Input, Button } from "antd";
import { actualizarUsuario } from "../../store/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import "../../assets/styles/Login.css";
import { useTodoApi } from "../../services/todoServices";

const Login: React.FC = () => {
  /**
   * Hook de react-router-dom que permite navegar entre rutas.
   */
  const navigate = useNavigate();

  /**
   * Hook de react-redux que permite hacer dispatch de acciones.
   */
  const dispatch = useDispatch();

  /**
   * Notistack es una librería que permite mostrar notificaciones en pantalla.
   */
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Hook que permite hacer llamados a la API de Todo.
   */
  const todoApi = useTodoApi();

  /**
   * Función que se ejecuta al hacer submit en el formulario de login.
   */
  const handleSubmit = async () => {
    try {
      const response = todoApi.loginData();
      dispatch(actualizarUsuario({ usuario: { response } }));
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
      enqueueSnackbar("Hubo un error. Por favor, intenta nuevamente.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <div style={{ textAlign: "center" }}>
          <h2>Inicio de sesión</h2>
        </div>
        <Form onFinish={handleSubmit} autoComplete="off">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese un correo electrónico válido.",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Por favor, ingrese su contraseña." },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item className="login-button" style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" style={{ width: "120px" }}>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
