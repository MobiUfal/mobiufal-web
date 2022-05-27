import { useAuthContext } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import MainPage from "./pages/MainPage";

export function Routes() {
    const { JWT, logout } = useAuthContext()
    
    if (JWT === null) {
        return <Home />
    }

    return (
        <>
            <MainPage />
            <h1>Autenticado</h1>
            <button onClick={logout}>Sair</button>
        </>
    )
}