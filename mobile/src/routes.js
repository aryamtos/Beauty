import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import PartnerLogin from './pages/PartnerLogin';
import CategoryPage from './pages/CategoryPage';
import BeardPage from './pages/BeardPage';
import PartnerRegister from './pages/PartnerRegister';
import PartnerDashboard from './pages/PartnerDashboard';
import PartnerProfile from './pages/PartnerProfile';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';

import SearchResult from './pages/SearchResult';
import UserProfile from './pages/UserProfile';
import Customers from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import BusinessHours from './pages/BusinessHours';
import Services from './pages/Services';
import Location from './pages/Location';
import NewService from './pages/NewService';
import StoreProfile from './pages/StoreProfile';
import SpotList from './components/SpotList';

import CategoriaTeste from './pages/CategoriaTeste';
import logoInicio from './assets/INICIO.png';
import logoBusca from './assets/buscaR.png';
import logoPerfil from './assets/PERFIL.png';
import logoClientes from './assets/clientes.png';


// Declaração de navegadores genéricos
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/***
 * Essa é a navegação de tab que aparece
 *  em baixo da tela do usuário logado
 *  (sem ser parceiro)
 ***/
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
                    tabBarIcon: (() => (
                        <Image source={logoInicio} style={styles.tabIcon} />
                    ))
                }}
               name="Início"
                component={BeardPage}
            />
             <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoClientes} style={styles.tabIcon} />
                    ))
                }}
                name="Buscar"
                component={searchNav}
            />
             <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoPerfil} style={styles.tabIcon} />
                    ))
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
                    tabBarIcon: (() => (
                        <Image source={logoInicio} style={styles.tabIcon} />
                    ))
                }}
               name="Início"
                component={CategoryPage}
            />
             <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoClientes} style={styles.tabIcon} />
                    ))
                }}
                name="Buscar"
                component={searchNav}
            />
             <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoPerfil} style={styles.tabIcon} />
                    ))
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
                    tabBarIcon: (() => (
                        <Image source={logoInicio} style={styles.tabIcon} />
                    ))
                }}
                name="Início"
                component={Dashboard}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoClientes} style={styles.tabIcon} />
                    ))
                }}
                name="Buscar"
                component={searchNav}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoPerfil} style={styles.tabIcon} />
                    ))
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
                    tabBarIcon: (() => (
                        <Image source={logoInicio} style={styles.tabIcon} />
                    ))
                }}
                name="Início"
                component={partnerServicesNav}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoClientes} style={styles.tabIcon} />
                    ))
                }}
                name="Clientes"
                component={partnerCustomersNav}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (() => (
                        <Image source={logoPerfil} style={styles.tabIcon} />
                    ))
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PartnerDashboard" component={PartnerDashboard} />
            <Stack.Screen name="NewService" component={NewService} />
        </Stack.Navigator>
    );
}

/**
 * Stack Navigator para o caminho dos clientes
 * que o parceiro pode visualizar ou criar
 **/
function partnerCustomersNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Customers" component={Customers} />
            <Stack.Screen name="NewCustomer" component={NewCustomer} />
        </Stack.Navigator>
    );
}

/***
 * Stack Navigator para o caminho de busca
 * usado pelo usuário
 ***/
function searchNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name="StoreProfile" component={StoreProfile} />
        </Stack.Navigator>
    );
}

// Listagem das rotas do app, com um Stack Navigator como navegação principal do App
function Routes({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="PartnerLogin" component={PartnerLogin} />
                <Stack.Screen name="CategoryPage" component={categoryNave} />
                <Stack.Screen name="BeardPage" component={beardNav} />
                <Stack.Screen name="PartnerRegister" component={PartnerRegister} />
                <Stack.Screen name="Dashboard" component={dashboardNav} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="SearchResult" component={SearchResult} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="PartnerDashboard" component={partnerDashboardNav} />
                <Stack.Screen name="PartnerProfile" component={PartnerProfile} />
                <Stack.Screen name="Customers" component={Customers} />
                <Stack.Screen name="NewCustomer" component={NewCustomer} />
                <Stack.Screen name="BusinessHours" component={BusinessHours} />
                <Stack.Screen name="Services" component={Services} />
                <Stack.Screen name="CategoriaTeste" component={CategoriaTeste} />
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="NewService" component={NewService} />
                <Stack.Screen name="StoreProfile" component={StoreProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#511D68',
    },
    tabIcon: {
        height: 25,
        resizeMode: 'contain',
    }
});

export default Routes;