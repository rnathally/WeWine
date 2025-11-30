// ===================================
// Service de Vinhos
// ===================================

import type { Vinho } from "../tipos/Vinho";

const API_URL = "http://localhost:8080/vinhos";

/**
 * 🔹 Buscar todos os vinhos
 * - Usa o backend
 * - Se der erro, cai num MOCK temporário
 */
export async function getVinhos(): Promise<Vinho[]> {
  try {
    const resp = await fetch(API_URL);

    if (!resp.ok) {
      throw new Error("Erro ao carregar vinhos");
    }

    const data: Vinho[] = await resp.json();
    return data;
  } catch (e) {
    console.warn("Backend indisponível, usando MOCKS de vinhos", e);

    // MOCK temporário enquanto o back não estiver estável
    return [
      {
        id: "1",
        nome: "Cabernet Sauvignon 2019",
        tipo: "Tinto",
        safra: 2019,
        estoque: 145,
        preco: 89,
        notasDegustacao: "Notas de frutas vermelhas maduras e especiarias.",
      },
      {
        id: "2",
        nome: "Chardonnay Premium 2021",
        tipo: "Branco",
        safra: 2021,
        estoque: 34,
        preco: 95,
        notasDegustacao: "Cítrico, mineral, com toques florais.",
      },
    ];
  }
}

/**
 * 🔹 Criar novo vinho
 * - ListaVinhos hoje não usa o retorno, só espera a Promise
 * - Mesmo assim retornamos o vinho criado (caso queira usar depois)
 */
export async function criarVinho(vinho: Vinho): Promise<Vinho> {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vinho),
  });

  if (!resp.ok) {
    throw new Error("Erro ao criar vinho");
  }

  const criado: Vinho = await resp.json();
  return criado;
}

/**
 * 🔹 Editar vinho existente
 */
export async function editarVinho(vinho: Vinho): Promise<Vinho> {
  if (!vinho.id) {
    throw new Error("ID do vinho não informado para edição");
  }

  const resp = await fetch(`${API_URL}/${vinho.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vinho),
  });

  if (!resp.ok) {
    throw new Error("Erro ao editar vinho");
  }

  const atualizado: Vinho = await resp.json();
  return atualizado;
}

/**
 * 🔹 Excluir vinho
 */
export async function excluirVinho(id: string): Promise<void> {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Erro ao excluir vinho");
  }
}
