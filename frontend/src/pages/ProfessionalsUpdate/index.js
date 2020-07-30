import React, { useEffect, useState } from "react";

import "./styles.css";

import api from "../../services/api";

export default function Professionals({ history }) {
  const [professionals, setProfessionals] = useState([]);
  const [wasUpdateSuccessful, setWasUpdateSuccessful] = useState(false);
  const [wasRequestSent, setWasRequestSent] = useState(false);

  useEffect(() => {
    async function handleInit() {
      const partner_id = localStorage.getItem("partner");

      try {
        const response = await api.get(`/professional/${partner_id}`);

        if (response.data) {
          setProfessionals(response.data.professionals);
        }
      } catch (error) {
        console.log(error.response);
      }
    }

    handleInit();
  }, []);

  useEffect(() => {
    console.log(professionals);
  }, [professionals]);

  async function handleSubmit(e) {
    e.preventDefault();

    const partner_id = localStorage.getItem("partner");
    try {
      const response = await api.put(`/professional/massive/${partner_id}`, {
        professionals,
      });

      if (response.status === 200) {
        setWasRequestSent(true);
        setWasUpdateSuccessful(true);
      }
    } catch (error) {
      setWasRequestSent(true);
      setWasUpdateSuccessful(false);
    }
  }

  function handleNavigation() {
    history.push("/professional-store");
  }

  return (
    <div>
      <h2>Profissionais</h2>
      <button onClick={handleNavigation} className="btn">
        Novo Profissional
      </button>
      <form onSubmit={handleSubmit}>
        {professionals[0] &&
          professionals.map((professional, index) => (
            <div className="inputContainer">
              <h3 className="professional-label">Profissional #{index + 1}</h3>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                placeholder="Nome do profissional"
                value={professional.name}
                onChange={(event) => {
                  setProfessionals(
                    professionals.map((item) =>
                      professional._id === item._id
                        ? { ...item, name: event.target.value }
                        : item
                    )
                  );
                }}
              />
              <label htmlFor="professional-function">Função</label>
              <input
                type="text"
                placeholder="Função do profissional"
                value={professional.professionalFunction}
                onChange={(event) => {
                  setProfessionals(
                    professionals.map((item) =>
                      professional._id === item._id
                        ? { ...item, professionalFunction: event.target.value }
                        : item
                    )
                  );
                }}
              />
            </div>
          ))}
        {wasUpdateSuccessful && (
          <p className="success">Profissionais atualizados com sucesso!</p>
        )}
        <button type="submit" className="btn">
          Atualizar
        </button>
      </form>
    </div>
  );
}
