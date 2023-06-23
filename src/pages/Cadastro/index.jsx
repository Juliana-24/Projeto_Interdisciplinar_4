import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { auth } from "../../services/firebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";

import swal from "sweetalert";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSignOut(e) {
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
        swal("Erro", "Ocorreu um erro ao realizar o cadastro.", "error");
        setCarregando(false);
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="containerCadastro">
        <div className="containerInicio">
          <div className="containerLogo">
            <img src={logo} alt="imagem logo" />
          </div>
          <h1>Cadastro</h1>
        </div>
        <form className="form" onSubmit={handleSignOut}>
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
  );
}
