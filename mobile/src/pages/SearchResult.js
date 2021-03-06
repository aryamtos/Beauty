import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, StatusBar, VirtualizedList, AsyncStorage, ScrollView, SafeAreaView, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import api from '../services/api';
import SpotList from '../components/SpotList';
import GlobalStyles from '../assets/GlobalStyles';

export default function SearchResult({navigation}) {

    const [tipos, setCategoria] = useState([]);
    const [nome, setNome] = useState([]);
    function handleNavigation() {
        navigation.goBack();
    }

    useEffect(() => {
        AsyncStorage.getItem('tipos').then(storagedServicos => {
            const servicosArray = storagedServicos.split(',').map(tipo => tipo.trim());
            setCategoria(servicosArray);
        })
        /*AsyncStorage.getItem('nome').then(storagedNome => {
            const localArray = storagedNome.split(',').map(nome=>nome.trim());
           /setNome(localArray);
        }) */
    }, []);


    return (

        <ScrollView>
            {tipos.map(tipo => <SpotList key={tipo} tipos={tipo} />)}

            <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                <Text style={styles.btnText}>VOLTAR</Text>
            </TouchableOpacity>
        </ScrollView>

    )
}

const styles = StyleSheet.create({

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        height: 42,
        backgroundColor: '#707070',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});



/*
    //  {nome.map(nome=><AddressComponent key={nome} nome = {nome} />)}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight,
        paddingTop: 20,
    },
    busca: {
        flexDirection: 'row',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buscaIcon: {
        height: 20,
        resizeMode: 'contain',
        padding: 0,
        margin: -40,
    },
    buscaText: {
        fontSize: 14,
        color: '#444',
        padding: 0,
    },
    containerText: {
        fontSize: 14,
        color: '#aaa',
        paddingVertical: 10,
    }
});*/

