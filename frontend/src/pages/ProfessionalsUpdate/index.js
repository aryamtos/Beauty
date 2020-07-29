import React, { useEffect, useState } from "react";

import "./styles.css";

import api from "../../services/api";

export default function Professionals() {
  const [professionals, setProfessionals] = useState([]);

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

      setProfessionals((professionals) => [
        ...professionals,
        {
          name: "",
          professionalFunction: "",
        },
      ]);
    }

    handleInit();
  }, []);

  useEffect(() => {
    console.log(professionals);
  }, [professionals]);

  function handleSubmit() {
    //
  }

  return (
    <div>
      <h2>Profissionais</h2>
      <form onSubmit={handleSubmit}>
        {professionals[0] &&
          professionals.map((professional, index) => (
            <div className="inputContainer">
              <h3>Profissional #{index + 1}</h3>
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
        <button type="submit" className="btn">
          Atualizar
        </button>
      </form>
    </div>
  );
}
