import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';


export default function Dashboard(){
    const [partners, setPartners] = useState([]);

    useEffect(()=>{
        async function loadPartners(){
            const token_access = localStorage.getItem('token-access');
            const response = await api.get('/admin/showpartners', {
                headers: { token_access}
            });
            console.log(response);
            setPartners(response.data); 
        }
        loadPartners();
    }, []);
    
    return(
        <>

        <h3>Parceiros ativos:</h3>
        <ul className="spot-list">
            {partners.map(partner => (
                <li key = {partner._id}>
                   <br></br>
                    <strong>{partner.interpriseName}</strong>
                    <span>{partner.email}</span>

                    
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