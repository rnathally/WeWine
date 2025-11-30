import { useEffect, useState } from "react";
import "./ListaRepresentantes.css";

import FormularioRepresentante from "./FormularioRepresentante";
import DetalhesRepresentante from "./DetalhesRepresentante";

import { FiMapPin, FiMail, FiPhone, FiUserCheck } from "react-icons/fi";

import {
  getRepresentantes,
  criarRepresentante,
  // atualizarRepresentante, // você pode usar depois no DetalhesRepresentante
  // excluirRepresentante,   // quando tiver botão de excluir
} from "../../services/representanteService";

// =======================
// Tipo usado na listagem
// (deve bater com o que o backend devolve no GET /representantes)
// =======================
export interface Representante {
  id: string;
  nome: string;
  regiao: string;
  vendas: number;
  comissao: number;
  clientesAtivos: number;
  performance: number;
  possuiAcesso: boolean;

  // opcionais para layout mais rico
  email?: string;
  telefone?: string;
  cidades?: string[]; // ex: ["Criciúma", "Lauro Müller"]
}

export default function ListaRepresentantes() {
  const [representantes, setRepresentantes] = useState<Representante[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [abrirForm, setAbrirForm] = useState(false);
  const [abrirDetalhes, setAbrirDetalhes] = useState(false);
  const [repSelecionado, setRepSelecionado] = useState<Representante | null>(
    null
  );

  // =======================
  // Carregar representantes
  // =======================
  async function carregarRepresentantes() {
    try {
      setErro(null);
      setCarregando(true);

      // 🔗 AGORA USA O SERVICE
      // se o back estiver fora, você pode fazer o service devolver MOCK lá dentro
      const lista = await getRepresentantes();
      setRepresentantes(lista);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar representantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarRepresentantes();
  }, []);

  // =======================
  // Abrir formulário (novo)
  // =======================
  function abrirFormularioNovo() {
    setRepSelecionado(null);
    setAbrirForm(true);
  }

  // =======================
  // Abrir modal de detalhes (edição completa)
  // =======================
  function abrirDetalhesRep(rep: Representante) {
    setRepSelecionado(rep);
    setAbrirDetalhes(true);
  }

  // =======================
  // Salvar NOVO representante (vindo do FormularioRepresentante)
  // =======================
  async function handleSalvarNovo(dadosForm: any) {
    try {
      setErro(null);

      // 🔗 Quando o back estiver pronto, o service deve:
      // - receber esses dados de cadastro
      // - criar no banco
      // - devolver o representante já com ID e campos de listagem
      const novoRep = await criarRepresentante(dadosForm);

      // atualiza a lista na tela
      setRepresentantes((prev) => [...prev, novoRep]);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar representante.");
    }
  }

  const formatCurrency = (valor: number) =>
    `R$ ${valor.toLocaleString("pt-BR")}`;

  const getStatusLabel = (rep: Representante) =>
    rep.possuiAcesso ? "Ativo" : "Sem acesso";

  return (
    <div className="dashboard-wrapper rep-container">
      {/* TOPO DA PÁGINA */}
      <div className="rep-top">
        <div>
          <h1>Representantes de Venda</h1>
          <p className="rep-sub">Gerencie sua equipe de vendas e comissões</p>
        </div>

        <button className="btn-novo" onClick={abrirFormularioNovo}>
          + Novo Representante
        </button>
      </div>

      {carregando && <p>Carregando representantes...</p>}

      {erro && (
        <div className="erro-box">
          <p>{erro}</p>
          <button onClick={carregarRepresentantes}>Tentar novamente</button>
        </div>
      )}

      {!carregando && !erro && (
        <div className="rep-grid">
          {representantes.map((rep) => {
            const totalRegioes = rep.cidades?.length ?? 0;

            const labelLocal =
              totalRegioes > 0
                ? `${totalRegioes} ${
                    totalRegioes === 1
                      ? "região de atuação"
                      : "regiões de atuação"
                  }`
                : rep.regiao;

            const tooltipLocal =
              totalRegioes > 0
                ? rep.cidades!.join(" • ")
                : rep.regiao || "";

            return (
              <div key={rep.id} className="rep-card">
                {/* HEADER DO CARD: nome + info de atuação + status */}
                <div className="rep-card-header">
                  <div>
                    <h2>{rep.nome}</h2>

                    {(totalRegioes > 0 || rep.regiao) && (
                      <div className="rep-local" title={tooltipLocal}>
                        <FiMapPin />
                        <span>{labelLocal}</span>
                      </div>
                    )}
                  </div>

                  <span
                    className={
                      rep.possuiAcesso
                        ? "rep-status rep-status--ativo"
                        : "rep-status rep-status--inativo"
                    }
                  >
                    <FiUserCheck />
                    {getStatusLabel(rep)}
                  </span>
                </div>

                {/* CONTATO */}
                <div className="rep-contact">
                  <div className="rep-contact-line">
                    <FiMail />
                    <span>{rep.email ?? "sem e-mail"}</span>
                  </div>
                  <div className="rep-contact-line">
                    <FiPhone />
                    <span>{rep.telefone ?? "sem telefone"}</span>
                  </div>
                </div>

                {/* MÉTRICAS PRINCIPAIS */}
                <div className="rep-metricas">
                  <div className="rep-metrica">
                    <span className="rep-metrica-num">
                      {rep.clientesAtivos}
                    </span>
                    <span className="rep-metrica-label">Clientes Ativos</span>
                  </div>
                  <div className="rep-metrica">
                    <span className="rep-metrica-num rep-metrica-num--green">
                      {formatCurrency(rep.vendas)}
                    </span>
                    <span className="rep-metrica-label">Vendas no Mês</span>
                  </div>
                </div>

                {/* CIDADES DE ATUAÇÃO */}
                <div className="rep-cidades">
                  <span className="rep-cidades-label">
                    Cidades de Atuação:
                  </span>
                  <div className="rep-chips">
                    {(rep.cidades && rep.cidades.length > 0
                      ? rep.cidades
                      : [rep.regiao]
                    ).map((cidade) => (
                      <span key={cidade} className="rep-chip">
                        {cidade}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AÇÕES */}
                <div className="rep-actions">
                  {/* Aqui deixei só "Ver Detalhes", que é onde você edita tudo */}
                  <button
                    className="rep-btn rep-btn--primary"
                    onClick={() => abrirDetalhesRep(rep)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL FORMULÁRIO (NOVO) */}
      {abrirForm && (
        <div className="modal-overlay" onClick={() => setAbrirForm(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <FormularioRepresentante
              fechar={() => setAbrirForm(false)}
              onSalvar={handleSalvarNovo}
            />
          </div>
        </div>
      )}

      {/* MODAL DETALHES (EDIÇÃO) */}
      {abrirDetalhes && repSelecionado && (
        <DetalhesRepresentante
          rep={repSelecionado}
          fechar={() => setAbrirDetalhes(false)}
        />
      )}
    </div>
  );
}
