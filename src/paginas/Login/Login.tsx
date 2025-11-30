import "./Login.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/imagens/logo.png";
import imagemVinho from "../../assets/imagens/TelaLogin.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexto/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Estados controlados — NECESSÁRIOS para o backend
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // CHAMADA REAL AO BACKEND (quando estiver pronto)
    const ok = await login(email, senha);

    if (ok) {
      navigate("/painel");
    } else {
      alert("E-mail ou senha incorretos");

      // MOCK: pode remover quando a conexão estiver funcionando
      console.warn("⚠ MOCK: login falhou porque backend ainda não está conectado.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        {/* ESQUERDA */}
        <div className="login-left">

          <img src={logo} className="login-logo" />

          <h1 className="titulo">We Wine</h1>
          <p className="subtitulo">Entre com seus dados</p>

          {/* Email */}
          <div className="campo">
            <FiMail className="icone-input" />
            <input
              id="email"
              type="email"
              value={email}                        //  pronto para backend
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          {/* Senha */}
          <div className="campo">
            <FiLock className="icone-input" />
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              value={senha}                       //  pronto para backend
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
            {mostrarSenha ? (
              <FiEyeOff
                className="icone-ver"
                onClick={() => setMostrarSenha(false)}
              />
            ) : (
              <FiEye
                className="icone-ver"
                onClick={() => setMostrarSenha(true)}
              />
            )}
          </div>

          <a className="link-esqueceu" href="#">
            Esqueci a senha
          </a>

          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
        </div>

        {/* DIREITA */}
        <div className="login-right">
          <img src={imagemVinho} className="img-vinho" />
        </div>

      </div>
    </div>
  );
}
