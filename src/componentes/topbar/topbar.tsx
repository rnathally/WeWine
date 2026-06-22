import { useState } from "react";
import { Search, Bell } from "lucide-react";
import "./topbar.css";
import NotificacoesPedidos from "./NotificacoesPedidos";

interface Pedido {
  id: number;
  cliente: string;
  total: number;
  data: string;
}

const pedidosNovos: Pedido[] = [
  {
    id: 1012,
    cliente: "João Pereira",
    total: 350.9,
    data: "Hoje às 14:32",
  },
  {
    id: 1013,
    cliente: "Maria Santos",
    total: 189.5,
    data: "Hoje às 14:40",
  },
];

export default function TopBar() {
  const [painelAberto, setPainelAberto] = useState(false);

  const notificacoes = pedidosNovos.length;

  return (
    <>
      <div className="ww-topbar">
        <div className="ww-search">
          <Search className="ww-search-icon" size={20} />
          <span>Buscar</span>
        </div>

        <div
          className="ww-bell"
          onClick={() => setPainelAberto(!painelAberto)}
        >
          <Bell size={20} />

          {notificacoes > 0 && (
            <span className="ww-badge">{notificacoes}</span>
          )}
        </div>
      </div>

      {painelAberto && (
        <NotificacoesPedidos
          pedidos={pedidosNovos}
          fechar={() => setPainelAberto(false)}
        />
      )}
    </>
  );
}