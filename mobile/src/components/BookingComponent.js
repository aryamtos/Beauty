import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StatusBar, VirtualizedList, ScrollView, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api';


export default function BookingComponent({ tipo }) {

    const [tipos, setTipos] = useState([]);
    const route = useRoute();
    const servico = route.params.servico;

    useEffect(() => {

        async function handleSubmit() {
            const response = await api.get(`/service/${servico._id}`, {
                params: { tipo }
            })
            setTipos(response.data)
        }
        handleSubmit();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.service}>
                <Text>{tipo}</Text>
                <FlatList
                    data={tipos}
                    keyExtractor={tipo => tipo._id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Text style={styles.serviceBoldText}>{item.tipos}</Text>
                    )}
                />
                <View style={styles.leftSide}>
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