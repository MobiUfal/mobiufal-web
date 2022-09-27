import { Routes as ReactRouterRoutes, Route, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

import { PublicRoute } from "./components/Routes/PublicRoute";
import { PrivateRoute } from "./components/Routes/ProtectedRoute";

import { Home } from "./pages/Home";
import { Homepage } from "./pages/Homepage";
import { PendingUserPage } from "./pages/PendingUserPage";
import { Configurations } from "./pages/Configurations";
import { User } from "./pages/User";

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
              path={'/displacements'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <Homepage />
                </PrivateRoute>
              }
            />

            <Route 
              path={'/users'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <PendingUserPage />
                </PrivateRoute>
              }
            />

            <Route 
              path={'/users/:id'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <User />
                </PrivateRoute>
              }
            />

            <Route 
              path={'/configurations'} 
              element={
                <PrivateRoute JWT={JWT}>
                    <Configurations />
                </PrivateRoute>
              }
            />
        </ReactRouterRoutes>
    )
}