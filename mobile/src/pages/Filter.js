import _ from "lodash";
import React, { Component, useEffect, useState } from 'react';
import api from '../services/api';

const [data, setData] = useState([]);
const contains = ({Service, user}, query ) =>{
    const {nomeService, category} = Service ;
    if (nomeService.includes(query) || category.includes(query) || user.includes(query)){
        return true;
    }
    return false;
};

export const getServices = (limit = 20, query = " ") =>{
    useEffect(() =>{   
        async function loadServices(){
            const response = await api.get('/all');
            setData(response.data);
        }
        loadServices();
    },[])
    return new Promise((resolve, reject) => {
        if (query.length === 0) {
          resolve(_.take(setData, limit));
        }
        else{
            const formattedQuery = query.toLowerCase();
            const results = _.filter(setData, user => {
              return contains(user, formattedQuery);
            });
            resolve(_.take(results, limit));
        }
    });

};
export default getServices;