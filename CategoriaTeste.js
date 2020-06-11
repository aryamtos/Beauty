
import React, { useState, useEffect, Component } from 'react';
import { Text, StyleSheet, ScrollView, View, StatusBar, FlatList, Image, SafeAreaView, Alert, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import api from '../services/api';
import { NavigationParams} from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import GlobalStyles from '../assets/GlobalStyles';
import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import PropTypes from 'prop-types';

export default class CategoriaTeste extends Component{

    /*
    static navigationOption = ({ navigation }) => {
        return {
            title: navigation.getParam('tipos', null)
        }
    }
    */

    constructor(props) {
        super(props);
       
        this.state = {

            servicos: [],

          };
    }
  
  async componentDidMount() {

    
    await api.get(`/service/${_id}`)
      .then(res => {
        const servicos = res.data;
        this.setState({
          servicos,
        });
        console.log(servicos);
      })
  }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.busca}>

                 
                </View>
                <Text style={styles.containerText}>Estabelecimentos encontrados</Text>
                <FlatList

                />
            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight,
        paddingTop: 30,
    },
    containerText: {
        fontSize: 14,
        color: '#aaa',
        paddingVertical: 10,
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
    listItem: {
        marginRight: 15,
    },
    buscaIcon: {
        height: 20,
        resizeMode: 'contain',
        padding: 0,
        margin: -40,
    },
    list: {
        paddingHorizontal: 20,
    },
    btnLupa: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buscaText: {
        fontSize: 14,
        color: '#444',
        padding: 0,
    },
    result: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    thumbnail: {

        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 90,
        resizeMode: 'contain',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        /*
        width:200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,*/
        /*
        height: 90,
        resizeMode: 'contain',
        marginRight: 10,*/
        /*width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2*/
    },
    resultData: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 10,
        width: '100%',
    },
    resultNameText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#999',
    },
    resultText: {
        fontSize: 10,
        fontWeight: 'normal',
        color: '#999',
        marginRight: 15,
    },
    resultDataRate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

