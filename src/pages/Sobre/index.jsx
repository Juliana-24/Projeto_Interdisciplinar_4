import { useRef } from "react";

import Header from "../../components/Header";
import GridCardSobre from "../../components/GridCardSobre";
import FormContato from "../../components/FormContato";
import Footer from "../../components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

import seta from "../../assets/seta.gif";
import imagemSobre from "../../assets/imagemSobre4.jpg";

import "./styles.css";

export default function Sobre() {
  AOS.init();

  const scroll = useRef();

  function rolagem() {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <div className="containerInicioSobre">
        <div
          className="containerTextos"
          data-aos="fade-right"
          data-aos-duration="1700"
        >
          <h1>Análise de Requisitos</h1>
          <p>Conheça mais sobre a análise de requisitos</p>
        </div>
        <div className="containerSeta">
          <a onClick={rolagem}>
            <img src={seta} alt="seta indicadora" />
          </a>
        </div>
      </div>

      <div ref={scroll}></div>

      <div
        className="containerInfo"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className="containerBorderImagem">
          <div className="containerImagemInformacoes">
            <img src={imagemSobre} alt="" />
          </div>
        </div>
        <div className="containerInformacoes">
          <h2>Conheça a análise de requisitos</h2>
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
      <GridCardSobre />
      <FormContato />
      <Footer />
    </>
  );
}
