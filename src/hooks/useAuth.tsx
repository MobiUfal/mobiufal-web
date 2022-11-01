import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextData {
  JWT: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const TOKEN_KEY = "@mobiufal-web-Token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [JWT, setJWT] = useState(localStorage.getItem(TOKEN_KEY));

  function login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    setJWT(token);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setJWT(null);
  }

  return (
    <AuthContext.Provider value={{ JWT, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
