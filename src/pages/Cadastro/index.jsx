import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../services/firebaseConfig";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  // const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
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
    return console.log(user);
  }
  return (
    <div className="container">
      <div className="containerLogin">
        <div className="containerLogo">
          <img src={logo} alt="imagem logo" />
        </div>
        <form className="form">
          {/* <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            onChange={(e) => setNome(e.target.value)}
            required
          /> */}
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
          <button className="btnLogin" onClick={handleSignOut}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
