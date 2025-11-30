import { useState, useEffect } from "react";
import { FiList, FiGrid, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

import FormularioVinho from "./FormularioVinho";
import type { Vinho } from "../../tipos/Vinho";

import {
  getVinhos,
  criarVinho,
  editarVinho,
  excluirVinho,
} from "../../services/vinhosService";

import "./Vinhos.css";

export default function ListaVinhos() {
  const [modoGrid, setModoGrid] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [vinhos, setVinhos] = useState<Vinho[]>([]);
  const [busca, setBusca] = useState("");
  const [vinhoEditando, setVinhoEditando] = useState<Vinho | null>(null);

  // 🔹 Carregar vinhos (API ou Mock)
  useEffect(() => {
    async function carregar() {
      const lista = await getVinhos();
      setVinhos(lista);
    }
    carregar();
  }, []);

  // 🔹 Filtro
  const filtrados = vinhos.filter((v) =>
    v.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // 🔹 Salvar (novo + edição)
  async function salvar(v: Vinho) {
    if (v.id) {
      await editarVinho(v);
      setVinhos((prev) => prev.map((vin) => (vin.id === v.id ? v : vin)));
    } else {
      const novo = { ...v, id: crypto.randomUUID() };
      await criarVinho(novo);
      setVinhos((prev) => [...prev, novo]);
    }

    setAbrirModal(false);
    setVinhoEditando(null);
  }

  // 🔹 Excluir vinho
  async function remover(id: string) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    await excluirVinho(id);
    setVinhos((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <div className="dashboard-wrapper vinhos-container">
      {/* CABEÇALHO */}
      <div className="vinhos-header">
        <div>
          <h1>Gestão de Vinhos</h1>
          <p>Gerencie o catálogo completo de produtos</p>
        </div>

        <button
          className="btn-add"
          onClick={() => {
            setVinhoEditando(null);
            setAbrirModal(true);
          }}
        >
          <FiPlus size={18} />
          Adicionar Vinho
        </button>
      </div>
      {/* FILTROS */}
      <div className="vinhos-toolbar">
        <input
          placeholder="Buscar por nome, safra, tipo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="view-buttons">
          <button
            className={!modoGrid ? "ativo" : ""}
            onClick={() => setModoGrid(false)}
          >
            <FiList />
          </button>

          <button
            className={modoGrid ? "ativo" : ""}
            onClick={() => setModoGrid(true)}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* LISTA */}
      {!modoGrid && (
        <table className="tabela-vinhos">
          <thead>
            <tr>
              <th>Vinho</th>
              <th>Tipo</th>
              <th>Safra</th>
              <th>Estoque</th>
              <th>Preço</th>
              <th>Notas</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((v) => (
              <tr key={v.id}>
                <td>{v.nome}</td>
                <td>{v.tipo}</td>
                <td>{v.safra}</td>

                <td>
                  <span className={`badge ${v.estoque < 40 ? "baixa" : "ok"}`}>
                    {v.estoque} un.
                  </span>
                </td>

                <td>R$ {v.preco.toFixed(2)}</td>
                <td>{v.notasDegustacao}</td>

                <td className="acoes">
                  <button
                    className="btn-acao editar"
                    onClick={() => {
                      setVinhoEditando(v);
                      setAbrirModal(true);
                    }}
                  >
                    <FiEdit2 size={16} />
                  </button>

                  <button
                    className="btn-acao excluir"
                    onClick={() => remover(v.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* GRID */}
      {modoGrid && (
        <div className="vinhos-grid">
          {filtrados.map((v) => (
            <div className="vinho-card" key={v.id}>
              <h3>{v.nome}</h3>
              <span>{v.tipo} • Safra {v.safra}</span>
              <p>Estoque: <strong>{v.estoque} un.</strong></p>
              <p className="preco">R$ {v.preco.toFixed(2)}</p>
              <p className="notas">{v.notasDegustacao}</p>

              <div className="acoes-grid">
                <button
                  className="btn-acao editar"
                  onClick={() => {
                    setVinhoEditando(v);
                    setAbrirModal(true);
                  }}
                >
                  <FiEdit2 size={16} />
                </button>

                <button
                  className="btn-acao excluir"
                  onClick={() => remover(v.id)}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {abrirModal && (
        <FormularioVinho
          fechar={() => {
            setAbrirModal(false);
            setVinhoEditando(null);
          }}
          salvar={salvar}
          vinho={vinhoEditando}
        />
      )}
    </div>
  );
}
