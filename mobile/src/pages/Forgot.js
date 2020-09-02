import React, { useState, useEffect } from "react";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";

import api from "../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const route = useRoute();

  // Erros de validação
  const [isFormIncorret, setIsFormIncorret] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    try {
      const response = await api.post("/password-reset", {
        email,
        type: route.params.type,
      });

      if (response.status === 200) {
        Alert.alert(
          "Sucesso!",
          "Enviamos um E-Mail para que possa redefinir sua senha."
        );
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Erro!", "Não foi possível enviar o E-Mail no momento.");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.bodyText}>
        Nos informe seu endereço de E-Mail e lhe enviaremos uma mensagem para
        que possa recuperar sua conta.
      </Text>
      <View style={styles.form}>
        <View style={styles.formTop}></View>
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
        {isFormIncorret && (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>*{errorMessage}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>ENVIAR</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 30,
    marginBottom: -2,
  },
  bodyText: {
    fontSize: 20,
    color: "#511D68",
    textAlign: "justify",
    marginBottom: 20,
  },
  form: {
    alignSelf: "stretch",
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
