import React, {useState} from 'react';
import api from '../../services/api';
import './styles.css'; 

export default function Login({history}){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(event){
    event.preventDefault();
    const response = await api.post('/authentification', {email, senha});
    const { token }= response.data;
    const { user }= response.data;
    const {_id} = user;
    const {isAdmin} = user;
    localStorage.setItem('partner', _id);
    localStorage.setItem('token-access', token);

     if(!isAdmin){
     history.push('/dashboard');}
     else{
      history.push('/admin');}
     
    
    }
    return (
        <>
        <p>
          Cadastre-se e <strong>aumente</strong> o seu alcance e número de <strong> clientes</strong>
        </p>

        <form onSubmit = {handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input type="email" 
          id="email" 
          placeholder="Seu email"
          value= {email}
          onChange={event => setEmail(event.target.value)}
          required
          />
          <label htmlFor="senha">Senha</label>
          <input type="password" 
          id="senha" 
          placeholder="Sua senha"
           value= {senha}
           onChange={event => setSenha(event.target.value)}
           required
          />
         <button type="submit" className= "btn">ENTRAR</button>
        </form>
        <div className="link">
          <a href="http://localhost:3000/register">Não tenho cadastro</a>
        </div>       
        </>
    );
}