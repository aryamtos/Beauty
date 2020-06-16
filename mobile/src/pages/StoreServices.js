import React, { useState, useEffect } from 'react';
//import socketio from 'socket.io-client';
import { StyleSheet, View, Text, StatusBar, ImageBackground, SafeAreaView,ScrollView, AsyncStorage } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api';
import BookingComponent from '../components/BookingComponent';

export default function StoreServices({ navigation }) {

    const route = useRoute();
    const [categoria, setCategoria] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [date, setDate] = useState('');
    const servico = route.params.servico;
    console.log(servico)
   /* useEffect(() => {

        async function handleSubmit() {
            const response = await api.get(`/service/${servico._id}`,{
                params: servico.tipos
            })
            setTipos(response.data)

        }
        handleSubmit();
    }, []);*/
    useEffect(() => {
        AsyncStorage.getItem('tipos').then(storageCategoria => {
            const categoriaArray = storageCategoria.split(",").map(tipos => tipos.trim());
            setTipos(categoriaArray);
        })

    }, []);

    function handleNavigate(_id,servicos,user) {
        navigation.navigate('BookRequest', {_id,servicos,user});
    }
    return (

<View style={styles.container}>

            <View style={styles.service}>
                <View style={styles.leftSide}>
                    <Text style={styles.serviceBoldText}>{servico.servicos.servicos}</Text>
                    <Text style={styles.serviceNormalText}>{servico.servicos.tempo}</Text>
                    <Text style={styles.serviceNormalText}>{servico.categoria}</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.servicePrice}>R${servico.servicos.preco}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleNavigate(servico._id,servico.servicos._id,servico.user)} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Serviço</Text>
            </TouchableOpacity>

        </View>
                  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 10,
    },
    service: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceBoldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#747474',
    },
    serviceNormalText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#A5A5A5',
    },
    servicePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#747474',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    leftSide: {
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    rightSide: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },

    button: {
        height: 32,
        backgroundColor: '#483D8B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    }
});