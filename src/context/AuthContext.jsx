import { createContext, useState } from "react";
import { auth } from "../services/firebaseConfig";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const signIn = ({ email, password }) => {
    setCarregando(true);
    signInWithEmailAndPassword(email, password)
      .then((response) => {
        sessionStorage.setItem("@Auth:token", response.user.accessToken);
        sessionStorage.setItem("@Auth:email", response.user.email);
        sessionStorage.setItem("@Auth:usuario", response.user.uid);
        setUsuario(response);
        setCarregando(false);
      })
      .catch((error) => {
        setErro(true);
        setCarregando(false);
        console.log(error);
      });
  };

  function singOut() {
    sessionStorage.clear();
    setUsuario(null);
  }

  function limpaErro() {
    setErro(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signed: !!usuario,
        singOut,
        erro,
        limpaErro,
        carregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
