import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { id } = useParams();

  // Estados de filtragem das requisições
  const [requestFailed, setRequestFailed] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === "") {
      setRequestFailed(true);
      setMessage("*Defina uma senha");
      return;
    }
    if (password !== passwordConfirm) {
      setRequestFailed(true);
      setMessage("*As senhas devem ser iguais");
      return;
    }

    try {
      const response = await api.put(`/password-reset/${id}`, { password });

      if (response.status === 200) {
        setRequestFailed(false);
        setMessage("Senha alterada com sucesso!");
      }
    } catch (error) {
      console.log(error.response);
      setRequestFailed(true);
      setMessage("Não foi possível alterar a senha no momento.");
    }
  }

  return (
    <div>
      <h2>Redefinição de senha</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
        <label htmlFor="password">*Nova senha</label>
        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="password-confirm">Confirmar senha</label>
        <input
          type="password"
          placeholder="Confirme sua nova senha"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
        <p className={requestFailed ? "error" : "success"}>{message}</p>
        <button type="submit" className="btn">
          Alterar
        </button>
      </form>
    </div>
  );
}
