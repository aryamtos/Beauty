import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  SafeAreaView,
  Alert,
  TextInput,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import socketio from "socket.io-client";

import GlobalStyles from "../assets/GlobalStyles";
import lupa from "../assets/BUSCAR_cinza.png";
import logoLoja from "../assets/logo_loja.jpg";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../services/api";

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);

    const response = await api.put(`/user/register/${user._id}`, {
      email,
      senha,
      nome,
      telefone,
    });

    if (response.data) {
      navigation.goBack();
      Alert.alert("Atualizado com sucesso!");
    }
  }

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formTop}></View>
          <TextInput
            style={styles.Input}
            placeholder="NOME"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="words"
            autoCorrect={false}
            value={nome}
            onChangeText={(nome) => setNome(nome)}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="TELEFONE"
            placeholderTextColor="#A5A5A5"
            autoCorrect={false}
            value={telefone}
            onChangeText={(telefone) => setTelefone(telefone)}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="E-MAIL"
            placeholderTextColor="#A5A5A5"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(email) => setEmail(email)}
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
            onChangeText={(senha) => setSenha(senha)}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="CONFIRMAR SENHA"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={confirmacao}
            onChangeText={(confirmacao) => setConfirmacao(confirmacao)}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Atualizar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
    marginBottom: -2,
  },
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginBottom: 30,
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
  },
  formTop: {
    borderTopWidth: 1,
    borderColor: "#BDAAC6",
  },
  Input: {
    backgroundColor: "#fff",
    fontSize: 15,
    padding: 10,
    textAlign: "center",
    borderColor: "#BDAAC6",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  borderContainer: {
    backgroundColor: "#fff",
    borderColor: "#BDAAC6",
    borderWidth: 0,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  border: {
    width: "90%",
    borderColor: "#BDAAC6",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    alignSelf: "center",
  },
  btn: {
    height: 52,
    backgroundColor: "#511D68",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  alternatives: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
  },
  divide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  divideLine: {
    width: "40%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#511D68",
  },
  divideText: {
    fontSize: 12,
    color: "#511D68",
    marginLeft: 5,
    marginRight: 5,
  },
  btnGoogle: {
    height: 52,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#511D68",
    borderWidth: 1,
  },
  textGoogle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#A5A5A5",
  },
});
