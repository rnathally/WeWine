import type { Cliente } from "../paginas/Clientes/FormularioCliente";

const API_URL = "http://localhost:8080/clientes";

/* ================================
   🔹 GET – Buscar todos os clientes
================================ */
export async function getClientes(): Promise<Cliente[]> {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao buscar clientes");
    return await resp.json();
  } catch (e) {
    console.error("Backend indisponível:", e);
    return [];
  }
}

/* ================================
   🔹 POST – Criar cliente
================================ */
export async function criarCliente(cliente: Cliente) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!resp.ok) throw new Error("Erro ao criar cliente");
  return await resp.json();
}

/* ================================
   🔹 PUT – Editar cliente
================================ */
export async function editarCliente(cliente: Cliente) {
  const resp = await fetch(`${API_URL}/${cliente.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!resp.ok) throw new Error("Erro ao editar cliente");
  return await resp.json();
}

/* ================================
   🔹 DELETE – Excluir cliente
================================ */
export async function excluirCliente(id: string) {
  const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!resp.ok) throw new Error("Erro ao excluir cliente");
  return true;
}
