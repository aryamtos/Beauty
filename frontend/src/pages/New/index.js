import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function New({ history }) {
  const [nomeService, setNomeService] = useState("");
  const [tempo, setTempo] = useState("");
  const [nome, setNomes] = useState("");
  const [preco, setPreco] = useState("");
  const [parte, setParte] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const user_id = localStorage.getItem("partner");

    const token_access = localStorage.getItem("token-access");

    const response = await api.post(
      "/partner/service/registrationservice",
      { nomeService, nome, tempo, preco, parte },
      {
        headers: { user_id, token_access },
      }
    );
    console.log(response);
    history.push("/dashboard");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nomeServices">NOME *</label>
      <p className="descricao">Selecione qual o nome do seu serviço?</p>
      <input
        id="nomeServices"
        placeholder="Qual o nome do serviço?"
        value={nomeService}
        onChange={(event) => setNomeService(event.target.value)}
        required
      />
      <label htmlFor="service">CATEGORIA *</label>
      <p className="descricao">
        Selecione qual categoria o seu serviço melhor se encaixa
      </p>
      <select
        id="service"
        name="category"
        className="minimal"
        required
        value={nome}
        onChange={(event) => setNomes(event.target.value)}
      >
        <option value="null">Selecione a categoria</option>
        <option value="Cabelo">Cabelo</option>
        <option value="Depilação">Depilação</option>
        <option value="Estética corporal">Estética corporal</option>
        <option value="Sobrancelha">Sobrancelha</option>
        <option value="Estética facial"> Estética facial</option>
        <option value="Manicure e pedicure">Manicure e pedicure</option>
        <option value="Maquiagem">Maquiagem</option>
        <option value="Massagem">Massagem</option>
        <option value="Podologia">Podologia</option>
        <option value="Outros">Outros</option>
      </select>
      <br></br>
      <label htmlFor="preco">PREÇO *</label>
      <input
        id="preco"
        placeholder="Qual o preço da diária?"
        value={preco}
        onChange={(event) => setPreco(event.target.value)}
        required
      />
      <label htmlFor="preco">TEMPO *</label>
      <input
        id="preco"
        placeholder="Qual o preço da diária?"
        value={tempo}
        onChange={(event) => setTempo(event.target.value)}
        required
      />

      <label htmlFor="service">ÁREA *</label>
      <p className="descricao">
        Selecione qual área do corpo o seu serviço atende
      </p>
      <select
        id="area"
        name="area"
        className="minimal"
        value={parte}
        onChange={(event) => setParte(event.target.value)}
        required
      >
        <option value="null">Selecione a área</option>
        <option value="Rosto">Rosto</option>
        <option value="Cabelo">Cabelos</option>
        <option value="Costas"> Costas</option>
        <option value="Mãos e pés">Mãos e pés</option>
        <option value="Mãos">Mãos</option>
        <option value="Pés">Pés</option>
        <option value="Corpo todo">Corpo todo</option>
        <option value="Outros">Outros</option>
      </select>
      <br />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
