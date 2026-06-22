import "./Login.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/imagens/logo.png";
import imagemVinho from "../../assets/imagens/TelaLogin.png";
import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexto/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok = await login(email, senha);

    if (ok) {
      navigate("/painel");
    } else {
      alert("E-mail ou senha incorretos");
      console.warn("Login falhou. Verifique a conexão com o backend.");
    }
  }

  async function handleDemoLogin() {
    const ok = await login("admin@wewine.com", "123456");

    if (ok) {
      navigate("/painel");
    } else {
      alert("Não foi possível entrar no modo demonstração.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* ESQUERDA */}
        <div className="login-left">
          <img src={logo} className="login-logo" alt="Logo We Wine" />

          <h1 className="titulo">We Wine</h1>
          <p className="subtitulo">Entre com seus dados</p>

          <form className="login-form" onSubmit={handleLogin}>
            {/* Email */}
            <div className="campo">
              <FiMail className="icone-input" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Senha */}
            <div className="campo">
              <FiLock className="icone-input" />

              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="btn-ver-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <a className="link-esqueceu" href="#">
              Esqueci a senha
            </a>

            <button className="btn-login" type="submit">
              Login
            </button>

            <button
              className="btn-demo"
              type="button"
              onClick={handleDemoLogin}
            >
              Entrar como demonstração
            </button>
          </form>
        </div>

        {/* DIREITA */}
        <div className="login-right">
          <img src={imagemVinho} className="img-vinho" alt="Imagem vinho" />
        </div>
      </div>
    </div>
  );
}