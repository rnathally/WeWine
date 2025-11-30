import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import "./TopBar.css";
import NotificacoesPedidos from "./NotificacoesPedidos";

export default function TopBar() {
  const [notificacoes, setNotificacoes] = useState<number>(0);
  const [painelAberto, setPainelAberto] = useState(false);

  const [pedidosNovos, setPedidosNovos] = useState([
    // TROCAR POR API REAL DEPOIS
    {
      id: 1012,
      cliente: "João Pereira",
      total: 350.90,
      data: "Hoje às 14:32",
    },
    {
      id: 1013,
      cliente: "Maria Santos",
      total: 189.50,
      data: "Hoje às 14:40",
    }
  ]);

  useEffect(() => {
    // Cada novo pedido aumenta badge (simulação)
    setNotificacoes(pedidosNovos.length);
  }, [pedidosNovos]);

  return (
    <>
      <div className="ww-topbar">

        <div className="ww-search">
          <Search className="ww-search-icon" size={20} />
          <span>Buscar</span>
        </div>

        <div className="ww-bell" onClick={() => setPainelAberto(!painelAberto)}>
          <Bell size={20} />
          {notificacoes > 0 && <span className="ww-badge">{notificacoes}</span>}
        </div>

      </div>

      {/* Painel lateral */}
      {painelAberto && (
        <NotificacoesPedidos 
          pedidos={pedidosNovos}
          fechar={() => setPainelAberto(false)}
        />
      )}
    </>
  );
}
