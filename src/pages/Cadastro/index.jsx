import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import swal from "sweetalert";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [abrirAlert, setAbrirAlert] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  function fecharSnackbar() {
    setAbrirAlert(false);
  }

  async function criarCadastro(e) {
    e.preventDefault();
    setCarregando(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        swal(
          "Cadastro realizado!",
          "Seu cadastro foi criado com sucesso!",
          "success"
        );
        setCarregando(false);
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setMensagemErro(
            "Esse email já está sendo usado. Tente novamente com outro email"
          );
          setAbrirAlert(true);
          setCarregando(false);
        } else if (error.code === "auth/weak-password") {
          setMensagemErro("A senha precisa ter no minímo 6 caracteres");
          setAbrirAlert(true);
          setCarregando(false);
        } else {
          swal("Erro", "Ocorreu um erro ao realizar o cadastro.", "error");
          setCarregando(false);
          console.log(error);
        }
      });
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={abrirAlert}
        autoHideDuration={5000}
        onClose={fecharSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={fecharSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {mensagemErro}
        </MuiAlert>
      </Snackbar>
      <div className="container">
        <div className="containerCadastro">
          <div className="containerInicio">
            <div className="containerLogo">
              <img src={logo} alt="imagem logo" />
            </div>
            <h1>Cadastro</h1>
          </div>
          <form className="form" onSubmit={criarCadastro}>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btnCadastro">
              {carregando ? (
                <CircularProgress size={27} color="inherit" thickness={5} />
              ) : (
                "Cadastrar"
              )}
            </button>
            <p className="textoCadastro">
              Já tem conta?<Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
