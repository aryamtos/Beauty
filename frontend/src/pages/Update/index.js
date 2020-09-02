import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Update({history}){
    const [tempo, setTempo]= useState('');
    const [preco, setPreco] = useState('');


    async function handleSubmit(event){
        event.preventDefault();
        const user_id = localStorage.getItem('partner');
        const service_id = localStorage.getItem('productID');

        const token_access = localStorage.getItem('token-access');
        const response = await api.put('/partner/service/' + service_id,{tempo, preco},
       
             {  
                headers: {user_id, token_access}
            },
            
         )
         history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
           
            <br></br>
            <label htmlFor="preco">PREÇO *</label>
            <input id="preco"
            placeholder="Qual o preço da diária?"
            value={preco}
            onChange={event=> setPreco(event.target.value)}
            />
            <label htmlFor="preco">TEMPO *</label>
            <input id="preco"
            placeholder="Qual o preço da diária?"
            value={tempo}
            onChange={event=> setTempo(event.target.value)}
            />
            <br/>
           <button type="submit" className="btn">Atualizar</button> 
           <br/>
           <span className="sbutton"> 
              <Link to= '/delete'>
                <button className="btn2">Deletar</button>
              </Link>
            </span>          
        </form>
    )
}