import { Routes as ReactRouterRoutes, Route, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

import { PublicRoute } from "./components/Routes/PublicRoute";
import { PrivateRoute } from "./components/Routes/ProtectedRoute";

import { Home } from "./pages/Home";
import MainPage from "./pages/MainPage";

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
                    <MainPage />
                </PrivateRoute>
              } 
            />
        </ReactRouterRoutes>
    )
}