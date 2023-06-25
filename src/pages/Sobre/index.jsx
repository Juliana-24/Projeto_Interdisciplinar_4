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
            Já foi dito que requisitos são sinônimos de funções, ou seja, tudo o
            que o software precisa fazer funcionalmente. No entanto, agora
            espera-se que os requisitos de software se apliquem a mais do que
            apenas funções. requisitos Além das funções objetivas, qualificações
            e restrições que um sistema deve atender, convenções, padrões ou
            requisitos definidos pelo usuário. Em geral, um requisito é uma
            condição necessária para atingir um objetivo. Portanto, o sistema
            proposto deve atender aos requisitos ou limitações do
            desenvolvimento do sistema.
          </p>
        </div>
      </div>
      <GridCardSobre />
      <FormContato />
      <Footer />
    </>
  );
}
