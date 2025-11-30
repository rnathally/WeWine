import { useEffect, useState } from "react";
import type { Vinho } from "../../tipos/Vinho";
import "./FormularioVinho.css";

type Props = {
  fechar: () => void;
  salvar: (v: Vinho) => void;
  vinho: Vinho | null;
};

/**
 * Estado interno do formulário.
 * Inclui `regiao` para já deixar pronto pro backend.
 */
interface VinhoForm {
  nome: string;
  tipo: string;
  safra: number;
  regiao: string;
  preco: number;
  estoque: number;
  notasDegustacao: string;
}

export default function FormularioVinho({ fechar, salvar, vinho }: Props) {
  const [form, setForm] = useState<VinhoForm>({
    nome: "",
    tipo: "",
    safra: 0,
    regiao: "",
    preco: 0,
    estoque: 0,
    notasDegustacao: "",
  });

  const modoEdicao = !!vinho;

  /** Carregar dados para edição ou resetar se for cadastro */
  useEffect(() => {
    if (vinho) {
      setForm({
        nome: vinho.nome ?? "",
        tipo: vinho.tipo ?? "",
        safra: vinho.safra ?? 0,
        // se já existir campo regiao no tipo Vinho, ele entra aqui
        regiao: (vinho as any).regiao ?? "",
        preco: vinho.preco ?? 0,
        estoque: vinho.estoque ?? 0,
        notasDegustacao: vinho.notasDegustacao ?? "",
      });
    } else {
      setForm({
        nome: "",
        tipo: "",
        safra: 0,
        regiao: "",
        preco: 0,
        estoque: 0,
        notasDegustacao: "",
      });
    }
  }, [vinho]);

  function atualizar(campo: keyof VinhoForm, valor: string | number) {
    setForm((prev) => ({
      ...prev,
      [campo]:
        campo === "safra" || campo === "preco" || campo === "estoque"
          ? Number(valor)
          : (valor as string),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // monta o payload que vai para o ListaVinhos
    const payload: Vinho & { regiao?: string } = {
      ...(vinho || ({} as Vinho)), // mantém id se estiver editando
      nome: form.nome,
      tipo: form.tipo,
      safra: form.safra,
      preco: form.preco,
      estoque: form.estoque,
      notasDegustacao: form.notasDegustacao,
      // quando você adicionar "regiao" no tipo Vinho + backend, já fica pronto
      ...(form.regiao ? { regiao: form.regiao } : {}),
    };

    salvar(payload as Vinho);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-vinho">
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>{modoEdicao ? "Editar Vinho" : "Novo Vinho"}</h2>
            <p className="modal-subtitle">
              {modoEdicao
                ? "Atualize as informações do vinho abaixo"
                : "Cadastre as informações do vinho abaixo"}
            </p>
          </div>

          <button className="btn-close" type="button" onClick={fechar}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-vinho">
          {/* Nome + Safra */}
          <div className="linha">
            <div className="campo">
              <label>Nome do Vinho *</label>
              <input
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                placeholder="Ex: Reserva Especial"
                required
              />
            </div>

            <div className="campo">
              <label>Safra *</label>
              <input
                type="number"
                value={form.safra || ""}
                onChange={(e) => atualizar("safra", e.target.value)}
                placeholder="Ex: 2019"
                required
              />
            </div>
          </div>

          {/* Tipo + Região */}
          <div className="linha">
            <div className="campo">
              <label>Tipo *</label>
              <input
                value={form.tipo}
                onChange={(e) => atualizar("tipo", e.target.value)}
                placeholder="Ex: Tinto, Branco, Licoroso..."
                required
              />
            </div>

            <div className="campo">
              <label>Região *</label>
              <input
                value={form.regiao}
                onChange={(e) => atualizar("regiao", e.target.value)}
                placeholder="Ex: Vale dos Vinhedos"
              />
            </div>
          </div>

          {/* Preço + Estoque */}
          <div className="linha">
            <div className="campo">
              <label>Preço *</label>
              <input
                type="number"
                step="0.01"
                min={0}
                value={form.preco || ""}
                onChange={(e) => atualizar("preco", e.target.value)}
                placeholder="Ex: R$ 160,00"
                required
              />
            </div>

            <div className="campo">
              <label>Estoque *</label>
              <input
                type="number"
                min={0}
                value={form.estoque || ""}
                onChange={(e) => atualizar("estoque", e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Notas */}
          <div className="linha">
            <div className="campo campo-full">
              <label>Notas de degustação</label>
              <textarea
                value={form.notasDegustacao}
                onChange={(e) =>
                  atualizar("notasDegustacao", e.target.value)
                }
                placeholder="Ex: Taninos macios, notas de frutas vermelhas e baunilha..."
              />
            </div>
          </div>

          <div className="modal-botoes">
            <button
              type="button"
              onClick={fechar}
              className="btn-cancelar"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-ok">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
