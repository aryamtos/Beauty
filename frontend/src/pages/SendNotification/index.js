import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

export default function SendNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const history = useHistory();

  async function handleNotify(e) {
    e.preventDefault();

    try {
      const response = await api.post("/message", { title, body });

      if (response.status === 200) {
        alert("Sua mensagem foi enviada aos usuários :)");
        history.goBack();
      }
    } catch (error) {
      console.log(error.response);
      alert("Não foi possível enviar a mensagem no momento :(");
    }
  }

  return (
    <form onSubmit={handleNotify}>
      <h2 style={{ marginBottom: 10 }}>Nova notificação</h2>
      <label htmlFor="title">Título</label>
      <input
        id="title"
        placeholder="Qual o título da notificação?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <label htmlFor="body">Mensagem</label>
      <textarea
        id="body"
        placeholder="O que você quer informar? (Pode conter emojis)"
        style={{ height: 100, padding: 10, width: "100%" }}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        required
      />
      <button type="submit" className="btn">
        Enviar
      </button>
    </form>
  );
}
