import { useEffect, useState } from "react";
import type { FC } from "react";
import "./FormularioCliente.css";

export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  responsavel: string;
  email: string;
  telefone: string;
  formasPagamento: string[];
}

interface Props {
  fechar: () => void;
  adicionar: (c: Cliente) => void;
  editar?: (c: Cliente) => void;
  cliente?: Cliente | null;
}

const cidadesSC = [
  "Araranguá", "Balneário Camboriú", "Blumenau", "Chapecó",
  "Criciúma", "Florianópolis", "Itajaí", "Jaraguá do Sul",
  "Joinville", "Lages", "Tubarão", "Orleans", "Maracajá",
  "Lauro Muller", "Içara", "Cocal do Sul", "Nova Veneza",
  "Sideropólis"
];

const formas = [
  "PIX",
  "Boleto 15 dias",
  "Boleto 30 dias",
  "Cartão de crédito"
];

const FormularioCliente: FC<Props> = ({ fechar, adicionar, editar, cliente }) => {
  const [form, setForm] = useState<Cliente>({
    id: cliente?.id ?? crypto.randomUUID(),
    nome: cliente?.nome ?? "",
    cpfCnpj: cliente?.cpfCnpj ?? "",
    endereco: cliente?.endereco ?? "",
    cidade: cliente?.cidade ?? "",
    estado: cliente?.estado ?? "SC",
    cep: cliente?.cep ?? "",
    responsavel: cliente?.responsavel ?? "",
    email: cliente?.email ?? "",
    telefone: cliente?.telefone ?? "",
    formasPagamento: cliente?.formasPagamento ?? []
  });

  useEffect(() => {
    if (cliente) {
      setForm(cliente);
    } else {
      setForm({
        id: crypto.randomUUID(),
        nome: "",
        cpfCnpj: "",
        endereco: "",
        cidade: "",
        estado: "SC",
        cep: "",
        responsavel: "",
        email: "",
        telefone: "",
        formasPagamento: []
      });
    }
  }, [cliente]);

  const salvar = () => {
    if (!form.nome.trim() || !form.cpfCnpj.trim()) {
      alert("Preencha Nome e CPF/CNPJ.");
      return;
    }

    cliente ? editar?.(form) : adicionar(form);
    fechar();
  };

  const toggleFormaPagamento = (fp: string) => {
    setForm(prev => ({
      ...prev,
      formasPagamento: prev.formasPagamento.includes(fp)
        ? prev.formasPagamento.filter(f => f !== fp)
        : [...prev.formasPagamento, fp]
    }));
  };

  return (
    <div className="cliente-modal-overlay" onClick={fechar}>
      <div className="cliente-modal-card" onClick={e => e.stopPropagation()}>
        {/* HEADER */}
        <div className="cliente-modal-header">
          <div>
            <h2>{cliente ? "Editar Cliente" : "Novo Cliente"}</h2>
          </div>

          <button className="cliente-btn-fechar" onClick={fechar}>×</button>
        </div>

        {/* FORM */}
        <div className="cliente-form-grid">

          <div className="cliente-campo">
            <label>Nome</label>
            <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          </div>

          <div className="cliente-campo">
            <label>CPF/CNPJ</label>
            <input value={form.cpfCnpj} onChange={e => setForm({ ...form, cpfCnpj: e.target.value })} />
          </div>

          <div className="cliente-campo cliente-col-span">
            <label>Endereço</label>
            <input value={form.endereco} onChange={e => setForm({ ...form, endereco: e.target.value })} />
          </div>

          <div className="cliente-campo">
            <label>Cidade</label>
            <select value={form.cidade} onChange={e => setForm({ ...form, cidade: e.target.value })}>
              <option value="">Selecione</option>
              {cidadesSC.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="cliente-campo">
            <label>Estado</label>
            <input value={form.estado} disabled />
          </div>

          <div className="cliente-campo">
            <label>CEP</label>
            <input value={form.cep} onChange={e => setForm({ ...form, cep: e.target.value })} />
          </div>

          <div className="cliente-campo">
            <label>Responsável</label>
            <input value={form.responsavel} onChange={e => setForm({ ...form, responsavel: e.target.value })} />
          </div>

          <div className="cliente-campo">
            <label>Email</label>
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="cliente-campo">
            <label>Telefone</label>
            <input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
          </div>

          <div className="cliente-campo cliente-col-span">
            <label>Formas de Pagamento</label>

            <div className="cliente-formas-container">
              {formas.map(f => (
                <button
                  key={f}
                  type="button"
                  className={`cliente-forma-opcao ${form.formasPagamento.includes(f) ? "ativa" : ""}`}
                  onClick={() => toggleFormaPagamento(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="cliente-modal-actions">
          <button className="cliente-btn-cancelar" onClick={fechar}>Cancelar</button>
          <button className="cliente-btn-salvar" onClick={salvar}>
            {cliente ? "Salvar alterações" : "Salvar"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FormularioCliente;
