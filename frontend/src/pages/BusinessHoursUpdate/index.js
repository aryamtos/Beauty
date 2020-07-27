import React, { useEffect, useState } from "react";

import "./styles.css";

import api from "../../services/api";

export default function BusinessHoursUpdate() {
  const [businessHours, setBusinessHours] = useState([]);
  const [wasUpdateSuccessful, setWasUpdateSuccessful] = useState(false);
  const [wasRequestSent, setWasRequestSent] = useState(false);

  useEffect(() => {
    async function handleInit() {
      const partner_id = localStorage.getItem("partner");
      try {
        const response = await api.get("/businesshour", {
          headers: {
            partner_id,
          },
        });

        if (response.data) {
          setBusinessHours(response.data.businessHours);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleInit();
  }, []);

  useEffect(() => {
    if (!businessHours[0]) {
      businessHours.push({ dia: "Dom", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Seg", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Ter", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Qua", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Qui", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Sex", horaInicio: "", horaFim: "" });
      businessHours.push({ dia: "Sab", horaInicio: "", horaFim: "" });
    }
  }, [businessHours]);

  async function handleSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("partner");
    try {
      const response = await api.put(`/businesshour/massive/${user_id}`, {
        businessHours,
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

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 20 }}>Seus horários</h2>
      {businessHours[0] && (
        <>
          {businessHours.map((item) => (
            <div key={item._id} className="dayContainer">
              <label>
                <p className="dayLabel">{item.dia}</p>
              </label>
              <input
                className="hourInput"
                placeholder="00:00"
                value={item.horaInicio}
                onChange={(event) => {
                  setBusinessHours(
                    businessHours.map((hour) =>
                      hour._id === item._id
                        ? { ...hour, horaInicio: event.target.value }
                        : hour
                    )
                  );
                }}
              />
              <input
                className="hourInput"
                placeholder="00:00"
                value={item.horaFim}
                onChange={(event) => {
                  setBusinessHours(
                    businessHours.map((hour) =>
                      hour._id === item._id
                        ? { ...item, horaFim: event.target.value }
                        : hour
                    )
                  );
                }}
              />
            </div>
          ))}
        </>
      )}
      {wasUpdateSuccessful && (
        <p className="success">Horários atualizados com sucesso!</p>
      )}
      <button type="submit" className="btn">
        Atualizar
      </button>
    </form>
  );
}
