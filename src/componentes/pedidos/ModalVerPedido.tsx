import "./ModalVerPedido.css";
import { X, Package2, User, Calendar, DollarSign, MapPin } from "lucide-react";

interface ItemPedido {
  nome: string;
  qtd: number;
  total: number;
}

interface PedidoProps {
  id: string;
  cliente: string;
  representante: string;
  data: string;
  pagamento: string;
  endereco: string;
  status: string;
  itensLista: ItemPedido[];
  total: number;
}

interface Props {
  pedido: PedidoProps | null;
  fechar: () => void;
}

export default function ModalVerPedido({ pedido, fechar }: Props) {
  if (!pedido) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-pedido">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Pedido #{pedido.id}</h2>
          <button className="btn-close" onClick={fechar}>
            <X size={22} />
          </button>
        </div>

        {/* INFO GERAL */}
        <div className="pedido-info">
          <div className="info-linha">
            <User size={18} />
            <strong>Cliente:</strong> <span>{pedido.cliente}</span>
          </div>

          <div className="info-linha">
            <User size={18} />
            <strong>Representante:</strong> <span>{pedido.representante}</span>
          </div>

          <div className="info-linha">
            <Calendar size={18} />
            <strong>Data:</strong> <span>{pedido.data}</span>
          </div>

          <div className="info-linha">
            <DollarSign size={18} />
            <strong>Pagamento:</strong> <span>{pedido.pagamento}</span>
          </div>

          <div className="info-linha">
            <MapPin size={18} />
            <strong>Endereço:</strong> <span>{pedido.endereco}</span>
          </div>

          <div className="info-linha">
            <strong>Status:</strong>
            <span
              className={`status-modal ${pedido.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {pedido.status}
            </span>
          </div>
        </div>

        {/* LISTA DE ITENS */}
        <h3 className="titulo-itens">Itens do Pedido</h3>

        <div className="itens-box">
          {pedido.itensLista.map((item, index) => (
            <div key={index} className="item-linha">
              <div className="item-esq">
                <Package2 size={20} className="item-icon" />
                <span>{item.nome}</span>
              </div>

              <div className="item-qtd">{item.qtd} un</div>

              <div className="item-preco">
                R$ {item.total.toLocaleString("pt-BR")}
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="total-box">
          Total do Pedido:  
          <strong>R$ {pedido.total.toLocaleString("pt-BR")}</strong>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn-secundario" onClick={fechar}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
