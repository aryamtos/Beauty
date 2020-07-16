import React, {useState} from 'react';
import api from '../../services/api';
import './styles.css';

export default function Registration({history}){
    const [responsibleName, setRName] = useState('');
    const [category, setCategory] = useState("autonomo");
    const [interpriseName, setIName] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState(9);
    const [about, setAbout] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
     
    async function handleSubmit(event){
     event.preventDefault();
    
     const response = await api.post('/partner/register', {email, responsibleName, category, interpriseName, phone, cpf, adress, about, senha, senhaConfirmacao});
    
      if(category === "autonomo"){
        // history.push('http://pag.ae/7W6ds4vuo');
        window.location.replace('http://pag.ae/7W6ds4vuo');
      }
      else{
      // history.push('http://pag.ae/7W8s7gr9n');
      window.location.replace('http://pag.ae/7W8s7gr9n');}
     
  }
    return (
        <>


        <form onSubmit = {handleSubmit}>
          {/* --------------------NOME------------------------------------ */}
          <label htmlFor="responsibleName">NOME</label>
          <input type="text" 
          id="responsibleName" 
          placeholder="Qual o nome do representante da empresa?"
          value= {responsibleName}
          onChange={event => setRName(event.target.value)}
          />
          {/* ---------------CATEGORIA------------------------------------ */}
          <label htmlFor="category">CATEGORIA</label>
          <p className="descricao">Qual categoria de empreendedor você se encaixa?</p>
          <ul>
              <li>
                <input type="radio" id="autonomo" name="category" value= {category} onClick={event => setCategory(event.target.value= "autonomo")}></input>
                <label htmlFor="autonomo">Autônomo</label>
                <div className="check"></div>
              </li>
              
              <li>
                <input type="radio" id="Salão" name="category" value= {category}onChange={event => setCategory(event.target.value="salao")}></input>
                <label htmlFor="Salão">Salão</label>
                
                <div className="check"><div className="inside"></div></div>
              </li>
              
            </ul>
          {/* ---------------nome do responsavel-------------------------- */}
          <label htmlFor="interpriseName">NOME DO SALÃO</label>
          <p className="descricao">Se você possui um salão, coloque o nome dele no campo abaixo</p>
          <input type="text" 
          id="interpriseName" 
          placeholder="Qual o nome do responsável da empresa?"
          value= {interpriseName}
          onChange={event => setIName(event.target.value)}
          />
          {/* -----------------EMAIL----------------------------------------- */}
          <label htmlFor="email">E-MAIL</label>
          <input type="email" 
          id="email" 
          placeholder="Seu melhor email"
          value= {email}
          onChange={event => setEmail(event.target.value)}
          />
          {/* ---------------Endereço------------------------------------ */}
          <label htmlFor="adress">ENDEREÇO</label>
          <input type="text" 
          id="adress" 
          placeholder="Qual o endereço do local?"
          value= {adress}
          onChange={event => setAdress(event.target.value)}
          />
          
          {/* ---------------CPF------------------------------------ */}
          <label htmlFor="phone">CPF</label>
          <input type="text" 
          id="cpf" 
          placeholder="Qual o CPF do titular?"
          value= {cpf}
          onChange={event => setCpf(event.target.value)}
          />
          {/* ---------------Phone------------------------------------ */}
          <label htmlFor="phone">TELEFONE</label>
          <input type="tel" 
          id="phone" 
          placeholder="Qual o telefone de contato?"
          value= {phone}
          onChange={event => setPhone(event.target.value)}
          />
          {/* ---------------Descrição------------------------------------ */}
          <label htmlFor="interpriseName">DESCRIÇÃO</label>
          <textarea type="text" 
          id="about" 
          placeholder="Uma breve descrição sobre você/salão"
          value= {about}
          onChange={event => setAbout(event.target.value)}
          />
          {/* ---------------SENHA------------------------------------ */}
          <label htmlFor="senha">Senha</label>
          <input type="password" 
          id="senha" 
          placeholder="Sua senha"
           value= {senha}
           onChange={event => setSenha(event.target.value)}
          />
          <label htmlFor="senhaConfirmacao">Confirme sua senha</label>
          <input type="password" 
          id="senhaConfirmacao" 
          placeholder="Repita a sua senha"
           value= {senhaConfirmacao}
           onChange={event => setSenhaConfirmacao(event.target.value)}
          />
         <button type="submit" className= "btn">ENTRAR</button>
        </form>
        </>
    );
}