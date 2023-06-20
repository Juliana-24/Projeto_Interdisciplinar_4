import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Sobre from "../pages/Sobre";
import NovoProjeto from "../pages/NovoProjeto";
import ProjetoPagina from "../pages/ProjetoPagina";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="novo_projeto" element={<NovoProjeto />} />
          <Route path="projeto" element={<ProjetoPagina />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
