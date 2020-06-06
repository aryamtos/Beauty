import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, StatusBar, AsyncStorage, ScrollView , SafeAreaView,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import api from '../services/api';
import AddressComponent from '../components/AddressComponent';

export default function SearchResult() {

    const [nome, setServicos] = useState([]);

    useEffect(() =>{
        AsyncStorage.getItem('nome').then(storagedServicos => {
            const servicosArray = storagedServicos.split(',').map(nome=>nome.trim());
            setServicos(servicosArray);
        })
    },[]);
    /*useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots/servicos', {
                params: { nome }
            })
            setServicos(response.data);
        }
        loadSpots();
    }, []);*/
    /*/
    /*useEffect(() =>{

        AsyncStorage.getItem('nome').then(nome=>{
            setServicos(nome);
        })
    },[]);*/
    
    return (
        <ScrollView>
      
        </ScrollView>
        
    );
}

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

});