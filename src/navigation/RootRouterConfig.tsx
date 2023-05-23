import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Navigation from "./Navigation";
import Loading from "../components/Loading/Loading";

/**
 * Lazy load components
 */
const Login = lazy(() => import("../components/Login/Login"));
const Home = lazy(() => import("../components/Home/Home"));
const TodoPage = lazy(() => import("../components/TodoPage/TodoList"));
const TodoForm = lazy(() => import("../components/TodoPage/TodoForm"));

const RootRouterConfig: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute redirectTo={"/login"} />}>
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <Home />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navigation />
                  <TodoPage />
                </>
              }
            />

            <Route
              path="/dashboard/create"
              element={
                <>
                  <Navigation />
                  <TodoForm />
                </>
              }
            />
            <Route
              path="/dashboard/edit/:id"
              element={
                <>
                  <Navigation />
                  <TodoForm />
                </>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RootRouterConfig;
