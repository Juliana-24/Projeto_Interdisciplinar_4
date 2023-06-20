import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { BiErrorCircle } from "react-icons/bi";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  function handleClose() {
    setOpenAlert(false);
  }

  const { signIn, signed, erro, limpaErro, carregando } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setOpenAlert(true);
      return;
    }

    const data = {
      email,
      password,
    };
    await signIn(data);
  };

  useEffect(() => {
    if (!erro) {
      setOpen(false);
      return;
    }

    setOpen(true);

    const timer = setTimeout(() => {
      setOpen(false);
      limpaErro();
    }, 4000);
    return () => clearTimeout(timer);
  }, [erro]);

  if (!signed) {
    return (
      <div className="container">
        <div className="containerLogin">
          <div className="containerLogo">
            <img src={logo} alt="imagem logo" />
          </div>
          <form className="form">
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
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={openAlert}
              autoHideDuration={5000}
              onClose={handleClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Preencha todos os campos!!
              </MuiAlert>
            </Snackbar>
            {open && (
              <div className="containerErro">
                <BiErrorCircle size={25} color="#f1f1f1" />
                <p>Email ou senha incorreto</p>
              </div>
            )}
            <button className="btnLogin" onClick={handleSubmit}>
              {carregando ? (
                <CircularProgress size={28} color="inherit" thickness={5} />
              ) : (
                "Entrar"
              )}
            </button>
            <p className="textoCadastro">
              Não tem conta?<Link to="/cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
}
