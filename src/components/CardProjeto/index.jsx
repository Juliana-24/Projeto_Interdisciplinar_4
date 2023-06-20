import { useNavigate } from "react-router-dom";

import "./styles.css";

import img from "../../assets/teste.jpg";

export default function CardProjeto({ projeto }) {
  const navigate = useNavigate();

  function navegacao() {
    sessionStorage.setItem("@Auth:projeto", projeto.nomeProjeto);
    navigate("/projeto");
  }

  return (
    <div className="containerCard">
      <div className="containerImagem">
        <img src={img} alt="" />
      </div>
      <div className="containerDetalhesProjeto">
        <h3>{projeto.nomeProjeto}</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid unde
          sit a id cumque debitis ex nihil ratione non doloremque.
        </p>
        <div className="containerButton">
          <button onClick={navegacao}>Ver projeto</button>
        </div>
      </div>
    </div>
  );
}
