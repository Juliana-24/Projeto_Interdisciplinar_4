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
          titulocard="Rapidez"
          textoCard="Entrega de um projeto com mais rapidez e com muito menos risco de defeitos."
        />
        <CardSobre
          iconeCard={<BsFillBoxSeamFill size={34} color="#464646" />}
          titulocard="Visualização de custo"
          textoCard="Com os requisitos é possivel fazer o custeio de quanto poderá custar seu projeto para melhor planejamento."
        />
        <CardSobre
          iconeCard={<BsFillBoxSeamFill size={34} color="#464646" />}
          titulocard="Organização"
          textoCard="Você e seu cliente conseguem de maneira mais eficaz ter a noção do que está acontecendo no projeto
           e se está de acordo com o combinado"
        />
      </div>
    </div>
  );
}
