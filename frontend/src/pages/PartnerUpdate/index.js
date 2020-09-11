import React, { useEffect, useMemo, useState } from "react";
import { FaCamera } from "react-icons/fa";
import api from "../../services/api";

export default function PartnerUpdate({ history }) {
  const [responsibleName, setRName] = useState("");
  const [tax, setTax] = useState(0);
  const [enterpriseName, setEName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState(9);
  const [about, setAbout] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isDelivery, setIsDelivery] = useState(true);


  var preview = useMemo(() => {
    if (typeof thumbnail !== "string") {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    } else {
      return thumbnail;
    }
  }, [thumbnail]);

  useEffect(() => {
    async function handleInit() {
      const user_id = localStorage.getItem("partner");
      const token_access = localStorage.getItem("token-access");

      try {
        const response = await api.get(`/partner/${user_id}`, {
          headers: {
            token_access,
          },
        });

        if (response.data) {
          setRName(response.data.responsibleName);
          setTax(response.data.tax)
          setEName(response.data.enterpriseName);
          setEmail(response.data.email);
          setAddress(response.data.address);
          setNeighborhood(response.data.neighborhood);
          setCity(response.data.city);
          setCpf(response.data.cpf);
          setPhone(response.data.phone);
          setAbout(response.data.about);
          setThumbnail(response.data.thumbnail_url);
        }
        if (response.data.category === "Autônomo") {
          setIsDelivery(true)
        }
      } catch (error) {
        console.log(error.response);
      }
    }

    handleInit();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const partner_id = localStorage.getItem("partner");
    const token = localStorage.getItem("token-access");

    if (senha !== "" && senha !== senhaConfirmacao) {
      console.log("As senhas devem ser iguais.");
      return;
    }

    try {
      const data = new FormData();

      if (typeof thumbnail !== "string") {
        data.append("thumbnail", thumbnail);
      }
      data.append("responsibleName", responsibleName);
      data.append("tax", tax);
      data.append("enterpriseName", enterpriseName);
      data.append("email", email);
      data.append("phone", phone);
      data.append("address", address);
      data.append("neighborhood", neighborhood);
      data.append("city", city);
      data.append("cpf", cpf);
      data.append("about", about);
      data.append("senha", senha);

      const response = await api.put(`/partner/register/${partner_id}`, data, {
        headers: {
          token_access: token,
        },
      });

      if (response.data) {
        history.push("/dashboard");
      }
    } catch (error) {
      if (error.response.data.validation) {
        console.log(error.response.data.validation[0].message);
      } else {
        console.log(error.response);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* --------------------LOGO------------------------------------ */}
      <label>FOTO</label>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={(event) => setThumbnail(event.target.files[0])}
        />
        <FaCamera />
      </label>
      {/* --------------------NOME------------------------------------ */}
      <label htmlFor="responsibleName">NOME</label>
      <input
        type="text"
        id="responsibleName"
        placeholder="Qual o nome do representante da empresa?"
        value={responsibleName}
        onChange={(event) => setRName(event.target.value)}
      />
      {/* ---------------Taxa de Delivery-------------------------- */}
      {isDelivery &&
      <div>
      <label htmlFor="tax">Taxa de Delivery</label>
      <p className="descricao">
        Defina o Valor Cobrado por Delivery
      </p>
      <input
        type="number"
        min="0"
        id="tax"
        value={tax}
        onChange={(event) => setTax(event.target.value)}
      />
      </div>
      }
      {/* ---------------nome do responsavel-------------------------- */}
      <label htmlFor="enterpriseName">Nome Comercial</label>
      <input
        type="text"
        id="enterpriseName"
        placeholder="Qual o nome do responsável da empresa?"
        value={enterpriseName}
        onChange={(event) => setEName(event.target.value)}
      />
      {/* -----------------EMAIL----------------------------------------- */}
      <label htmlFor="email">E-MAIL</label>
      <input
        type="email"
        id="email"
        placeholder="Seu melhor email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {/* ---------------Endereço------------------------------------ */}
      <label htmlFor="address">Endereço</label>
      <input
        type="text"
        id="address"
        placeholder="Qual o endereço do local?"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <label htmlFor="neighborhood">Bairro</label>
      <input
        type="text"
        id="neighborhood"
        placeholder="Em qual bairro se localiza?"
        value={neighborhood}
        onChange={(event) => setNeighborhood(event.target.value)}
      />
      <label htmlFor="city">Cidade</label>
      <input
        type="text"
        id="city"
        placeholder="Qual a cidade?"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      {/* ---------------CPF------------------------------------ */}
      <label htmlFor="phone">CPF</label>
      <input
        type="text"
        id="cpf"
        placeholder="Qual o CPF do titular?"
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
      />
      {/* ---------------Phone------------------------------------ */}
      <label htmlFor="phone">TELEFONE</label>
      <input
        type="tel"
        id="phone"
        placeholder="Qual o telefone de contato?"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      {/* ---------------Descrição------------------------------------ */}
      <label htmlFor="interpriseName">DESCRIÇÃO</label>
      <textarea
        type="text"
        id="about"
        placeholder="Uma breve descrição sobre você/salão"
        value={about}
        onChange={(event) => setAbout(event.target.value)}
      />
      {/* ---------------SENHA------------------------------------ */}
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        placeholder="Sua senha"
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
      />
      <label htmlFor="senhaConfirmacao">Confirme sua senha</label>
      <input
        type="password"
        id="senhaConfirmacao"
        placeholder="Repita a sua senha"
        value={senhaConfirmacao}
        onChange={(event) => setSenhaConfirmacao(event.target.value)}
      />
      <button type="submit" className="btn">
        ATUALIZAR
      </button>
    </form>
  );
}
