import { createContext, useState, useEffect } from "react";
import api from "../services/api";

interface AuthContextType {
  user: any;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // Mantém usuário logado no refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      //  Quando tiver API real, já deixa pronto:
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({ email: "usuario@wewine.com" }); 
      //  MOCK - apague isso quando o backend enviar os dados do user
    }
  }, []);

  async function login(email: string, senha: string): Promise<boolean> {
    // ---------------------------
    // MOCK - APAGAR DEPOIS
    if (email === "admin@wewine.com" && senha === "123456") {
      const fakeToken = "token-123";
      localStorage.setItem("token", fakeToken);

      // deixa axios preparado
      api.defaults.headers.common["Authorization"] = `Bearer ${fakeToken}`;

      setUser({ email });
      return true;
    }
    // ---------------------------

    //  Aqui entrará a chamada da API REAL:
    //
    // try {
    //   const response = await api.post("/login", { email, senha });
    //
    //   const { token, user } = response.data;
    //
    //   localStorage.setItem("token", token);
    //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //   setUser(user);
    //   return true;
    // } catch (err) {
    //   return false;
    // }

    return false; // fallback
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
