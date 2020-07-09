import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, FlatList, TextInput, View, StatusBar, VirtualizedList, AsyncStorage, ScrollView, SafeAreaView, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import api from '../services/api';
import SpotList from '../components/SpotList';
import GlobalStyles from '../assets/GlobalStyles';

export default function SearchResult({ navigation }) {


    //const [nomeService, setNome] = useState([]);

    const [spots, settipo] = useState([]);
    const [nome, setNome] = useState([]);
    
    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/spots', {
                params: { nomeService },

            })
            settipo(response.data);

        }
        loadCategories();
    }, []);



    function handleNavigation() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>Estabelecimentos encontrados</Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={servico => String(servico._id)}
                //horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: servico }) => (
                    <ScrollView>
                        <Image style={styles.thumbnail}></Image>
                        <View style={styles.resultData}>
                            <Text style={styles.resultNameText}>{servico.nomeService}</Text>
                            <View style={styles.resultDataRate}>

                            </View>
                            <Text style={styles.resultText}>{servico.user.category}</Text>
                            <Text style={styles.resultText}>{servico.user.adress}</Text>


                        </View>
                        <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                            <Text style={styles.btnText}>VOLTAR</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            />
        </View>

    )
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
  