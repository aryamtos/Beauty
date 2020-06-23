import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import Admin from './pages/Admin';
import DashUsers from './pages/DashUserAdmin';
import DashPartners from './pages/DashPartnerAdmin';
import Update from './pages/Update';
import Delete from './pages/Delete';


export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path= "/" exact component={Login} />
            <Route path = "/register" component = {Registration}/>
            <Route path= "/dashboard" component={Dashboard} />
            <Route path= "/new" component={New} />
            <Route path= "/update" component={Update} />
            <Route path= "/delete" component={Delete} />


            <Route path= "/admin" component={Admin} />
            <Route path= "/showusers" component={DashUsers} />
            <Route path= "/showpartners" component={DashPartners} />

        </Switch>
        </BrowserRouter>
    );
}