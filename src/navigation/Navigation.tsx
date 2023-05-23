import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Button } from "antd";
import { useDispatch } from "react-redux";
import { actualizarUsuario } from "../store/reducer/reducer";
import { initialState } from "../store/reducer/reducer";

import {
  HomeOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navigation = () => {
  /**
   * Hook de react-router-dom que permite obtener la ruta actual.
   */
  const location = useLocation();

  /**
   * Hook de react-redux que permite hacer dispatch de acciones.
   */
  const dispatch = useDispatch();

  /**
   * Hook de react-router-dom que permite navegar entre rutas.
   */
  const navigate = useNavigate();

  /**
   * Función que cierra la sesión del usuario
   */
  const cerrarSesion = () => {
    dispatch(actualizarUsuario(initialState.usuario));
    navigate("/login");
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{
        backgroundColor: "#001529",
        display: "flex",
        justifyContent: "flex-start",
        padding: "0 100px",
      }}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item
        key="/"
        icon={<HomeOutlined />}
        className={location.pathname === "/" ? "active" : ""}
        style={{ marginRight: "20px", marginLeft: "0" }}
      >
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          Inicio
        </Link>
      </Menu.Item>
      <Menu.Item
        key="/dashboard"
        icon={<DashboardOutlined />}
        className={location.pathname === "/dashboard" ? "active" : ""}
      >
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active-link" : ""}
        >
          CRUD de to-dos
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
        <Button
          type="link"
          icon={<LogoutOutlined />}
          onClick={cerrarSesion}
          style={{ fontWeight: "bold" }}
        >
          Cerrar sesión
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
