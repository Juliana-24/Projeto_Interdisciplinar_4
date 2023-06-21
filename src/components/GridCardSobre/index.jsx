import CardSobre from "../CardSobre";

import { BsFillBoxSeamFill } from "react-icons/bs";

import "./styles.css";

export default function GridCardSobre() {
  return (
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
  );
}
