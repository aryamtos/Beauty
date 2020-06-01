import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

import logo from '../assets/beautymenu2.png';
import background from '../assets/FUNDO.png';

export default function App({ navigation }) {
    async function handleLogin() {
        navigation.navigate('Login');
    }

    async function handleRegister() {
        navigation.navigate('Register');
    }

    async function handlePartner() {
        navigation.navigate('PartnerLogin');
    }

    return (
      <ImageBackground source={background} style={styles.body}>
        <View style={styles.container}>
          <Image source={logo} style={styles.image}/>
          <TouchableOpacity onPress={handleLogin} style={styles.btn}><Text style={styles.btnText}>LOGIN</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleRegister} style={styles.btn}><Text style={styles.btnText}>CRIAR CONTA</Text></TouchableOpacity>
          <TouchableOpacity onPress={handlePartner} style={[styles.btn, styles.btnPartner]}><Text style={styles.btnPartnerText}>sou parceiro</Text></TouchableOpacity>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    marginBottom: -2,
  },
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  image: {
      height: 180,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: 100,
  },
  btn: {
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnPartner: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#66397A',
    fontWeight: 'bold',
  },
  btnPartnerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
});
