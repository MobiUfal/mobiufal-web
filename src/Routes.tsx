import { Routes as ReactRouterRoutes, Route, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

import { PublicRoute } from "./components/Routes/PublicRoute";
import { PrivateRoute } from "./components/Routes/ProtectedRoute";

import { Home } from "./pages/Home";
import { Homepage } from "./pages/Homepage";
import { PendingUserPage } from "./pages/PendingUserPage";
import { WorkLoadPage } from "./pages/WorkLoadPage";

export function Routes() {
    const { JWT, logout } = useAuthContext()

    return (
        <ReactRouterRoutes>
            <Route 
              path={'/'} 
              element={
                  <PublicRoute JWT={JWT}>
                      <Home />
                  </PublicRoute>
              } 
            />

            <Route 
              path={'/deslocamentos'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <Homepage />
                </PrivateRoute>
              }
            />

            <Route 
              path={'/gerenciar-usuarios/usuarios-pendentes'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <PendingUserPage />
                </PrivateRoute>
              }
            />

            <Route 
              path={'/gerenciar-usuarios/carga-horaria'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <WorkLoadPage />
                </PrivateRoute>
              }
            />
        </ReactRouterRoutes>
    )
}