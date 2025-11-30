import { useState } from "react";
import type { ReactNode } from "react";

import { User, Mail, MapPin, Globe, Wallet, Lock } from "lucide-react";

import SelectOpcoes from "../../componentes/inputs/SelectOpcoes";
import "./FormularioRepresentante.css";

interface FormData {
  nome: string;
  documento: string;
  rg: string;
  nascimento: string;
  fantasia: string;
  situacao: string;
  status: boolean;

  email: string;
  celular: string;

  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  cidades: string[]; // regiões de atuação (até 3)
  regraComissao: string;
  observacoes: string;

  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;

  acessoApp: boolean;
  loginApp: string;
  senhaApp: string;
}

interface FormRepProps {
  fechar?: () => void;
  /**
   * 🔗 Quando ligar com o backend:
   * - Passe essa prop a partir do ListaRepresentantes
   * - Aí você chama criarRepresentante/atualizarRepresentante dentro dela
   */
  onSalvar?: (dados: FormData) => Promise<void> | void;
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

export default function FormularioRepresentante({
  fechar = () => {},
  onSalvar,
}: FormRepProps) {
  const [form, setForm] = useState<FormData>({
    nome: "",
    documento: "",
    rg: "",
    nascimento: "",
    fantasia: "",
    situacao: "",
    status: true,

    email: "",
    celular: "",

    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",

    cidades: [],
    regraComissao: "",
    observacoes: "",

    banco: "",
    agencia: "",
    conta: "",
    tipoConta: "",

    acessoApp: false,
    loginApp: "",
    senhaApp: "",
  });

  // erros específicos de login/senha do app
  const [errosApp, setErrosApp] = useState<{ login?: string; senha?: string }>(
    {}
  );

  function atualizar(campo: string, valor: any) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  // multi-região (até 3)
  function adicionarRegiao(cidade: string) {
    setForm((prev) => {
      const atuais = prev.cidades || [];
      if (atuais.includes(cidade) || atuais.length >= 3) return prev;
      return { ...prev, cidades: [...atuais, cidade] };
    });
  }

  function removerRegiao(cidade: string) {
    setForm((prev) => ({
      ...prev,
      cidades: (prev.cidades || []).filter((c) => c !== cidade),
    }));
  }

  async function salvar() {
    // valida login/senha se o acesso ao app estiver habilitado
    if (form.acessoApp) {
      const novosErros: { login?: string; senha?: string } = {};

      if (!form.loginApp.trim()) {
        novosErros.login = "Informe um login para o aplicativo.";
      }
      if (!form.senhaApp.trim()) {
        novosErros.senha = "Informe uma senha para o aplicativo.";
      }

      if (Object.keys(novosErros).length > 0) {
        setErrosApp(novosErros);
        return; // não deixa salvar
      }
    }

    // 🔗 CAMINHO IDEAL: deixar o pai (ListaRepresentantes) falar com o backend
    if (onSalvar) {
      await onSalvar(form);
      fechar();
      return;
    }

    /*
    // 🔗 ALTERNATIVA: se quiser salvar direto daqui, sem passar pelo pai:
    try {
      const resposta = await fetch("http://localhost:3000/representantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // aqui você pode mapear pro formato do back
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar representante");
      }

      alert("Representante salvo com sucesso!");
      fechar();
      return;
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar representante.");
      return;
    }
    */

    // MOCK atual (enquanto o back não está plugado)
    console.log("Representante (mock):", form);
    alert("Representante salvo! (mock)");
    fechar();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Novo Representante</h2>
          <button className="btn-close" onClick={fechar}>
            ×
          </button>
        </div>

        <div className="accordion">
          {/* IDENTIFICAÇÃO */}
          <AccordionItem titulo="Identificação" icon={<User size={18} />}>
            <div className="form-grid">
              <Campo label="Nome Completo *">
                <input
                  value={form.nome}
                  onChange={(e) => atualizar("nome", e.target.value)}
                />
              </Campo>

              <Campo label="CPF/CNPJ *">
                <input
                  value={form.documento}
                  onChange={(e) => atualizar("documento", e.target.value)}
                />
              </Campo>

              <Campo label="RG / IE">
                <input
                  value={form.rg}
                  onChange={(e) => atualizar("rg", e.target.value)}
                />
              </Campo>

              <Campo label="Nascimento">
                <input
                  type="date"
                  value={form.nascimento}
                  onChange={(e) => atualizar("nascimento", e.target.value)}
                />
              </Campo>

              <Campo label="Nome Fantasia">
                <input
                  value={form.fantasia}
                  onChange={(e) => atualizar("fantasia", e.target.value)}
                />
              </Campo>

              <Campo label="Situação Legal">
                <SelectOpcoes
                  valor={form.situacao}
                  placeholder="Selecione"
                  aoMudar={(valor) => atualizar("situacao", valor)}
                  opcoes={situacoesLegais.map((s) => ({
                    label: s,
                    value: s,
                  }))}
                  largura="100%"
                />
              </Campo>

              <Campo label="Status">
                <div
                  className="switch-box"
                  onClick={() => atualizar("status", !form.status)}
                >
                  <div
                    className={`switch-track ${
                      form.status ? "on" : "off"
                    }`}
                  >
                    <div className="switch-thumb" />
                  </div>
                  <span className="switch-label">
                    {form.status ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </Campo>
            </div>
          </AccordionItem>

          {/* CONTATO */}
          <AccordionItem titulo="Contato" icon={<Mail size={18} />}>
            <div className="form-grid">
              <Campo label="E-mail">
                <input
                  value={form.email}
                  onChange={(e) => atualizar("email", e.target.value)}
                />
              </Campo>

              <Campo label="Celular / WhatsApp">
                <input
                  value={form.celular}
                  onChange={(e) => atualizar("celular", e.target.value)}
                />
              </Campo>
            </div>
          </AccordionItem>

          {/* ENDEREÇO */}
          <AccordionItem titulo="Endereço" icon={<MapPin size={18} />}>
            <div className="form-grid">
              <Campo label="CEP">
                <input
                  value={form.cep}
                  onChange={(e) => atualizar("cep", e.target.value)}
                />
              </Campo>

              <Campo label="Endereço">
                <input
                  value={form.endereco}
                  onChange={(e) => atualizar("endereco", e.target.value)}
                />
              </Campo>

              <Campo label="Número">
                <input
                  value={form.numero}
                  onChange={(e) => atualizar("numero", e.target.value)}
                />
              </Campo>

              <Campo label="Complemento">
                <input
                  value={form.complemento}
                  onChange={(e) => atualizar("complemento", e.target.value)}
                />
              </Campo>

              <Campo label="Bairro">
                <input
                  value={form.bairro}
                  onChange={(e) => atualizar("bairro", e.target.value)}
                />
              </Campo>

              <Campo label="Cidade">
                <SelectOpcoes
                  valor={form.cidade}
                  placeholder="Selecione"
                  aoMudar={(valor) => atualizar("cidade", valor)}
                  opcoes={cidadesSC.map((c) => ({
                    label: c,
                    value: c,
                  }))}
                  largura="100%"
                />
              </Campo>

              <Campo label="Estado">
                <input
                  value={form.estado}
                  onChange={(e) => atualizar("estado", e.target.value)}
                />
              </Campo>
            </div>
          </AccordionItem>

          {/* ATUAÇÃO COMERCIAL */}
          <AccordionItem titulo="Atuação Comercial" icon={<Globe size={18} />}>
            <div className="form-grid">
              <Campo label="Regiões de Atuação (até 3)" className="full">
                <div className="form-multi-select">
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
                        (cidade) =>
                          !(form.cidades || []).includes(cidade)
                      )
                      .map((cidade) => ({
                        label: cidade,
                        value: cidade,
                      }))}
                    largura="100%"
                  />

                  <div className="form-multi-chips">
                    {(form.cidades || []).map((cidade) => (
                      <button
                        key={cidade}
                        type="button"
                        className="form-chip"
                        onClick={() => removerRegiao(cidade)}
                      >
                        {cidade}
                        <span className="form-chip-x">×</span>
                      </button>
                    ))}

                    {(form.cidades || []).length === 0 && (
                      <span className="form-multi-placeholder">
                        Nenhuma região selecionada
                      </span>
                    )}
                  </div>
                </div>
              </Campo>

              <Campo label="Regra de Comissão">
                <SelectOpcoes
                  valor={form.regraComissao}
                  placeholder="Selecione"
                  aoMudar={(valor) =>
                    atualizar("regraComissao", valor)
                  }
                  opcoes={regrasComissao.map((r) => ({
                    label: r,
                    value: r,
                  }))}
                  largura="100%"
                />
              </Campo>

              <Campo label="Observações" className="full">
                <textarea
                  value={form.observacoes}
                  onChange={(e) =>
                    atualizar("observacoes", e.target.value)
                  }
                />
              </Campo>
            </div>
          </AccordionItem>

          {/* DADOS BANCÁRIOS */}
          <AccordionItem titulo="Dados Bancários" icon={<Wallet size={18} />}>
            <div className="form-grid">
              <Campo label="Banco">
                <input
                  value={form.banco}
                  onChange={(e) => atualizar("banco", e.target.value)}
                />
              </Campo>

              <Campo label="Agência">
                <input
                  value={form.agencia}
                  onChange={(e) => atualizar("agencia", e.target.value)}
                />
              </Campo>

              <Campo label="Conta">
                <input
                  value={form.conta}
                  onChange={(e) => atualizar("conta", e.target.value)}
                />
              </Campo>

              <Campo label="Tipo de Conta">
                <SelectOpcoes
                  valor={form.tipoConta}
                  placeholder="Selecione"
                  aoMudar={(valor) => atualizar("tipoConta", valor)}
                  opcoes={tiposConta.map((t) => ({
                    label: t,
                    value: t,
                  }))}
                  largura="100%"
                />
              </Campo>
            </div>
          </AccordionItem>

          {/* ACESSO AO APLICATIVO */}
          <AccordionItem titulo="Acesso ao Aplicativo" icon={<Lock size={18} />}>
            <div className="form-grid">
              <Campo label="Conceder acesso ao App" className="full">
                <div
                  className="switch-box"
                  onClick={() => {
                    const novo = !form.acessoApp;
                    atualizar("acessoApp", novo);
                    if (!novo) {
                      // limpamos erros se desativar o acesso
                      setErrosApp({});
                    }
                  }}
                >
                  <div
                    className={`switch-track ${
                      form.acessoApp ? "on" : "off"
                    }`}
                  >
                    <div className="switch-thumb" />
                  </div>
                  <span className="switch-label">
                    {form.acessoApp ? "Acesso Liberado" : "Sem acesso"}
                  </span>
                </div>
              </Campo>

              <Campo label="Login do Aplicativo">
                <input
                  value={form.loginApp}
                  onChange={(e) => {
                    atualizar("loginApp", e.target.value);
                    setErrosApp((prev) => ({ ...prev, login: undefined }));
                  }}
                  disabled={!form.acessoApp}
                />
                {errosApp.login && (
                  <span className="campo-erro">{errosApp.login}</span>
                )}
              </Campo>

              <Campo label="Senha de Acesso">
                <input
                  type="password"
                  value={form.senhaApp}
                  onChange={(e) => {
                    atualizar("senhaApp", e.target.value);
                    setErrosApp((prev) => ({ ...prev, senha: undefined }));
                  }}
                  disabled={!form.acessoApp}
                />
                {errosApp.senha && (
                  <span className="campo-erro">{errosApp.senha}</span>
                )}
              </Campo>
            </div>
          </AccordionItem>
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={fechar}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={salvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE CAMPO */
function Campo({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`campo-form ${className || ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}

/* ACCORDION */
function AccordionItem({
  titulo,
  icon,
  children,
}: {
  titulo: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="acc-item">
      <button className="acc-header" onClick={() => setOpen(!open)}>
        <div className="acc-left">
          <span className="acc-icon-left">{icon}</span>
          <span>{titulo}</span>
        </div>

        <div className="acc-right">
          <span className={`arrow arrow-down ${open ? "hide" : ""}`}>▾</span>
          <span className={`arrow arrow-up ${open ? "show" : ""}`}>▴</span>
        </div>
      </button>

      <div className={`acc-content ${open ? "open" : ""}`}>{children}</div>
    </div>
  );
}
