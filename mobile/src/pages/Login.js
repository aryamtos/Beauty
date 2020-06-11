
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, KeyboardAvoidingView, Alert } from 'react-native';
import background from '../assets/fundo2.png';
import logo from '../assets/beautymenu1.png';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, StackNavigator, NavigationActions } from 'react-navigation';
import api from '../services/api';

export default function Login({navigation}) {


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(event) {

    event.preventDefault();

    try {
      const response = await api.post('/auth',{
        email,
        senha,
      })
         
      const {_id} = user;
      const {token} = response.data;
      localStorage.setItem('user', _id)
      localStorage.setItem('token', response.data.token)

      navigation.navigate('Dashboard');

    } catch (err) {
      alert('Falha no login, tente novamente')
    }
    
    console.log(response);
    /*
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('token-access',token);
    */
    /*const {token} = response.data;
    const {user} = response.data;
    const {_id} = user;
    localStorage.setItem('user', _id);
    localStorage.setItem('token-access',token);

     navigation.navigate('Dashboard');*/
    
    //history.push('/Dashboard');
  }

  return (
    <ImageBackground source={background} style={styles.body}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.form}>
          <View style={styles.formTop}></View>
          <TextInput
            style={styles.Input}
            placeholder="CPF ou E-MAIL"
            placeholderTextColor="#A5A5A5"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            //onChangeText= {setEmail}
           onChange={(event) => setEmail(event.target.value)}
            //onChangeText={setEmail}
          // value={email}
          //onChangeText={setEmail}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="SENHA"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={senha}
            onChangeText = {(event) => setSenha(event.target.value)}
            //nChangeText ={setSenha}
            //onChange={event => setSenha(event.target.value)}
            //onChangeText={setSenha}
          //value={senha}
          //onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alternatives}>
          <View style={styles.divide}>
            <View style={styles.divideLine} />
            <Text style={styles.divideText}>ou</Text>
            <View style={styles.divideLine} />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.btnGoogle}><Text style={styles.textGoogle}>ENTRAR COM O GOOGLE</Text></TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSubmit}><Text style={styles.footerText}>Criar conta</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}><Text style={styles.footerText}>Esqueci minha senha</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    marginBottom: -2,
  },
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 180,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  formTop: {
    borderTopWidth: 1,
    borderColor: '#BDAAC6',
  },
  Input: {
    backgroundColor: '#fff',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    borderColor: '#BDAAC6',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  borderContainer: {
    backgroundColor: '#fff',
    borderColor: '#BDAAC6',
    borderWidth: 0,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  border: {
    width: '90%',
    borderColor: '#BDAAC6',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    alignSelf: 'center',
  },
  btn: {
    height: 52,
    backgroundColor: '#511D68',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  alternatives: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  divide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  divideLine: {
    width: '40%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#511D68',
  },
  divideText: {
    fontSize: 12,
    color: '#511D68',
    marginLeft: 5,
    marginRight: 5,
  },
  btnGoogle: {
    height: 52,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#511D68',
    borderWidth: 1,
  },
  textGoogle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#A5A5A5',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#511D68',
  },
});