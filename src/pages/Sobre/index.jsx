import Header from "../../components/Header";

import seta from "../../assets/seta.gif";

import "./styles.css";

export default function Sobre() {
  return (
    <>
      <Header />
      <div className="containerInicioSobre">
        <div className="containerTextos">
          <h1>Análise de Requisitos</h1>
          <p>Conheça mais sobre a análise de requisitos</p>
        </div>
        <div className="containerSeta">
          <img src={seta} alt="seta indicadora" />
        </div>
      </div>
      <div className="containerInfo">
        <div className="containerBorderImagem">
          <div className="containerImagemInformacoes"></div>
        </div>
        <div className="containerInformacoes">
          <div className="containerTexto">
            <h2>Conheça a Análise de Requisitos</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vel
              quasi neque, impedit quaerat maiores corrupti necessitatibus quod
              perspiciatis obcaecati.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
