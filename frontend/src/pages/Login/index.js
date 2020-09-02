import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/authentification", { email, senha });
      const { token } = response.data;
      const { user } = response.data;
      const { _id } = user;
      const { isAdmin } = user;
      localStorage.setItem("partner", _id);
      localStorage.setItem("token-access", token);

      if (!isAdmin) {
        history.push("/dashboard");
      } else {
        history.push("/admin");
      }
    } catch (error) {
      setRequestFailed(true);
      setErrorMessage(error.response.data.validation[0].message);
    }
  }
  return (
    <>
      <p>
        Cadastre-se e <strong>aumente</strong> o seu alcance e número de{" "}
        <strong> clientes</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input
          type="email"
          id="email"
          placeholder="Seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          placeholder="Sua senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        {requestFailed && <p className="error">*{errorMessage}</p>}
        <button type="submit" className="btn">
          ENTRAR
        </button>
      </form>
      <div className="link">
        <button onClick={() => history.push("Register")}>
          Não tenho cadastro
        </button>
        <button onClick={() => history.push("Forgot")}>Esqueci a senha</button>
      </div>
    </>
  );
}
