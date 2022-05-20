import { useAuthContext } from "./hooks/useAuth";
import { Home } from "./pages/Home";

export function Routes() {
    const { JWT, logout } = useAuthContext()
    
    if (JWT === null) {
        return <Home />
    }

    return (
        <>
            <h1>Autenticado</h1>
            <button onClick={logout}>Sair</button>
        </>
    )
}