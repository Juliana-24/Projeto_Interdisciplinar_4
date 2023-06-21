import { useNavigate } from "react-router-dom";

import img from "../../assets/imagemSobre.jpg";

import "./styles.css";

export default function CardProjeto({ projeto }) {
  const navigate = useNavigate();

  function navegacao() {
    sessionStorage.setItem("@Auth:projeto", projeto.nomeProjeto);
    navigate("/projeto");
  }

  return (
    <div className="containerCard">
      <div className="containerImagem">
        <img src={img} alt="Imagem de capa do projeto" />
      </div>
      <div className="containerDetalhesProjeto">
        <h2>{projeto.nomeProjeto}</h2>
        <p>Veja e acompanhe a evoluçãodo do seu projeto</p>
        <div className="containerButton">
          <button onClick={navegacao}>Ver projeto</button>
        </div>
      </div>
    </div>
  );
}
