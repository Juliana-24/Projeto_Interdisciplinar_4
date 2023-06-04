import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/home">
        <img src={logo} alt="" />
      </Link>
      <ul className="btnHeader">
        <Link to="/home">Home</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/sobre">Empresa</Link>
        <Link>Novo Projeto</Link>
      </ul>
    </header>
  );
}
