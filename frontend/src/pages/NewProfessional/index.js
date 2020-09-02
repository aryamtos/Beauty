import React from "react";
import { useState } from "react";
import api from "../../services/api";

export default function NewProfessional({ history }) {
  const [name, setName] = useState("");
  const [professionalFunction, setProfessionalFunction] = useState("");
  const [requestFail, setRequestFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (name === "") {
      setRequestFail(true);
      setErrorMessage("O nome é obrigatório!");
      return;
    }
    if (professionalFunction === "") {
      setRequestFail(true);
      setErrorMessage("A função é obrigatória!");
      return;
    }

    const partner_id = localStorage.getItem("partner");
    try {
      const response = await api.post(
        "/professional",
        { name, professionalFunction },
        {
          headers: {
            partner_id,
          },
        }
      );

      if (response.status === 200) {
        history.push("/professionals-update");
      }
    } catch (error) {
      console.log(error.response);
    }
    //
  }

  return (
    <div>
      <h2>Novo profissional</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">*Nome</label>
        <input
          type="text"
          placeholder="Nome do profissional"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="name">*Função</label>
        <input
          type="text"
          placeholder="Função do profissional"
          value={professionalFunction}
          onChange={(event) => setProfessionalFunction(event.target.value)}
        />
        {requestFail && <p className="error">*{errorMessage}</p>}
        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
