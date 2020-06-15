import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, StatusBar, FlatList, Image, SafeAreaView, Alert, TextInput, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import GlobalStyles from '../assets/GlobalStyles';
import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import PropTypes from 'prop-types';

import api from '../services/api';

//import ServiceList from '../components/ServiceList';x'

//import { Container, Title, Button, ButtonText, ProductList } from './styles';

export default function CategoryPage({ navigation }) {


  const [servicos, setServicos] = useState([]);
  const [tipos, setTipos] = useState([]);
  

  useEffect(() => {

    loadProducts();
  }, []);


  useEffect(() => {
    AsyncStorage.getItem('tipos').then(storageCategoria => {
        const categoriaArray = storageCategoria.split(',').map(tipos=> tipos.trim());
        setTipos(categoriaArray);
    })
}, []);

  async function loadProducts() {

    const response = await api.get('/list/cortes',{
      params:{tipos}
    });
    setServicos(response.data);
    //setServicos([...servicos, ...response.data]);

    console.log(response.data);
   
  }

  function handleNavigate(servico) {

    navigation.navigate('StoreProfile', {servico});
   

  }
  //renderListItem = ({ item }) => <ProductItem product={item} />

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
      <FlatList
        style={styles.list}
        data={servicos}
        keyExtractor={servico => String(servico._id)}
        //horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item:servico }) => (

         
            <ScrollView>
              <Image source={{ uri: servico.foto_url }} style={styles.thumbnail}></Image>
              <TouchableOpacity onPress={() => handleNavigate(servico)} style={styles.result} >

                <View style={styles.resultData}>
                  <Text style={styles.resultNameText}>{servico.nome}</Text>
                  <View style={styles.resultDataRate}>
                    <Text style={styles.resultText}>{servico.descricao}</Text>
                  </View>
                  <Text style={styles.resultText}>{servico.categoria}</Text>
                  <Text style={styles.resultText}>{servico.tipos}</Text>
                  
                  
                </View>
              </TouchableOpacity>
            </ScrollView>
         
        )}
      />

    </View>

  );
}
/*
 <SafeAreaView style={[GlobalStyles.droidSafeArea, styles.container]} >*/

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
