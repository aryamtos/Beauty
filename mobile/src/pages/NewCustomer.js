import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import logo from "../assets/bmlogo.png";

import api from "../services/api";

export default function NewCustomer({ navigation }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setConfirmacao] = useState("");

  async function handleSubmit() {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await api.post(
        "/user/register",
        {
          nome,
          cpf,
          telefone: phone,
          email,
          senha,
          senhaConfirmacao,
        },
        {
          headers: {
            partner_id: user._id,
          },
        }
      );

      if (response.data) {
        Alert.alert("Cadastrado com sucesso!");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Novo cliente</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.Input}
          placeholder="NOME"
          placeholderTextColor="#A5A5A5"
          autoCapitalize="words"
          autoCorrect={false}
          value={nome}
          onChangeText={setNome}
        />
        <View style={styles.borderContainer}>
          <View style={styles.border}></View>
        </View>
        <TextInput
          style={styles.Input}
          placeholder="CPF"
          placeholderTextColor="#A5A5A5"
          autoCorrect={false}
          value={cpf}
          onChangeText={setCpf}
        />
        <View style={styles.borderContainer}>
          <View style={styles.border}></View>
        </View>
        <TextInput
          style={styles.Input}
          placeholder="TELEFONE"
          placeholderTextColor="#A5A5A5"
          autoCorrect={false}
          value={phone}
          onChangeText={setPhone}
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
          onChangeText={setEmail}
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
          onChangeText={setSenha}
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
          value={senhaConfirmacao}
          onChangeText={setConfirmacao}
        />
        <View style={styles.borderContainer}>
          <View style={styles.border}></View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontWeight: "normal",
    color: "#511D68",
  },
  logo: {
    height: 30,
    resizeMode: "contain",
    marginRight: 5,
  },
  btn: {
    height: 42,
    backgroundColor: "#511D68",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#fff",
    paddingHorizontal: 55,
  },
  Input: {
    backgroundColor: "#fff",
    fontSize: 15,
    padding: 10,
    textAlign: "center",
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
});
