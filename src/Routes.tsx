import {
  Routes as ReactRouterRoutes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

import { PublicRoute } from "./components/Routes/PublicRoute";
import { PrivateRoute } from "./components/Routes/ProtectedRoute";

import { Home } from "./pages/Home";
import { Homepage } from "./pages/Homepage";
import { PendingUserPage } from "./pages/PendingUserPage";
import { Configurations } from "./pages/Configurations";
import { User } from "./pages/User";

export function Routes() {
  const { JWT } = useAuthContext();

  return (
    <ReactRouterRoutes>
      <Route
        path={"/"}
        element={
          <PublicRoute JWT={JWT}>
            <Home />
          </PublicRoute>
        }
      />

      <Route
        path={"/deslocamentos"}
        element={
          <PrivateRoute JWT={JWT}>
            <Homepage />
          </PrivateRoute>
        }
      />

      <Route
        path={"/usuarios"}
        element={
          <PrivateRoute JWT={JWT}>
            <PendingUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path={"/usuarios/:id"}
        element={
          <PrivateRoute JWT={JWT}>
            <User />
          </PrivateRoute>
        }
      />

      <Route
        path={"/configuracoes"}
        element={
          <PrivateRoute JWT={JWT}>
            <Configurations />
          </PrivateRoute>
        }
      />
    </ReactRouterRoutes>
  );
}
