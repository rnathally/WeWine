import "./ListaPedidos.css";
import {
  Eye,
  Calendar,
  Search,
  Package2,
  SlidersHorizontal,
} from "lucide-react";
import { useState, useEffect } from "react";
import SelectOpcoes from "../../componentes/inputs/SelectOpcoes";
import ModalVerPedido from "../../componentes/pedidos/ModalVerPedido";

interface Pedido {
  id: number;
  cliente: string;
  data: string;
  itens: number;
  total: number;
  representante: string;
  pagamento: string;
  status: string;
}

export default function ListaPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);

  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  const [pagina, setPagina] = useState(1);
  const porPagina = 8;

  useEffect(() => {
    // MOCK — substitua pelo backend depois
    setPedidos([
      {
        id: 2845,
        cliente: "Restaurante Bella Vista",
        data: "15/11/2025",
        itens: 24,
        total: 2136,
        representante: "Pedro Oliveira",
        pagamento: "Cartão",
        status: "Emitido",
      },
      {
        id: 2844,
        cliente: "Maria Santos",
        data: "15/11/2025",
        itens: 6,
        total: 540,
        representante: "Ana Costa",
        pagamento: "PIX",
        status: "Processando",
      },
      {
        id: 2843,
        cliente: "Adega Premium LTDA",
        data: "14/11/2025",
        itens: 48,
        total: 4320,
        representante: "Ricardo Sousa",
        pagamento: "Boleto",
        status: "Pendente",
      },
    ]);
  }, []);

  // FILTRAGEM
  const filtrados = pedidos.filter((p) => {
    const search = busca.toLowerCase();

    if (
      busca &&
      !(
        p.id.toString().includes(search) ||
        p.cliente.toLowerCase().includes(search) ||
        p.representante.toLowerCase().includes(search)
      )
    )
      return false;

    if (statusFiltro && p.status !== statusFiltro) return false;

    return true;
  });

  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const exibidos = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  // Atualizar STATUS
  function atualizarStatus(id: number, novoStatus: string) {
    setPedidos((antigos) =>
      antigos.map((p) =>
        p.id === id ? { ...p, status: novoStatus } : p
      )
    );
  }

  // CLASSNAME do status para CSS
  function classeStatus(status: string) {
    return (
      "status-" +
      status.toLowerCase().replace(/\s+/g, "-").replace("ã", "a").replace("á", "a").replace("í", "i")
    );
  }

  return (
    <div className="dashboard-wrapper pedidos-container">
      <h1 className="titulo">Todos os pedidos</h1>
      <p className="sub">Visualize todos os pedidos recebidos</p>

      {/* FILTROS */}
      <div className="filtros-box">
        <div className="campo-busca">
          <Search size={18} className="ico" />
          <input
            placeholder="Buscar por cliente, pedido ou representante..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="filtros-direita">
          <SelectOpcoes
            icone={<Calendar size={16} />}
            valor={periodo}
            aoMudar={setPeriodo}
            largura="170px"
            placeholder="Período"
            opcoes={[
              { label: "Todos", value: "" },
              { label: "Últimos 7 dias", value: "7" },
              { label: "Últimos 30 dias", value: "30" },
              { label: "Este mês", value: "mes" },
              { label: "2025", value: "2025" },
            ]}
          />

          <SelectOpcoes
            valor={statusFiltro}
            aoMudar={setStatusFiltro}
            largura="170px"
            placeholder="Todos os status"
            opcoes={[
              { label: "Emitido", value: "Emitido" },
              { label: "Processando", value: "Processando" },
              { label: "Em trânsito", value: "Em trânsito" },
              { label: "Faturado", value: "Faturado" },
              { label: "Pendente", value: "Pendente" },
              { label: "Cancelado", value: "Cancelado" },
            ]}
          />

          <button className="btn-filtros" type="button">
            <SlidersHorizontal size={16} />
            Filtros
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className="tabela">
        <div className="tabela-header">
          <span>Pedido</span>
          <span>Cliente</span>
          <span>Data</span>
          <span>Itens</span>
          <span>Representante</span>
          <span>Pagamento</span>
          <span>Total</span>
          <span>Status</span>
          <span>Ações</span>
        </div>

        {exibidos.map((p) => (
          <div key={p.id} className="tabela-linha">
            <span className="id">#VND-{p.id}</span>
            <span>{p.cliente}</span>
            <span>{p.data}</span>

            <span className="icone-itens">
              <Package2 size={16} />
              {p.itens}
            </span>

            <span>{p.representante}</span>
            <span>{p.pagamento}</span>

            <span className="total">
              {p.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <div className={`status-select-col ${classeStatus(p.status)}`}>
              <SelectOpcoes
                valor={p.status}
                aoMudar={(v) => atualizarStatus(p.id, v)}
                largura="130px"
                opcoes={[
                  { label: "Emitido", value: "Emitido" },
                  { label: "Processando", value: "Processando" },
                  { label: "Em trânsito", value: "Em trânsito" },
                  { label: "Faturado", value: "Faturado" },
                  { label: "Pendente", value: "Pendente" },
                  { label: "Cancelado", value: "Cancelado" },
                ]}
              />
            </div>

            <button
              className="btn-ver"
              onClick={() =>
                setPedidoSelecionado({
                  ...p,
                  endereco: "Rua das Uvas, 123 - Centro",
                  itensLista: [
                    { nome: "Vinho Tinto Reserva", qtd: 12, total: 780 },
                    { nome: "Vinho Branco Seco", qtd: 6, total: 240 },
                  ],
                })
              }
            >
              <Eye size={16} /> Ver
            </button>
          </div>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <div className="paginacao">
        <span className="info">
          Mostrando {exibidos.length} de {pedidos.length} pedidos
        </span>

        <div className="botoes-paginacao">
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
            ◀ Anterior
          </button>
          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Próximo ▶
          </button>
        </div>
      </div>

      {/* MODAL */}
      {pedidoSelecionado && (
        <ModalVerPedido
          pedido={pedidoSelecionado}
          fechar={() => setPedidoSelecionado(null)}
        />
      )}
    </div>
  );
}
