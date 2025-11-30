import { useState } from "react";
import "./DetalhesRepresentante.css";

import {
  User,
  Mail,
  MapPin,
  Globe,
  Wallet,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";

import SelectOpcoes from "../../componentes/inputs/SelectOpcoes"; // ⬅️ ajuste o path se preciso

interface Props {
  rep: any;
  fechar: () => void;
}

const cidadesSC = [
  "Araranguá",
  "Balneário Camboriú",
  "Blumenau",
  "Chapecó",
  "Criciúma",
  "Florianópolis",
  "Itajaí",
  "Jaraguá do Sul",
  "Joinville",
  "Lages",
  "Tubarão",
  "Orleans",
  "Maracajá",
  "Lauro Muller",
  "Içara",
  "Cocal do Sul",
  "Nova Veneza",
  "Sideropólis",
];

const regrasComissao = ["1%", "3%", "5%", "7%"];
const tiposConta = ["Corrente", "Poupança"];
const situacoesLegais = ["Pessoa Física", "Pessoa Jurídica", "CLT"];

export default function DetalhesRepresentante({ rep, fechar }: Props) {
  const [form, setForm] = useState<any>({
    ...rep,
    cidades: rep.cidades ?? [],
  });

  function atualizar(campo: string, valor: any) {
    setForm((f: any) => ({ ...f, [campo]: valor }));
  }

  function adicionarRegiao(cidade: string) {
    setForm((f: any) => {
      const atuais: string[] = f.cidades ?? [];
      if (atuais.includes(cidade) || atuais.length >= 3) return f;
      return { ...f, cidades: [...atuais, cidade] };
    });
  }

  function removerRegiao(cidade: string) {
    setForm((f: any) => ({
      ...f,
      cidades: (f.cidades ?? []).filter((c: string) => c !== cidade),
    }));
  }

  async function salvar() {
    /*
    // QUANDO O BACK ESTIVER PRONTO, DESCOMENTA:
    try {
      const resposta = await fetch(
        `http://localhost:3000/representantes/${form.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao salvar representante");
      }

      alert("Alterações salvas com sucesso!");
      fechar();
      return;
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar alterações.");
      return;
    }
    */

    // MOCK
    alert("Alterações salvas! (mock)");
    fechar();
  }

  return (
    <div className="det-modal-bg">
      <div className="det-modal">
        {/* HEADER */}
        <div className="det-header">
          <div className="det-header-main">
            <div className="det-avatar">
              {rep.nome
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div className="det-top-info">
              <span className="det-top-sigla">RA</span>
              <h2>{rep.nome}</h2>
            </div>
          </div>

          <button className="det-close" onClick={fechar}>
            ×
          </button>
        </div>

        {/* RESUMO */}
        <div className="det-resumo">
          <div className="det-card">
            <TrendingUp size={18} />
            <div>
              <span>Vendas</span>
              <strong>R$ {rep.vendas.toLocaleString("pt-BR")}</strong>
            </div>
          </div>

          <div className="det-card">
            <DollarSign size={18} />
            <div>
              <span>Comissão</span>
              <strong>R$ {rep.comissao.toLocaleString("pt-BR")}</strong>
            </div>
          </div>

          <div className="det-card">
            <Users size={18} />
            <div>
              <span>Clientes Ativos</span>
              <strong>{rep.clientesAtivos}</strong>
            </div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO */}
        <div className="det-secao">
          <h3>
            <User size={18} /> Identificação
          </h3>

          <div className="det-grid">
            <Campo label="Nome Completo">
              <input
                value={form.nome || ""}
                onChange={(e) => atualizar("nome", e.target.value)}
              />
            </Campo>

            <Campo label="CPF/CNPJ">
              <input
                value={form.documento || ""}
                onChange={(e) => atualizar("documento", e.target.value)}
              />
            </Campo>

            <Campo label="RG / IE">
              <input
                value={form.rg || ""}
                onChange={(e) => atualizar("rg", e.target.value)}
              />
            </Campo>

            <Campo label="Nascimento">
              <input
                type="date"
                value={form.nascimento || ""}
                onChange={(e) => atualizar("nascimento", e.target.value)}
                className="det-date-input"
              />
            </Campo>

            <Campo label="Nome Fantasia">
              <input
                value={form.fantasia || ""}
                onChange={(e) => atualizar("fantasia", e.target.value)}
              />
            </Campo>

            <Campo label="Situação Legal">
              <SelectOpcoes
                valor={form.situacao || ""}
                placeholder="Selecione a situação"
                aoMudar={(valor) => atualizar("situacao", valor)}
                opcoes={situacoesLegais.map((s) => ({
                  label: s,
                  value: s,
                }))}
                largura="100%"
              />
            </Campo>
          </div>
        </div>

        {/* CONTATO */}
        <div className="det-secao">
          <h3>
            <Mail size={18} /> Contato
          </h3>

          <div className="det-grid">
            <Campo label="E-mail">
              <input
                value={form.email || ""}
                onChange={(e) => atualizar("email", e.target.value)}
              />
            </Campo>

            <Campo label="Celular / WhatsApp">
              <input
                value={form.celular || ""}
                onChange={(e) => atualizar("celular", e.target.value)}
              />
            </Campo>
          </div>
        </div>

        {/* ENDEREÇO */}
        <div className="det-secao">
          <h3>
            <MapPin size={18} /> Endereço
          </h3>

          <div className="det-grid">
            <Campo label="CEP">
              <input
                value={form.cep || ""}
                onChange={(e) => atualizar("cep", e.target.value)}
              />
            </Campo>

            <Campo label="Endereço">
              <input
                value={form.endereco || ""}
                onChange={(e) => atualizar("endereco", e.target.value)}
              />
            </Campo>

            <Campo label="Número">
              <input
                value={form.numero || ""}
                onChange={(e) => atualizar("numero", e.target.value)}
              />
            </Campo>

            <Campo label="Complemento">
              <input
                value={form.complemento || ""}
                onChange={(e) =>
                  atualizar("complemento", e.target.value)
                }
              />
            </Campo>

            <Campo label="Bairro">
              <input
                value={form.bairro || ""}
                onChange={(e) => atualizar("bairro", e.target.value)}
              />
            </Campo>

            <Campo label="Cidade">
              <SelectOpcoes
                valor={form.cidade || ""}
                placeholder="Selecione a cidade"
                aoMudar={(valor) => atualizar("cidade", valor)}
                opcoes={cidadesSC.map((cidade) => ({
                  label: cidade,
                  value: cidade,
                }))}
                largura="100%"
              />
            </Campo>

            <Campo label="Estado">
              <input
                value={form.estado || ""}
                onChange={(e) => atualizar("estado", e.target.value)}
              />
            </Campo>
          </div>
        </div>

        {/* ATUAÇÃO */}
        <div className="det-secao">
          <h3>
            <Globe size={18} /> Atuação Comercial
          </h3>

          <div className="det-grid">
            <Campo label="Regiões de Atuação (até 3)">
              <div className="det-multi-select">
                <SelectOpcoes
                  valor=""
                  placeholder={
                    (form.cidades?.length || 0) >= 3
                      ? "Limite de 3 regiões atingido"
                      : "Adicionar região"
                  }
                  aoMudar={adicionarRegiao}
                  opcoes={cidadesSC
                    .filter(
                      (cidade) => !(form.cidades ?? []).includes(cidade)
                    )
                    .map((cidade) => ({
                      label: cidade,
                      value: cidade,
                    }))}
                  largura="100%"
                />

                <div className="det-multi-chips">
                  {(form.cidades ?? []).map((cidade: string) => (
                    <button
                      key={cidade}
                      type="button"
                      className="det-chip"
                      onClick={() => removerRegiao(cidade)}
                    >
                      {cidade}
                      <span className="det-chip-x">×</span>
                    </button>
                  ))}

                  {(form.cidades ?? []).length === 0 && (
                    <span className="det-multi-placeholder">
                      Nenhuma região selecionada
                    </span>
                  )}
                </div>
              </div>
            </Campo>

            <Campo label="Regra de Comissão">
              <SelectOpcoes
                valor={form.regraComissao || ""}
                placeholder="Selecione a regra"
                aoMudar={(valor) => atualizar("regraComissao", valor)}
                opcoes={regrasComissao.map((regra) => ({
                  label: regra,
                  value: regra,
                }))}
                largura="100%"
              />
            </Campo>

            <Campo label="Status do Representante" className="full">
              <div className="det-status-toggle">
                <button
                  type="button"
                  className={form.possuiAcesso ? "ativo" : "inativo"}
                  onClick={() =>
                    atualizar("possuiAcesso", !form.possuiAcesso)
                  }
                >
                  {form.possuiAcesso ? "Ativo" : "Inativo"}
                </button>
              </div>
            </Campo>

            <Campo label="Observações" className="full">
              <textarea
                value={form.observacoes || ""}
                onChange={(e) =>
                  atualizar("observacoes", e.target.value)
                }
              />
            </Campo>
          </div>
        </div>

        {/* DADOS BANCÁRIOS */}
        <div className="det-secao">
          <h3>
            <Wallet size={18} /> Dados Bancários
          </h3>

          <div className="det-grid">
            <Campo label="Banco">
              <input
                value={form.banco || ""}
                onChange={(e) => atualizar("banco", e.target.value)}
              />
            </Campo>

            <Campo label="Agência">
              <input
                value={form.agencia || ""}
                onChange={(e) => atualizar("agencia", e.target.value)}
              />
            </Campo>

            <Campo label="Conta">
              <input
                value={form.conta || ""}
                onChange={(e) => atualizar("conta", e.target.value)}
              />
            </Campo>

            <Campo label="Tipo de Conta">
              <SelectOpcoes
                valor={form.tipoConta || ""}
                placeholder="Selecione o tipo"
                aoMudar={(valor) => atualizar("tipoConta", valor)}
                opcoes={tiposConta.map((t) => ({
                  label: t,
                  value: t,
                }))}
                largura="100%"
              />
            </Campo>
          </div>
        </div>

        {/* FOOTER */}
        <div className="det-actions">
          <button className="btn-cancelar" onClick={fechar}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={salvar}>
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

function Campo({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`det-campo ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
