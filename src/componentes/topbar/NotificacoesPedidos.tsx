import "./NotificacoesPedidos.css";

interface Pedido {
  id: number;
  cliente: string;
  total: number;
  data: string;
}

interface Props {
  pedidos: Pedido[];
  fechar: () => void;
}

export default function NotificacoesPedidos({ pedidos, fechar }: Props) {
  return (
    <div className="notif-mini">

      <div className="notif-mini-header">
        <h4>Pedidos Novos</h4>
        <button onClick={fechar}>×</button>
      </div>

      <div className="notif-mini-list">
        {pedidos.length === 0 && (
          <p className="notif-mini-empty">Nenhum pedido novo.</p>
        )}

        {pedidos.map((pedido) => (
          <div key={pedido.id} className="notif-mini-item">
            <div className="notif-mini-main">
              <span className="pedido-id">#{pedido.id}</span>
              <span className="pedido-cliente">{pedido.cliente}</span>
            </div>

            <div className="notif-mini-info">
              <span className="pedido-total">R$ {pedido.total}</span>
              <small>{pedido.data}</small>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO PARA VER TODOS OS PEDIDOS */}
      <div className="notif-mini-footer">
        <button
          className="notif-mini-btn"
          onClick={() => window.location.href = "/painel/vendas/pedidos"}
        >
          Ver todos os pedidos
        </button>
      </div>

    </div>
  );
}
