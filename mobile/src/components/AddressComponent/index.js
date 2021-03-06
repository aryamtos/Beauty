import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, Image,TextInput,StatusBar, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

import lupa from '../../assets/BUSCAR_cinza.png'

import api from '../../services/api'


export default function AdrresComponent({ nome, navigation }) {

    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots/servicos', {
                params: { nome }
            })
            setServicos(response.data);
        }
        loadSpots();
    }, []);

    function handleNavigation() {

        navigation.navigate('StoreProfile');
    }


    return (


        <View style={styles.container}>
            <View style={styles.busca}>
                <TouchableOpacity onPress={() => { navigation.navigate('Search') }} style={styles.btnLupa}>
                    <Image source={lupa} style={styles.buscaIcon} />
                </TouchableOpacity>
                <TextInput
                    style={styles.buscaText}
                    placeholder="Buscar serviços ou estabelecimentos"
                    onSubmitEditing={() => { navigation.navigate('Search') }}
                />
            </View>
            <Text style={styles.containerText}>Estabelecimentos encontrados</Text>
            <TouchableOpacity onPress={handleNavigation} style={styles.result}>
                <FlatList
                    style={styles.list}
                    data={servicos}
                    keyExtractor={nome => nome._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.foto_url }} style={styles.thumbnail} />


                    )}
                />
            </TouchableOpacity>
        </View>
        /*
            <View style={styles.resultData}>
                <Text style={styles.resultNameText}>Barberia do João</Text>
                <Text style={styles.resultText}>Av. São Rafael, 174 - Ponto Central</Text>
                <View style={styles.resultDataRate}>
                    <Icon name="star-o" type="font-awesome" size={10} style={{ marginTop: 2, marginRight: 2 }}/>
                    <Text style={styles.resultText}>4,0</Text>
                    <Text style={styles.resultText}>Barba - Cabelo</Text>
                </View>
            </View>
   

    </View>*/

    );
}



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
    buscaIcon: {
        height: 20,
        resizeMode: 'contain',
        padding: 0,
        margin: -40,
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
        height: 72,
        resizeMode: 'contain',
        marginRight: 10,
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
