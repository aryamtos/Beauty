import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import background from "../assets/fundo2.png";
import logo from "../assets/beautymenu0.png";
import { TextInput } from "react-native-gesture-handler";
import api from "../services/api";

export default function PartnerRegister({ navigation }) {
  const [responsibleName, setResponsibleName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // Erros de validação
  const [isFormIncorret, setIsFormIncorret] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    if (senha !== confirmaSenha) {
      setIsFormIncorret(true);
      setErrorMessage("As senhas devem ser iguais");
      return;
    }

    try {
      const response = await api.post("/partner/register", {
        responsibleName,
        cpf,
        phone,
        category,
        address,
        neighborhood,
        city,
        enterpriseName,
        email,
        senha,
        senhaConfirmacao: confirmaSenha,
      });

      if (category === "Autônomo") {
        await WebBrowser.openBrowserAsync("http://pag.ae/7W6ds4vuo");
      } else {
        await WebBrowser.openBrowserAsync("http://pag.ae/7W8s7gr9n");
      }

      Alert.alert("Sucesso!", "Sua conta foi cadastrada.");
      navigation.navigate("Index");
    } catch (error) {
      setIsFormIncorret(true);
      setErrorMessage(error.response.data.validation[0].message);
    }
  }

  return (
    <ImageBackground source={background} style={styles.body}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.form}>
          <View style={styles.formTop}></View>
          <TextInput
            style={styles.Input}
            placeholder="Responsável"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="words"
            autoCorrect={false}
            value={responsibleName}
            onChangeText={setResponsibleName}
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
            placeholder="Nome da Empresa"
            placeholderTextColor="#A5A5A5"
            autoCorrect={false}
            value={enterpriseName}
            onChangeText={setEnterpriseName}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Categoria"
            placeholderTextColor="#A5A5A5"
            autoCorrect={false}
            value={category}
            onChangeText={setCategory}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Endereço"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="words"
            autoCorrect={false}
            value={address}
            onChangeText={setAddress}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Bairro"
            placeholderTextColor="#A5A5A5"
            autoCorrect={false}
            autoCapitalize="words"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Cidade"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="words"
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
          />
          <View style={styles.borderContainer}>
            <View style={styles.border}></View>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Telefone"
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
            placeholder="E-Mail"
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
            placeholder="Senha"
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
            placeholder="Confirmar senha"
            placeholderTextColor="#A5A5A5"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={confirmaSenha}
            onChangeText={setConfirmaSenha}
          />
          {isFormIncorret && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>*{errorMessage}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
  errorMessageContainer: {
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#BDAAC6",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#f00",
  },
});
