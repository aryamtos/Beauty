import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, StatusBar, FlatList, Image, SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import lupa from '../assets/BUSCAR_cinza.png';
import logoLoja from '../assets/logo_loja.jpg';
import PropTypes from 'prop-types';

import api from '../services/api';

//import ServiceList from '../components/ServiceList';

import { Container, Title, Button, ButtonText, ProductList } from './styles';

export default function CategoryPage({ navigation }) {


  const [servicos, setServicos] = useState([]);
  useEffect(() => {
    async function loadProducts() {

      const response = await api.get('/list/barba');//showservices

      console.log(response.data);

      setServicos(response.data);
    }

    loadProducts();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('StoreProfile',{id});
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
          keyExtractor={servico => servico._id}
          //horizontal
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <SafeAreaView>
              <ScrollView>
              <Image source={{ uri: item.foto_url }} style={styles.thumbnail}></Image>
                <TouchableOpacity onPress={() => handleNavigate(item._id)}style={styles.result} >
              
                  <View style={styles.resultData}>
                    <Text style={styles.resultNameText}>{item.nome}</Text>
                    <View style={styles.resultDataRate}>
                      <Text style={styles.resultText}>{item.descricao}</Text>
                    </View>
                    <Text style={styles.resultText}>{`R$${item.preco}`}</Text>
                    <Text style={styles.resultText}>{item.cidade}</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          )}
        />

    </View>

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
        height: 72,
    resizeMode: 'contain',
    marginRight: 10,
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
