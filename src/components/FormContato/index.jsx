import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import emailjs from "@emailjs/browser";

import "./styles.css";

export default function FormContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messagem, setMessagem] = useState("");

  const [open, setOpen] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [aviso, setAviso] = useState(false);

  function fecharSnackbar() {
    setOpen(false);
  }

  function enviarEmail(e) {
    e.preventDefault();

    if (messagem === "") {
      setAviso(true);
      return;
    }

    try {
      const templateParams = {
        from_name: nome,
        message: messagem,
        email: email,
      };

      emailjs.send(
        "service_kurxr6f",
        "template_e4y23mq",
        templateParams,
        "AE1-6X8g2Z1eOUPp2"
      );

      setEmail("");
      setNome("");
      setMessagem("");

      setSucesso(true);
    } catch (error) {
      setSucesso(false);
      console.log(error);
    }
  }

  return (
    <>
      <div className="containerFormContato">
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
              Mensagem enviada com sucesso!
            </MuiAlert>
          ) : (
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={fecharSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              Não foi possivel enviar sua mensagem. Por favor, tente novamente
            </MuiAlert>
          )}
        </Snackbar>
        {aviso && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
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
              Preencha todos os campos!
            </MuiAlert>
          </Snackbar>
        )}
        <div className="containerForm">
          <h1>Contato</h1>
          <p>Mande sua mensagem, que vamos entrar em contato com você</p>
          <form>
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              required
            />
            <input
              type="email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <textarea
              placeholder="Digite sua mensagem"
              onChange={(e) => setMessagem(e.target.value)}
              value={messagem}
            ></textarea>
            <button onClick={enviarEmail}>Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}
