import React, { useEffect, useState } from "react";

import "./styles.css";

import api from "../../services/api";

export default function BusinessHoursUpdate() {
  const [businessHours, setBusinessHours] = useState([]);
  const [wasUpdateSuccessful, setWasUpdateSuccessful] = useState(false);
  const [wasRequestSent, setWasRequestSent] = useState(false);
  const [wereHoursVerified, setWereHoursVerified] = useState(false);
  const [needToStore, setNeedToStore] = useState(false);

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

        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }

    handleInit();
    setWereHoursVerified(true);
  }, []);

  useEffect(() => {
    if (wereHoursVerified === true && !businessHours[0]) {
      const temporaryArray = [];
      temporaryArray.push({ _id: 1, dia: "Dom", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 2, dia: "Seg", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 3, dia: "Ter", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 4, dia: "Qua", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 5, dia: "Qui", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 6, dia: "Sex", horaInicio: "", horaFim: "" });
      temporaryArray.push({ _id: 7, dia: "Sab", horaInicio: "", horaFim: "" });
      setBusinessHours(temporaryArray);
      setNeedToStore(true);
    }
  }, [businessHours]);

  async function handleSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("partner");
    if (needToStore) {
      /**
       * ---------------------------------------------------
       *    Need to Store
       * ---------------------------------------------------
       *
       *  Caso no qual os horários do parceiro ainda não
       *  foram definidos, então ele terá que criar um
       *  novo grupo de horários para si.
       */
      try {
        const response = await api.post(
          `/businesshour/massive/`,
          {
            businessHours,
          },
          {
            headers: {
              partner_id: user_id,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          setWasRequestSent(true);
          setWasUpdateSuccessful(true);
        }
      } catch (error) {
        console.log(error.response);
        setWasRequestSent(true);
        setWasUpdateSuccessful(false);
      }
    } else {
      /**
       * ---------------------------------------------------
       *    There is No Need to Store
       * ---------------------------------------------------
       *
       *  Caso no qual os horários do parceiro ainda não
       *  foram definidos, então ele terá que criar um
       *  novo grupo de horários para si.
       */
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
