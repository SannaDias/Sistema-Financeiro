import { Routes, Route, Navigate } from "react-router-dom";
import PessoasPage from "./pages/PessoasPage";
import CategoriaPage from "./pages/CategoriaPage";
import TransacoesPage from "./pages/TransacoesPage";
import Menu from "./components/Menu";
import RelatorioPessoasPage from "./pages/RelatorioPessoasPage"

export default function App() {
  return (
    <>
     <Menu />
    <Routes>
      <Route path="/" element={<Navigate to="/pessoas" />} />
      <Route path="/pessoas" element={<PessoasPage />} />
      <Route path="/categorias" element={<CategoriaPage />} />
      <Route path="/transacoes" element={<TransacoesPage />} />
      <Route path="/relatorio-pessoas" element={<RelatorioPessoasPage />} />
    </Routes>
    </>
  );
}

