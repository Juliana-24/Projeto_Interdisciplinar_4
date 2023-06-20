import Header from "../../components/Header";

import CardSobre from "../../components/CardSobre";

import seta from "../../assets/seta.gif";
import imagemSobre from "../../assets/imagemSobre4.jpg";

import { BsFillBoxSeamFill } from "react-icons/bs";

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
          <div className="containerImagemInformacoes">
            <img src={imagemSobre} alt="" />
          </div>
        </div>
        <div className="containerInformacoes">
          <h2>Conheça a Análise de Requisitos</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            repellendus officia iste nulla repudiandae sapiente dolore adipisci
            quae sed. Suscipit a odit voluptate laboriosam pariatur, veniam
            architecto necessitatibus nam laudantium, inventore similique sequi
            velit, quis corrupti. Nihil dignissimos, ducimus atque non, a
            repudiandae veniam exercitationem, quas necessitatibus corrupti
            maiores veritatis deserunt esse minus voluptatibus eius eaque libero
            voluptatum laborum autem incidunt? Repudiandae minima molestias
            aspernatur laboriosam magnam velit! Ipsam, sequi.
          </p>
        </div>
      </div>
      <div className="containerCards">
        <h1>Benefícios da Análise de Requisitos</h1>
        <div className="containerGridCardsSobre">
          <CardSobre
            iconeCard={<BsFillBoxSeamFill size={34} color="#464646" />}
            titulocard="Maior Controle"
            textoCard="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta."
          />
          <CardSobre
            iconeCard={<BsFillBoxSeamFill size={34} color="#464646" />}
            titulocard="Visualização das necessidades do projeto"
            textoCard="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta."
          />
          <CardSobre
            iconeCard={<BsFillBoxSeamFill size={34} color="#464646" />}
            titulocard="Visualização das necessidades do projeto"
            textoCard="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, soluta."
          />
        </div>
      </div>
    </>
  );
}
