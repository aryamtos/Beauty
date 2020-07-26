import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function Delete({ history }) {
  async function handleDelete() {
    const user_id = localStorage.getItem("partner");
    const service_id = localStorage.getItem("productID");

    const token_access = localStorage.getItem("token-access");
    const response = await api.delete("partner/service/delete/" + service_id, {
      headers: { user_id, token_access },
    });
    history.push("/dashboard");
  }

  return (
    <>
      <p>Deseja realmente deletar esse serviço?</p>
      <span className="sbutton">
        <button onClick={handleDelete} className="btn2">
          Deletar
        </button>
      </span>
    </>
  );
}
