import { NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiWineBottle } from "react-icons/gi";
import {
  FiUsers,
  FiShoppingCart,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

import "./Sidebar.css";
import Logo from "../../../assets/imagens/Logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 👉 Quando o backend estiver pronto, você coloca a chamada aqui:
      // await fetch("https://seu-backend.com/api/auth/logout", {
      //   method: "POST",
      //   credentials: "include", // se usar cookies de sessão
      // });

      // Se usar token JWT/localStorage, pode limpar aqui:
      // localStorage.removeItem("token");

      // Volta para a tela de login (raiz "/")
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      // Aqui no futuro você pode exibir um toast/alerta amigável
    }
  };

  return (
    <aside className="we-sidebar">
      {/* LOGO */}
      <div className="we-logo">
        <img src={Logo} alt="WeWine" />
      </div>

      {/* MENU DE ÍCONES */}
      <nav className="we-menu">
        <NavLink to="/painel" className="we-item">
          <LuLayoutDashboard />
        </NavLink>

        <NavLink to="/painel/vinhos" className="we-item">
          <GiWineBottle />
        </NavLink>

        <NavLink to="/painel/clientes" className="we-item">
          <FiUsers />
        </NavLink>

        <NavLink to="/painel/representantes" className="we-item">
          <FaUserTie />
        </NavLink>

        <NavLink to="/painel/pedidos" className="we-item">
          <FiShoppingCart />
        </NavLink>

        <NavLink to="/painel/relatorios" className="we-item">
          <FiBarChart2 />
        </NavLink>
      </nav>

      {/* BOTÃO DE SAIR (RODAPÉ) */}
      <button
        type="button"
        className="we-footer"
        onClick={handleLogout}
        title="Sair"
      >
        <FiLogOut />
      </button>
    </aside>
  );
}
