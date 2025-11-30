import { useState } from "react";
import { FileText, TrendingUp, BarChart3, Users, Calendar, Download } from "lucide-react";
import SelectOpcoes from "../../componentes/inputs/SelectOpcoes";
import "./RelatoriosDashboard.css";

export default function RelatoriosDashboard() {
  const [categoria, setCategoria] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [regiao, setRegiao] = useState("");

  return (
    <div className="relatorios-container">

      {/* ========================= TÍTULO ========================= */}
      <h1 className="titulo">Relatórios</h1>
      <p className="sub">Gere análises detalhadas sobre vendas, clientes e regiões</p>


      {/* ========================= GERAR RELATÓRIO ========================= */}
      <div className="box-gerar">

        <div className="box-header">
          <div className="icon-round">
            <FileText size={22} />
          </div>

          <div>
            <h2 className="box-title">Gerar Novo Relatório</h2>
            <p className="box-subtitle">Configure os filtros e exporte seus dados</p>
          </div>
        </div>

        <div className="filtros-gerar">

          {/* Categoria */}
          <SelectOpcoes
            valor={categoria}
            aoMudar={setCategoria}
            placeholder="Categoria"
            largura="220px"
            opcoes={[
              { label: "Clientes", value: "clientes" },
              { label: "Vendas", value: "vendas" },
              { label: "Produtos", value: "produtos" },
            ]}
          />

          {/* Período */}
          <SelectOpcoes
            icone={<Calendar size={16} />}
            valor={periodo}
            aoMudar={setPeriodo}
            placeholder="Período"
            largura="220px"
            opcoes={[
              { label: "Esta semana", value: "semana" },
              { label: "Últimos 30 dias", value: "30d" },
              { label: "Este mês", value: "mes" },
              { label: "2025", value: "2025" },
            ]}
          />

          {/* Região */}
          <SelectOpcoes
            valor={regiao}
            aoMudar={setRegiao}
            placeholder="Todas as regiões"
            largura="240px"
            opcoes={[
              { label: "Todas as regiões", value: "" },
              { label: "Araranguá", value: "Araranguá" },
              { label: "Balneário Camboriú", value: "Balneário Camboriú" },
              { label: "Blumenau", value: "Blumenau" },
              { label: "Chapecó", value: "Chapecó" },
              { label: "Criciúma", value: "Criciúma" },
              { label: "Florianópolis", value: "Florianópolis" },
              { label: "Itajaí", value: "Itajaí" },
              { label: "Jaraguá do Sul", value: "Jaraguá do Sul" },
              { label: "Joinville", value: "Joinville" },
              { label: "Lages", value: "Lages" },
              { label: "Tubarão", value: "Tubarão" },
              { label: "Orleans", value: "Orleans" },
              { label: "Maracajá", value: "Maracajá" },
              { label: "Lauro Muller", value: "Lauro Muller" },
              { label: "Içara", value: "Içara" },
              { label: "Cocal do Sul", value: "Cocal do Sul" },
              { label: "Nova Veneza", value: "Nova Veneza" },
              { label: "Sideropólis", value: "Sideropólis" },
            ]}
          />

          {/* Botão PDF */}
          <button className="btn-gerar-pdf">
            <Download size={16} />
            Gerar PDF
          </button>

        </div>
      </div>




      {/* ========================= CARDS DE TIPOS DE RELATÓRIO ========================= */}
      <div className="relatorios-grid">

        {/* CARD 1 */}
        <div className="rel-card">
          <div className="rel-icon pink">
            <TrendingUp size={22} />
          </div>

          <h3 className="rel-title">Vendas por Período</h3>
          <p className="rel-desc">
            Análise detalhada de vendas com filtros customizados
          </p>

          <button className="btn-config">
            <Calendar size={16} />
            Configurar
          </button>
        </div>

        {/* CARD 2 */}
        <div className="rel-card green">
          <div className="rel-icon green">
            <BarChart3 size={22} />
          </div>

          <h3 className="rel-title">Performance de Produtos</h3>
          <p className="rel-desc">
            Ranking de vinhos mais vendidos e lucrativos
          </p>

          <button className="btn-config">
            <Calendar size={16} />
            Configurar
          </button>
        </div>

        {/* CARD 3 */}
        <div className="rel-card olive">
          <div className="rel-icon olive">
            <Users size={22} />
          </div>

          <h3 className="rel-title">Análise de Clientes</h3>
          <p className="rel-desc">
            Comportamento e ticket médio por cliente
          </p>

          <button className="btn-config">
            <Calendar size={16} />
            Configurar
          </button>
        </div>

      </div>

    </div>
  );
}
