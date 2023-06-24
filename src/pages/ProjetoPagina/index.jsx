import { useEffect, useState, Fragment } from "react";

import { dataBaseApp } from "../../services/firebaseConfig";

import { useNavigate } from "react-router-dom";

import {
  doc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import Header from "../../components/Header";

import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import swal from "sweetalert";

import { MdAdd } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

import "./styles.css";

export default function ProjetoPagina() {
  const nomeProjeto = sessionStorage.getItem("@Auth:projeto");
  const uidUsuario = sessionStorage.getItem("@Auth:usuario");

  const [checkedItems, setCheckedItems] = useState([]);
  const [requisitos, setRequisitos] = useState([]);
  const [inputs, setInputs] = useState([]);

  const [open, setOpen] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [dialogAberto, setDialogAberto] = useState(false);

  const navigate = useNavigate();

  function handleClose() {
    setOpen(false);
  }

  const handleCheckboxChange = async (event, index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);

    await atualizarChecked(event, index);
  };

  const adicionarInput = () => {
    setInputs([...inputs, ""]);
  };

  const inputsConteudo = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const removerInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const excluirProjeto = () => {
    setDialogAberto(true);
  };

  const atualizarChecked = async (event, index) => {
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    try {
      const querySnapshot = await getDocs(projetosCollection);
      querySnapshot.forEach(async (doc) => {
        const projeto = doc.data();
        const etapas = projeto.etapas || [];

        if (etapas[index]) {
          etapas[index].checked = event.target.checked;
          await setDoc(doc.ref, { etapas }, { merge: true });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const enviarDados = async (e) => {
    e.preventDefault();

    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    try {
      const etapas = inputs.map((etapa, index) => ({
        nome: etapa,
        checked: checkedItems[index] || false,
      }));

      await addDoc(projetosCollection, {
        nomeProjeto,
        etapas,
        data: serverTimestamp(),
      });

      setInputs([]);
      setCheckedItems([]);
      lerDados();

      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const lerDados = async () => {
    setCarregando(true);
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    try {
      const querySnapshot = await getDocs(
        query(projetosCollection, orderBy("data"))
      );

      const projetos = [];
      const requisitos = [];

      querySnapshot.forEach((doc) => {
        const projeto = doc.data();
        projetos.push(projeto);

        const etapasProjeto = projeto.etapas || [];

        etapasProjeto.forEach((etapa) => {
          requisitos.push({
            nome: etapa.nome,
            checked: etapa.checked || false,
          });
        });
      });

      setRequisitos(requisitos);

      const newCheckedItems = requisitos.map((requisito) => requisito.checked);
      setCheckedItems(newCheckedItems);
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletarRequisito = async (requisito) => {
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    try {
      const querySnapshot = await getDocs(projetosCollection);
      querySnapshot.forEach(async (doc) => {
        const projeto = doc.data();
        const etapas = projeto.etapas || [];
        const novasEtapas = etapas.filter((etapa) => etapa.nome !== requisito);

        if (novasEtapas.length > 0) {
          await updateDoc(doc.ref, { etapas: novasEtapas });
        } else {
          await deleteDoc(doc.ref);
        }
      });

      lerDados();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmarExclusaoProjeto = async () => {
    setDialogAberto(false);

    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, nomeProjeto);

    try {
      const querySnapshot = await getDocs(projetosCollection);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      deletarProjeto(nomeProjeto);

      lerDados();

      setInputs([]);
      setCheckedItems([]);

      swal(
        "Projeto deletado",
        "Seu projeto foi deletado com sucesso!",
        "success"
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const deletarProjeto = async (nomeProjeto) => {
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, "projetos");

    try {
      const querySnapshot = await getDocs(projetosCollection);

      const projetoDoc = querySnapshot.docs.find(
        (doc) => doc.data().nomeProjeto === nomeProjeto
      );

      if (projetoDoc) {
        await deleteDoc(projetoDoc.ref);
      }
    } catch (error) {
      console.error("Erro ao excluir o projeto:", error);
    }
  };

  useEffect(() => {
    lerDados();
  }, []);

  return (
    <>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Requisitos atualizados com sucesso!
        </MuiAlert>
      </Snackbar>
      <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o projeto inteiro? Essa ação não
            pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAberto(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarExclusaoProjeto} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <div className="containerProjeto">
        <div className="containerTopo"></div>
        <div className="containerConteudo">
          <div className="containerTitulo">
            <h1>{nomeProjeto}</h1>
            <button className="btnExcluirProjeto" onClick={excluirProjeto}>
              Excluir Projeto
            </button>
          </div>
          {carregando ? (
            <div className="containerCarregando">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="containerRequisitos">
                {requisitos.map((requisito, index) => (
                  <Fragment key={index}>
                    <div className="containerRequisito">
                      <FormControlLabel
                        value={requisito.nome}
                        control={
                          <Checkbox
                            checked={checkedItems[index] || false}
                            onChange={(event) =>
                              handleCheckboxChange(event, index)
                            }
                          />
                        }
                        label={requisito.nome}
                        labelPlacement="end"
                      />
                      <button onClick={() => deletarRequisito(requisito.nome)}>
                        <BsFillTrash3Fill size={22} color="#4a4a4a" />
                      </button>
                    </div>
                    <div className="linha"></div>
                  </Fragment>
                ))}
              </div>
              <div className="containerInputs">
                {inputs.map((input, index) => (
                  <div className="containerItensInput" key={index}>
                    <input
                      value={input}
                      onChange={(e) => inputsConteudo(index, e.target.value)}
                      placeholder="Digite seu novo requisito"
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
              {inputs.length === 0 ? null : (
                <div className="containerBtnEnviar">
                  <button className="btnEnviar" onClick={enviarDados}>
                    Atualizar Requisitos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
