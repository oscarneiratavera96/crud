import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const ProtectedRoute = ({ redirectTo }: { redirectTo: any }) => {
  const usuario = useSelector(
    (state: RootState) => state.homeReducer.usuario.token
  );
  if (usuario === "") {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
