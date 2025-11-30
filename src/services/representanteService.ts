// ===================================
// Service de Representantes
// ===================================

import type { Representante } from "../paginas/Representantes/ListaRepresentantes";

// ajuste a URL pro endpoint real do backend
const API_URL = "http://localhost:8080/representantes";

/**
 * 🔹 Buscar todos os representantes
 * - Tenta no backend
 * - Se der erro, usa MOCK temporário
 */
export async function getRepresentantes(): Promise<Representante[]> {
  try {
    const resp = await fetch(API_URL);

    if (!resp.ok) {
      throw new Error("Erro ao carregar representantes");
    }

    const data: Representante[] = await resp.json();
    return data;
  } catch (e) {
    console.warn("Backend de representantes indisponível, usando MOCKS", e);

    // MOCK TEMPORÁRIO
    return [
      {
        id: "1",
        nome: "Ricardo Almeida",
        regiao: "Criciúma",
        vendas: 145000,
        comissao: 8700,
        clientesAtivos: 23,
        performance: 12,
        possuiAcesso: true,
        email: "ricardo@email.com",
        telefone: "(48) 99999-1111",
        cidades: ["Criciúma", "Lauro Müller", "Orleans"],
      },
      {
        id: "2",
        nome: "Mariana Souza",
        regiao: "Içara",
        vendas: 98000,
        comissao: 5200,
        clientesAtivos: 18,
        performance: 8,
        possuiAcesso: true,
        email: "mariana@email.com",
        telefone: "(48) 98888-2222",
        cidades: ["Içara", "Criciúma"],
      },
    ];
  }
}

/**
 * 🔹 Criar novo representante
 * - Retorna o representante criado (já pronto pra jogar na lista)
 */
export async function criarRepresentante(
  representante: Representante
): Promise<Representante> {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(representante),
  });

  if (!resp.ok) {
    throw new Error("Erro ao criar representante");
  }

  const criado: Representante = await resp.json();
  return criado;
}

/**
 * 🔹 Atualizar representante
 */
export async function atualizarRepresentante(
  representante: Representante
): Promise<Representante> {
  if (!representante.id) {
    throw new Error("ID do representante não informado para edição");
  }

  const resp = await fetch(`${API_URL}/${representante.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(representante),
  });

  if (!resp.ok) {
    throw new Error("Erro ao atualizar representante");
  }

  const atualizado: Representante = await resp.json();
  return atualizado;
}

/**
 * 🔹 Excluir representante
 */
export async function excluirRepresentante(id: string): Promise<void> {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Erro ao excluir representante");
  }
}
