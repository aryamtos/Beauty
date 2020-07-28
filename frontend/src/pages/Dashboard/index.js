import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";
// import socketio from 'socket.io-client';

export default function Dashboard({ history }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const user_id = localStorage.getItem("partner");

      const token_access = localStorage.getItem("token-access");
      const response = await api.get("/partner/service/index", {
        headers: { user_id, token_access },
      });

      setServices(response.data);
    }
    loadServices();
  }, []);

  async function handleClick(id) {
    localStorage.setItem("productID", id);
  }

  function handleNavigate(page) {
    switch (page) {
      case 1:
        history.push("/partner-update");
        break;
      case 2:
        history.push("/business-hours-update");
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="headerButtonsContainer">
        <button className="headerButton" onClick={() => handleNavigate(1)}>
          Alterar Perfil
        </button>
        <button className="headerButton" onClick={() => handleNavigate(2)}>
          Alterar Horários
        </button>
      </div>
      <h2>Seus serviços</h2>
      <div className="service-list">
        {services.map((service) => (
          <div className="item" key={service._id}>
            <div>
              <h3>{service.nomeService}</h3>
              <span>{service.parte}</span>
            </div>

            <span className="sbutton">
              <Link to="/update">
                <button
                  onClick={() => handleClick(service._id)}
                  className="btn1"
                >
                  Editar
                </button>
              </Link>
            </span>
          </div>
        ))}
      </div>
      <Link to="/new">
        <button className="btn">Cadastrar novo serviço</button>
      </Link>
    </>
  );
}
