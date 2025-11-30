import Sidebar from "../../componentes/layouts/sidebar/Sidebar";
import "./PainelLayout.css";
import { Outlet } from "react-router-dom";
import TopBar from "../../componentes/topbar/topbar";

export default function PainelLayout() {
  return (
    <>
      {/* Topbar fixa */}
      <TopBar />

      <div className="painel-layout">
        <Sidebar />

        <div className="painel-content">
          <main className="painel-container">
            <Outlet />
          </main> 
        </div>
      </div>
    </>
  );
}
