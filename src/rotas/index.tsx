import { Routes, Route } from "react-router-dom";

/* LAYOUT */
import PainelLayout from "../layouts/PainelLayout/PainelLayout";

/* PAGINAS */
import Login from "../paginas/Login/Login";
import Dashboard from "../paginas/Dashboard/Dashboard";
import ListaVinhos from "../paginas/Vinhos/ListaVinhos";
import ListaClientes from "../paginas/Clientes/ListaClientes";
import ListaRepresentantes from "../paginas/Representantes/ListaRepresentantes";
import FormularioRepresentante from "../paginas/Representantes/FormularioRepresentante";
import ListaPedidos from "../paginas/Vendas/ListaPedidos";
import RelatoriosDashboard from "../paginas/Relatorios/RelatoriosDashboard";

export default function Rotas() {
  return (
    <>
      
      <Routes>

        {/* LOGIN (FORA DO LAYOUT) */}
        <Route path="/" element={<Login />} />

        {/* ÁREA LOGADA */}
        <Route path="/painel" element={<PainelLayout />}>

          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* VINHOS */}
          <Route path="vinhos" element={<ListaVinhos />} />

          {/* CLIENTES */}
          <Route path="clientes" element={<ListaClientes />} />

          {/* REPRESENTANTES */}
          <Route path="representantes" element={<ListaRepresentantes />} />
          <Route path="representantes/novo" element={<FormularioRepresentante />} />
          <Route path="representantes/:id" element={<FormularioRepresentante />} />

          {/* VENDAS */}
          <Route path="pedidos" element={<ListaPedidos />} />

          {/* RELATÓRIOS */}
          <Route path="relatorios" element={<RelatoriosDashboard />} />

        </Route>
      </Routes>
    </>
  );
}
