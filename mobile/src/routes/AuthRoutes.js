import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from "../pages/Index";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Register from "../pages/Register";
import PartnerLogin from "../pages/PartnerLogin";
import PartnerRegister from "../pages/PartnerRegister";

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Index" component={Index} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Forgot" component={Forgot} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="PartnerLogin" component={PartnerLogin} />
    <AuthStack.Screen name="PartnerRegister" component={PartnerRegister} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
