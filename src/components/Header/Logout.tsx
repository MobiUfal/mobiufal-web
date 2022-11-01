import { useAuthContext } from "../../hooks/useAuth";

export function Logout() {
  const { logout } = useAuthContext();

  return (
    <button
      className="text-xl hover:opacity-70 transition-all duration-200"
      onClick={logout}
    >
      Sair
    </button>
  );
}
