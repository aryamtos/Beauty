import React, { useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import background from "../assets/fundo2.png";
import logo from "../assets/beautymenu1.png";
import { TextInput } from "react-native-gesture-handler";

import registerForPushNotifications from "../services/registerForPushNotifications";

import api from "../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Erros de validação
  const [isFormIncorret, setIsFormIncorret] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    try {
      const response = await api.post("/authentification", {
        email,
        senha,
      });

      const { user } = response.data;
      const { token } = response.data;

      await AsyncStorage.removeItem("user");
      await AsyncStorage.setItem("user", JSON.stringify(user));
      //await AsyncStorage.setItem('@user',user)
      await AsyncStorage.setItem("token", token);

      const tokenResponse = await api.get("/tokens", {
        headers: {
          partner: user._id,
        },
      });

      if (tokenResponse.status === 204) {
        registerForPushNotifications(user._id, "partner");
      }

      setIsFormIncorret(false);
      navigation.navigate("PartnerDashboard");
    } catch (error) {
      console.log(error.response.data);
      setIsFormIncorret(true);
      setErrorMessage(error.response.data.validation[0].message);
    }
  }

  async function handleRegister() {
    navigation.navigate("PartnerRegister");
  }

  return (
    <ImageBackground source={background} style={styles.body}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
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
          {isFormIncorret && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>*{errorMessage}</Text>
            </View>
          )}
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
          <TouchableOpacity onPress={handleRegister} style={styles.btnRegister}>
            <Text style={styles.textRegister}>CADASTRAR MEU NEGÓCIO</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Forgot", { type: "partner" })}
            >
              <Text style={styles.footerText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
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
    height: 180,
    resizeMode: "contain",
    marginBottom: 50,
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
  btnRegister: {
    height: 52,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#511D68",
    borderWidth: 1,
  },
  textRegister: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#A5A5A5",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#511D68",
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
