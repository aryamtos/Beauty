import React, { useEffect, useState } from "react";

import api from "../../services/api";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const [requestFailed, setRequestFailed] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/password-reset", {
        email,
        type: "partner",
      });

      if (response.status === 200) {
        setRequestFailed(false);
        setMessage("Enviamos uma mensagem para seu E-Mail!");
      }
    } catch (error) {
      setRequestFailed(true);
      setMessage("Não foi possível enviar o E-Mail no momento!");
    }
  }

  return (
    <>
      <h2>Esqueceu sua senha?</h2>
      <p>Nos informe seu endereço de E-Mail</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          placeholder="Nos informe seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <p className={requestFailed ? "error" : "success"}>{message}</p>
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </>
  );
}
