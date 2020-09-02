import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
// import socketio from 'socket.io-client';

export default function Dashboard(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function loadUsers(){
             const token_access = localStorage.getItem('token-access');
            const response = await api.get('/admin/showusers', {
                headers: { token_access}
            });
            console.log(response);
            setUsers(response.data); 
        }
        loadUsers();
    }, []);
    
    return(
        <>

        <h3>Clientes ativos:</h3>
        <ul className="spot-list">
            {users.map(user => (
                <li key = {user._id}>
                   <br></br>
                    <strong>{user.nome}</strong>
                    <span>{user.email}</span>
        
                    <span className="sbutton"> 
                    <Link to= "/update">
                    <button className="btn1">Editar</button>
                    </Link>
                    </span>
                    {/* <button className="btn2">Deletar</button> */}
  
                </li>
            ))}
        </ul>
        </>
    )
}