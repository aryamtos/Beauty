import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StatusBar, VirtualizedList,ScrollView,SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default function SpotList({ tipo, navigation }) {
    const [spots, settipo] = useState([]);
    const [nome, setNome] = useState([]);

    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/spots/servicos', {
                params: { tipo },

            })
            settipo(response.data);
            //setNome(response.data);
            //console.log(response.data)
        }
        loadCategories();
    }, []);
    /*  function handleNavigate(id ){
         
      }*/
    function handleNavigation() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>Estabelecimentos encontrados</Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={servico => servico._id}
                //horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ScrollView>
                    <Image source={{ uri: item.foto_url }} style={styles.thumbnail}></Image>
                    <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.result} >
      
                      <View style={styles.resultData}>
                        <Text style={styles.resultNameText}>{item.nome}</Text>
                        <View style={styles.resultDataRate}>
                          <Text style={styles.resultText}>{item.descricao}</Text>
                        </View>
                        <Text style={styles.resultText}>{`R$${item.preco}`}</Text>
                        <Text style={styles.resultText}>{item.categoria}</Text>
                        <Text style={styles.resultText}>{item.tipos}</Text>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>

                )}
            />
        </View>
        /*
        <View style={StyleSheet.container}>
            <Text style={styles.tittle}>Empresas que usam <Text style={styles.bold}>{tipo}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbmail} source={{ uri: item.foto_url }} />
                        <Text style={styles.company}>{item.nome}</Text>
                        <Text style={styles.price}>{item.preco ? `R$${item.preco}/dia` : 'GRATUITO'}</Text>
                      
                    </View>
                      
                )}
                />
           
           
        </View>*/
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
  
/*
   /*
            <TouchableOpacity onPress={() =>handleNavigate(item._id)} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            */
/*
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
    tittle: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
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
    thumbmail: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 90,
        resizeMode: 'contain',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
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
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});*/
