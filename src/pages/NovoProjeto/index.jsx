import { useState } from "react";

import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

import { dataBaseApp } from "../../services/firebaseConfig";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { MdAdd } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function NovoProjeto() {
  const uidUsuario = sessionStorage.getItem("@Auth:usuario");

  const [nomeProjeto, setNomeProjeto] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [open, setOpen] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const requisitosObrigatorios = [
    "Reconhecimento do problema",
    "Avaliaçao e síntese",
    "Modelagem",
    "Especificação",
    "Revisão",
  ];

  function fecharSnackbar() {
    setOpen(false);
  }

  const adicionarInput = () => {
    setInputs([...inputs, ""]);
  };

  const valorDosInput = (index, value) => {
    const novoInput = [...inputs];
    novoInput[index] = value;
    setInputs(novoInput);
  };

  const removerInput = (index) => {
    const novoInput = [...inputs];
    novoInput.splice(index, 1);
    setInputs(novoInput);
  };

  const criarProjeto = async () => {
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, "projetos");

    try {
      await addDoc(projetosCollection, {
        nomeProjeto: nomeProjeto,
        data: serverTimestamp(),
      });
      setNomeProjeto("");
    } catch (error) {
      console.error(error);
    }
  };

  const enviarDados = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    const valores = requisitosObrigatorios.concat(inputs);

    try {
      const etapas = valores.map((etapa, index) => ({
        nome: etapa,
        checked: checkedItems[index] || false,
      }));

      await addDoc(projetosCollection, {
        nomeProjeto,
        etapas,
        data: serverTimestamp(),
      });

      criarProjeto();

      setNomeProjeto("");
      setInputs([]);
      setCheckedItems([]);

      setSucesso(true);
      setOpen(true);
      setEnviando(false);
    } catch (error) {
      setSucesso(false);
      setOpen(true);
      setEnviando(false);
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={fecharSnackbar}
      >
        {sucesso ? (
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={fecharSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Projeto criado com sucesso!
          </MuiAlert>
        ) : (
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={fecharSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Não foi possivel criar o projeto. Tente novamente
          </MuiAlert>
        )}
      </Snackbar>
      <div className="containerNovoProjeto">
        <div className="containerTopo"></div>
        <form className="containerForm" onSubmit={enviarDados}>
          <div className="containerTopoForm">
            <div className="containerImagem">
              <img src={logo} alt="" />
            </div>
            <h2>Criar Projeto</h2>
          </div>
          <input
            type="text"
            value={nomeProjeto}
            placeholder="Digite o nome do seu projeto"
            required
            onChange={(e) => setNomeProjeto(e.target.value)}
          />
          <div className="containerInputs">
            {inputs.map((input, index) => (
              <div className="containerItensInput" key={index}>
                <input
                  value={input}
                  onChange={(e) => valorDosInput(index, e.target.value)}
                  placeholder="Digite seu requisito"
                  required
                />
                <button onClick={() => removerInput(index)}>
                  <BsFillTrash3Fill size={22} color="#4a4a4a" />
                </button>
              </div>
            ))}
          </div>
          <button className="btnAdicionar" onClick={adicionarInput}>
            <MdAdd size={22} color={"#7c7c7c"} />
            Adicionar Requisito
          </button>
          <button className="btnCriarProjeto">
            {enviando ? (
              <CircularProgress size={28} color="inherit" thickness={5} />
            ) : (
              "Criar Projeto"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
