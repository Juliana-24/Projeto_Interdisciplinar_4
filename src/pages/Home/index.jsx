import { useEffect, useState } from "react";

import { dataBaseApp } from "../../services/firebaseConfig";

import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardProjeto from "../../components/CardProjeto";
import CarregandoProjetos from "../../components/CarregandoProjetos";
import SemProjetos from "../../components/SemProjetos";

import AOS from "aos";
import "aos/dist/aos.css";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Home() {
  AOS.init();

  const uidUsuario = sessionStorage.getItem("@Auth:usuario");

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [semProjetos, setSemProjetos] = useState(false);

  const lerDadosProjetos = async () => {
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, "projetos");

    try {
      const querySnapshot = await getDocs(
        query(projetosCollection, orderBy("data"))
      );
      const projetos = [];

      querySnapshot.forEach((doc) => {
        const projeto = doc.data();
        projetos.push(projeto);
      });

      return projetos;
    } catch (error) {
      console.error(error);
    }
  };

  const obterProjetos = async () => {
    setCarregando(true);

    try {
      const projetos = await lerDadosProjetos();

      if (projetos.length <= 0) {
        setSemProjetos(true);
      }

      setDados(projetos);
      setCarregando(false);
    } catch (error) {
      console.error(error);
      setCarregando(false);
    }
  };

  useEffect(() => {
    obterProjetos();
  }, []);

  return (
    <>
      <Header />
      <div className="containerHome">
        <div
          className="containerInicio"
          data-aos="fade-down"
          data-aos-duration="1700"
        >
          <div className="containerTextosIniciais">
            <h1>Análise de Requisitos</h1>
            <p>Facilitando o desenvolvimento do seu projeto</p>
          </div>
        </div>
        <div className="containerProjetos">
          <h1>Meus Projetos</h1>
          {carregando ? (
            <CarregandoProjetos />
          ) : (
            <>
              {semProjetos ? (
                <SemProjetos />
              ) : (
                <>
                  <div
                    className="gridProjetos"
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                  >
                    {dados.map((projeto, index) => (
                      <CardProjeto key={index} projeto={projeto} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="containerParteFinal">
          <div className="containerLogo">
            <img src={logo} alt="" />
          </div>
          <div className="containerTextosFinais">
            <h2>Análise de Requisitos</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              saepe voluptatum nostrum exercitationem quia adipisci laboriosam
              corrupti error ducimus mollitia?
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
