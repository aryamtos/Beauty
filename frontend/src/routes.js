import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import Admin from "./pages/Admin";
import DashUsers from "./pages/DashUserAdmin";
import DashPartners from "./pages/DashPartnerAdmin";
import Update from "./pages/Update";
import Delete from "./pages/Delete";

// Criadas recentemente, podem conter erros :)
import PartnerUpdate from "./pages/PartnerUpdate";
import BusinessHoursUpdate from "./pages/BusinessHoursUpdate";
import ProfessionalsUpdate from "./pages/ProfessionalsUpdate";
import NewProfessional from "./pages/NewProfessional";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";
import SendNotification from "./pages/SendNotification";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset/:id" component={ResetPassword} />
        <Route path="/register" component={Registration} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
        <Route path="/update" component={Update} />
        <Route path="/delete" component={Delete} />
        <Route path="/partner-update" component={PartnerUpdate} />
        <Route path="/business-hours-update" component={BusinessHoursUpdate} />
        <Route path="/professionals-update" component={ProfessionalsUpdate} />
        <Route path="/professional-store" component={NewProfessional} />

        <Route path="/admin" component={Admin} />
        <Route path="/showusers" component={DashUsers} />
        <Route path="/showpartners" component={DashPartners} />
        <Route path="/send-notification" component={SendNotification} />
      </Switch>
    </BrowserRouter>
  );
}
