import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import CategoryPage from "../pages/CategoryPage"; //Corte
import Depilacao from "../pages/Depilacao";
import BeardPage from "../pages/BeardPage";
import Manicure from "../pages/Manicure";
import PartnerDashboard from "../pages/PartnerDashboard";
import PartnerProfile from "../pages/PartnerProfile";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/Search";

import SearchResult from "../pages/SearchResult";
import UserProfile from "../pages/UserProfile";
import Customers from "../pages/Customers";
import NewCustomer from "../pages/NewCustomer";
import BusinessHours from "../pages/BusinessHours";
import Services from "../pages/Services";
import Location from "../pages/Location";
import NewService from "../pages/NewService";
import StoreProfile from "../pages/StoreProfile";
import BookRequest from "../pages/BookRequest";
import ListAgendamentos from "../pages/ListAgendamentos";
import Profile from "../pages/Profile";
import HistoryAgendamentos from "../pages/HistoryAgendamentos";

import CategoriaTeste from "../pages/CategoriaTeste";
import logoInicio from "../assets/INICIO.png";
import logoBusca from "../assets/buscaR.png";
import logoPerfil from "../assets/PERFIL.png";
import logoClientes from "../assets/clientes.png";
import AuthContext from "../contexts/auth";

const AppStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/***
 * Essa é a navegação de tab que aparece
 *  em baixo da tela do usuário logado
 *  (sem ser parceiro)
 ***/

function manicureNav() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      inactiveColor="#FFF"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={Manicure}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Buscar"
        component={searchNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
function beardNav() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      inactiveColor="#FFF"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={BeardPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Buscar"
        component={searchNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
function depilNav() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      inactiveColor="#FFF"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={Depilacao}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Buscar"
        component={searchNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
function categoryNave() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      inactiveColor="#FFF"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={CategoryPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Buscar"
        component={searchNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
function dashboardNav() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      inactiveColor="#FFF"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Buscar"
        component={searchNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}

/***
 * Essa é a navegação de tab que aparece
 *  em baixo da tela do usuário logado
 *  (como parceiro)
 ***/
function partnerDashboardNav() {
  return (
    <Tab.Navigator
      activeColor="#511D68"
      barStyle={styles.tabBar}
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoInicio} style={styles.tabIcon} />
          ),
        }}
        name="Início"
        component={partnerServicesNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoClientes} style={styles.tabIcon} />
          ),
        }}
        name="Clientes"
        component={partnerCustomersNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={logoPerfil} style={styles.tabIcon} />
          ),
        }}
        name="Perfil"
        component={PartnerProfile}
      />
    </Tab.Navigator>
  );
}

/**
 * Stack Navigator para o caminho dos serviços
 * que o parceiro pode visualizar ou criar
 **/
function partnerServicesNav() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="PartnerDashboard" component={PartnerDashboard} />
      <AppStack.Screen name="NewService" component={NewService} />
    </AppStack.Navigator>
  );
}

/**
 * AppStack Navigator para o caminho dos clientes
 * que o parceiro pode visualizar ou criar
 **/
function partnerCustomersNav() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Customers" component={Customers} />
      <AppStack.Screen name="NewCustomer" component={NewCustomer} />
    </AppStack.Navigator>
  );
}

/***
 * Stack Navigator para o caminho de busca
 * usado pelo usuário
 ***/
function searchNav() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Search" component={Search} />
      <AppStack.Screen name="SearchResult" component={SearchResult} />
      <AppStack.Screen name="StoreProfile" component={StoreProfile} />
    </AppStack.Navigator>
  );
}

const AppRoutes = () => {
  const { type } = useContext(AuthContext);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {type === "user" ? (
        <AppStack.Screen name="Dashboard" component={dashboardNav} />
      ) : (
        <AppStack.Screen
          name="PartnerDashboard"
          component={partnerDashboardNav}
        />
      )}
      <AppStack.Screen name="CategoryPage" component={categoryNave} />
      <AppStack.Screen name="Manicure" component={manicureNav} />
      <AppStack.Screen name="Depilacao" component={depilNav} />
      <AppStack.Screen name="BeardPage" component={beardNav} />
      <AppStack.Screen name="Search" component={Search} />
      <AppStack.Screen name="SearchResult" component={SearchResult} />
      <AppStack.Screen name="UserProfile" component={UserProfile} />
      <AppStack.Screen name="PartnerProfile" component={PartnerProfile} />
      <AppStack.Screen name="Customers" component={Customers} />
      <AppStack.Screen name="NewCustomer" component={NewCustomer} />
      <AppStack.Screen name="BusinessHours" component={BusinessHours} />
      <AppStack.Screen name="Services" component={Services} />
      <AppStack.Screen name="CategoriaTeste" component={CategoriaTeste} />
      <AppStack.Screen name="Location" component={Location} />
      <AppStack.Screen name="NewService" component={NewService} />
      <AppStack.Screen name="StoreProfile" component={StoreProfile} />
      <AppStack.Screen name="BookRequest" component={BookRequest} />
      <AppStack.Screen name="ListAgendamentos" component={ListAgendamentos} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="History" component={HistoryAgendamentos} />
    </AppStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#511D68",
  },
  tabIcon: {
    height: 25,
    resizeMode: "contain",
  },
});

export default AppRoutes;
