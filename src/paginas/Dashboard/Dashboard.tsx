import { useEffect, useState } from "react";
import "./Dashboard.css";
import GraficoComparativo from "../../componentes/tabelas/GraficoComparativo";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  FiBarChart2,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
  FiMapPin,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import { GiWineBottle } from "react-icons/gi";

interface MixProduto {
  tipo: string;
  valor: number;
}

interface VendaCidade {
  cidade: string;
  vendas: number;
}

interface EstoqueItem {
  nome: string;
  safra: number;
  qtd: number;
}

interface Pedido {
  id: string;
  cliente: string;
  valor: number;
  status: string;
}

export default function Dashboard() {
  const [faturamentoMes, setFaturamentoMes] = useState<number>(0);
  const [pedidosAbertos, setPedidosAbertos] = useState<number>(0);
  const [garrafasVendidas, setGarrafasVendidas] = useState<number>(0);
  const [comissoesAPagar, setComissoesAPagar] = useState<number>(0);

  const [mixProdutos, setMixProdutos] = useState<MixProduto[]>([]);
  const [vendasCidade, setVendasCidade] = useState<VendaCidade[]>([]);
  const [estoqueBaixo, setEstoqueBaixo] = useState<EstoqueItem[]>([]);
  const [pedidosRecentes, setPedidosRecentes] = useState<Pedido[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFaturamentoMes(95800);
      setPedidosAbertos(12);
      setGarrafasVendidas(1840);
      setComissoesAPagar(7200);

      setMixProdutos([
        { tipo: "Tinto", valor: 45 },
        { tipo: "Branco", valor: 25 },
        { tipo: "Rosé", valor: 15 },
        { tipo: "Espumante", valor: 15 },
      ]);

      setVendasCidade([
        { cidade: "Criciúma", vendas: 340 },
        { cidade: "Içara", vendas: 210 },
        { cidade: "Lauro Müller", vendas: 160 },
        { cidade: "Siderópolis", vendas: 140 },
        { cidade: "Orleans", vendas: 190 },
      ]);

      setEstoqueBaixo([
        { nome: "Cabernet Premium", safra: 2018, qtd: 12 },
        { nome: "Merlot Reserva", safra: 2020, qtd: 7 },
        { nome: "Chardonnay Seleção", safra: 2019, qtd: 9 },
      ]);

      setPedidosRecentes([
        { id: "#1250", cliente: "João Andrade", valor: 650, status: "Pago" },
        { id: "#1249", cliente: "Fino Sabor", valor: 2800, status: "Pendente" },
        { id: "#1248", cliente: "Casa Gourmet", valor: 1200, status: "Enviado" },
        { id: "#1247", cliente: "Adega Sul", valor: 980, status: "Pago" },
      ]);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const pieData = mixProdutos.map((item) => ({
    name: item.tipo,
    value: item.valor,
  }));

  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString("pt-BR")}`;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pago":
        return "status-badge status-badge--success";
      case "Pendente":
        return "status-badge status-badge--warning";
      case "Enviado":
        return "status-badge status-badge--info";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Resumo geral das operações da WeWine</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpis-grid">
        <div className="kpi-card">
          <div className="kpi-card__header">
            <span>Faturamento Mensal</span>
            <div className="kpi-card__icon kpi-card__icon--primary">
              <FiBarChart2 />
            </div>
          </div>
          <h2>{formatCurrency(faturamentoMes)}</h2>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <span>Pedidos em Aberto</span>
            <div className="kpi-card__icon kpi-card__icon--secondary">
              <FiShoppingCart />
            </div>
          </div>
          <h2>{pedidosAbertos}</h2>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <span>Garrafas Vendidas</span>
            <div className="kpi-card__icon kpi-card__icon--accent">
              <GiWineBottle />
            </div>
          </div>
          <h2>{garrafasVendidas}</h2>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <span>Comissões a Pagar</span>
            <div className="kpi-card__icon kpi-card__icon--neutral">
              <FiDollarSign />
            </div>
          </div>
          <h2>{formatCurrency(comissoesAPagar)}</h2>
        </div>
      </div>

      {/* GRADE 2x2 DE GRÁFICOS / BLOCOS */}
      <div className="charts-grid">
        {/* 1. Evolução das Vendas */}
        <div className="card-bloco card-bloco--no-hover">
          <div className="card-title">
            <span className="card-title__icon">
              <FiTrendingUp />
            </span>
            <h3>Evolução das Vendas</h3>
          </div>
          <GraficoComparativo />
        </div>

        {/* 2. Mix de Produtos */}
        <div className="card-bloco">
          <div className="card-title">
            <span className="card-title__icon">
              <GiWineBottle />
            </span>
            <h3>Mix de Produtos</h3>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={pieData}
                nameKey="name"
                dataKey="value"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#89154c", "#228048", "#739d37", "#bc786c"][i]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Vendas por Cidade */}
        <div className="card-bloco">
          <div className="card-title">
            <span className="card-title__icon">
              <FiMapPin />
            </span>
            <h3>Vendas por Cidade</h3>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={vendasCidade}>
              <XAxis dataKey="cidade" />
              <YAxis />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ecdde4",
                  borderRadius: 8,
                  boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
                  fontSize: "0.75rem",
                  color: "#303030",
                }}
              />
              <Bar dataKey="vendas" fill="#89154c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Estoque Baixo */}
        <div className="card-bloco estoque-card">
  <div className="card-title">
    <span className="card-title__icon">
      <FiPackage />
    </span>
    <h3>Estoque Baixo</h3>
  </div>

  <table>
    <thead>
      <tr>
        <th>Vinho</th>
        <th>Safra</th>
        <th>Qtd</th>
      </tr>
    </thead>
    <tbody>
      {estoqueBaixo.map((v, i) => (
        <tr key={i}>
          <td>{v.nome}</td>
          <td>{v.safra}</td>
          <td>
            <span className="estoque-qtd-pill">{v.qtd}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* LINHA FINAL: Pedidos Recentes full width */}
      <div className="bottom-grid">
        <div className="card-bloco bottom-full">
          <div className="card-title">
            <span className="card-title__icon">
              <FiClock />
            </span>
            <h3>Pedidos Recentes</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {pedidosRecentes.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{formatCurrency(p.valor)}</td>
                  <td>
                    <span className={getStatusClass(p.status)}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
