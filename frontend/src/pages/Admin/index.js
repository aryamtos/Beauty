import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
// import socketio from 'socket.io-client';

export default function Dashboard(){

    
    return(
        <>

        <Link to="/showusers">
            <button className="btn">Mostrar Usuários</button> 
        </Link>
        <br/> <br/>
        <Link to="/showpartners">
            <button className="btn">Mostrar Parceiros</button> 
        </Link>
        </>
    )
}