import { useEffect, useState } from "react";
import { FiPlus, FiMail, FiPhone, FiUser, FiMapPin } from "react-icons/fi";

import FormularioCliente from "./FormularioCliente";
import type { Cliente } from "./FormularioCliente";

import "./Clientes.css";

export default function ListaClientes() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  useEffect(() => {
    setCarregando(true);

    // MOCK só pra visualizar
    setTimeout(() => {
      setClientes([
        {
          id: crypto.randomUUID(),
          nome: "Restaurante Bella Vista",
          cpfCnpj: "12.345.678/0001-90",
          endereco: "Av. Principal, 123",
          cidade: "Criciúma",
          estado: "SC",
          cep: "88800-000",
          responsavel: "João Silva",
          email: "joao@bellavista.com.br",
          telefone: "(11) 98765-4321",
          formasPagamento: ["PIX", "Boleto 30 dias"],
        },
        {
          id: crypto.randomUUID(),
          nome: "Maria Santos",
          cpfCnpj: "123.456.789-10",
          endereco: "Rua das Flores, 99",
          cidade: "Içara",
          estado: "SC",
          cep: "88820-000",
          responsavel: "Maria Santos",
          email: "maria.santos@email.com",
          telefone: "(21) 99876-5432",
          formasPagamento: ["PIX"],
        },
      ]);

      setCarregando(false);
    }, 500);
  }, []);

  const filtrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpfCnpj.includes(busca) ||
      c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper clientes-container">
      {/* HEADER */}
      <div className="clientes-header">
        <div>
          <h1>Clientes</h1>
          <p>Gerencie empresas e pessoas físicas cadastradas</p>
        </div>

        <button
          className="btn-novo"
          onClick={() => {
            setClienteEditando(null);
            setAbrirModal(true);
          }}
        >
          <FiPlus size={18} />
          Novo Cliente
        </button>
      </div>

      {/* BUSCA */}
      <div className="busca-box">
        <input
          className="busca-input"
          placeholder="Buscar por nome, CNPJ/CPF, email..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {carregando && <p>Carregando clientes...</p>}

      {/* LISTA */}
      {!carregando && (
        <div className="clientes-grid">
          {filtrados.map((c) => {
            const isEmpresa = c.cpfCnpj.length > 14; // bem simples: CNPJ x CPF

            return (
              <div key={c.id} className="cliente-card">
                {/* TOPO DO CARD */}
                <div className="cliente-topo">
                  <div className="cliente-info">
                    <div className="avatar">
                      <FiUser size={20} />
                    </div>

                    <div>
                      <h3>{c.nome}</h3>

                      <div className="cliente-local">
                        <FiMapPin />
                        <span>
                          {c.cidade} - {c.estado}
                        </span>
                      </div>

                      <span className={`tag ${isEmpresa ? "empresa" : "pf"}`}>
                        {isEmpresa ? "Empresa" : "Pessoa Física"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-editar"
                    onClick={() => {
                      setClienteEditando(c);
                      setAbrirModal(true);
                    }}
                  >
                    Editar
                  </button>
                </div>

                {/* DOCUMENTO */}
                <p className="cpf-cnpj">
                  {isEmpresa ? "CNPJ" : "CPF"}: {c.cpfCnpj}
                </p>

                {/* CONTATO */}
                <div className="cliente-contato">
                  <p>
                    <strong>Contato:</strong> {c.responsavel}
                  </p>

                  <p>
                    <FiMail size={14} />
                    {c.email}
                  </p>

                  <p>
                    <FiPhone size={14} />
                    {c.telefone}
                  </p>
                </div>

                <hr />

                {/* ENDEREÇO */}
                <p className="endereco-label">Endereço</p>
                <p className="endereco-texto">
                  {c.endereco} • CEP {c.cep}
                </p>

                {/* PAGAMENTOS */}
                <p className="pagamentos">
                  <strong>Formas de pagamento:</strong>{" "}
                  {c.formasPagamento.join(", ")}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {abrirModal && (
        <FormularioCliente
          fechar={() => {
            setAbrirModal(false);
            setClienteEditando(null);
          }}
          adicionar={(novo) => setClientes((prev) => [...prev, novo])}
          editar={(alt) =>
            setClientes((prev) => prev.map((c) => (c.id === alt.id ? alt : c)))
          }
          cliente={clienteEditando}
        />
      )}
    </div>
  );
}
