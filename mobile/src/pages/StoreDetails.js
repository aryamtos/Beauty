import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, ImageBackground, SafeAreaView, AsyncStorage } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api';


export default function StoreDetails() {
    const route = useRoute();
    const [categoria, setCategoria] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [date, setDate] = useState('');
    const servico = route.params.servico;
    console.log(servico)

    return(
        <View style={styles.container}>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Sobre</Text>
    <Text style={styles.sessionNormalText}>{servico.descricao}</Text>
            </View>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Endereço</Text>
    <Text style={styles.sessionNormalText}>{servico.address}</Text>
            </View>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Contato</Text>
    <Text style={styles.sessionNormalText}>{servico.user.email}</Text>
            </View>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Horário de Funcionamento</Text>
                <View style={styles.hoursSession}>
                    <View>
                        <Text style={styles.sessionNormalText}>Segunda</Text>
                        <Text style={styles.sessionNormalText}>Terça</Text>
                        <Text style={styles.sessionNormalText}>Quarta</Text>
                        <Text style={styles.sessionNormalText}>Quinta</Text>
                        <Text style={styles.sessionNormalText}>Sexta</Text>
                        <Text style={styles.sessionNormalText}>Sábado</Text>
                    </View>  
                    <View>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                        <Text style={styles.sessionNormalText}>08:00 - 18:00</Text>
                    </View>  
                </View>            
            </View>
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
    session: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingBottom: 10,
        marginBottom: 10,
    },
    hoursSession: {
        flexDirection: 'row',
    },
    sessionBoldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#747474',
    },
    sessionNormalText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#A5A5A5',
        marginLeft: 10,
    },
    sessionPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#747474',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
});