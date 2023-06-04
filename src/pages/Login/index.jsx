import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../services/firebaseConfig";

import logo from "../../assets/logo.png";

import "./styles.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function SignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    let token = user.user.accessToken;
    return sessionStorage.setItem("@Auth:token", token);
  }

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
          <button className="btnLogin" onClick={SignIn}>
            Entrar
          </button>
          <p className="textoCadastro">
            Não tem conta?<Link to="/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
