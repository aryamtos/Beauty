import React, { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./contexts/auth";
import AuthHandler from "./components/AuthHandler";

// Listagem das rotas do app, com um Stack Navigator como navegação principal do App
function Routes({ navigation }) {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthHandler />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;
