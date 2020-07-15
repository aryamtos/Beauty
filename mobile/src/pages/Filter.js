import _ from "lodash";
import React, { Component, useEffect, useState } from 'react';
import api from '../services/api';

export const getServices = (limit = 20, query = " ") => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadServices() {
            const response = await api.get('/all');
            setData(response.data);
        }
        loadServices();
    }, [])

    const contains = ({ Service, user }, query) => {
        const { nomeService, category } = Service;
        if (nomeService.includes(query) || category.includes(query) || user.includes(query)) {
            return true;
        }
        return false;
    };

    return new Promise((resolve, reject) => {
        if (query.length === 0) {
            resolve(_.take(setData, limit));
        }
        else {
            const formattedQuery = query.toLowerCase();
            const results = _.filter(setData, user => {
                return contains(user, formattedQuery);
            });
            resolve(_.take(results, limit));
        }
    });

};
export default getServices;