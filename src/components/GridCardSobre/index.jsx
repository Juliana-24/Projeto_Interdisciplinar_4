import CardSobre from "../CardSobre";

import AOS from "aos";
import "aos/dist/aos.css";

import { BsFillBoxSeamFill } from "react-icons/bs";

import "./styles.css";

export default function GridCardSobre() {
  AOS.init();

  return (
    <div
      className="containerCards"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-duration="1500"
    >
      <h1>Vantagens da análise de requisitos</h1>
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
  );
}
