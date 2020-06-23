import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
// import socketio from 'socket.io-client';

export default function Dashboard(){
    const [services, setServices] = useState([]);

    useEffect(()=>{
        async function loadServices(){
            const user_id = localStorage.getItem('partner');

            const token_access = localStorage.getItem('token-access');
            const response = await api.get('/partner/service/index', {
                headers: {user_id, token_access}
            });
            console.log(response);
            setServices(response.data); 
        }
        loadServices();
    }, []);


     async function handleClick(id){
         localStorage.setItem('productID', id);
     }
    
    return(
        <>

        <h2>Seus serviços:</h2>
        <ul className="spot-list">
            {services.map(service => (
                <li key = {service._id}>
                   <br></br>
                    <h3>{service.nome}</h3>
                    <span>{service.parte}</span>
                    <span>{`R$${service.preco}`}</span>
                    <span>{`${service.tempo} min`}</span>
                    
                     <span className="sbutton"> 
                    <Link to= '/update'>
                    <button onClick={handleClick(service._id)} className="btn1">Editar</button>
                    </Link>
                    </span> 
                    <br/>
                </li>

            ))}
        </ul>
        <Link to="/new">
            <button className="btn">Cadastrar novo serviço</button> 
        </Link>
        </>
    )
}