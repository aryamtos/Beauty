import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  Image,
  SafeAreaView,
  Alert,
  TextInput,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import GlobalStyles from "../assets/GlobalStyles";
import lupa from "../assets/BUSCAR_cinza.png";
import logoLoja from "../assets/logo_loja.jpg";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../services/api";

//import ServiceList from '../components/ServiceList';x'

//import { Container, Title, Button, ButtonText, ProductList } from './styles';

export default function BookRequest({ navigation }) {
  const route = useRoute();
  const [date, setDate] = useState("");
  const service_id = route.params._id;
  //const user_id = servico.user;
  //console.log(user_id)
  async function handleSubmit() {
    /**
     * -----------------------------------------
     *    Pegando user do AsyncStorage
     * -----------------------------------------
     *
     * Como você usou stringify na hora de arma-
     * zenar o user, essa string precisa ser
     * formatada para um JSON novamente, então
     * se usa o JSON.parse() :)
     */
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    const user_id = user._id;

    console.log(service_id);

    try {
      await api.post(
        `/service/${service_id}/bookings`,
        {
          date,
        },
        {
          headers: { "Content-Type": "application/json", user_id: user_id },
        }
      );
    } catch (error) {
      console.log(error);
    }

    Alert.alert("Solicitação de serviço enviada;");

    navigation.navigate("StoreProfile");
  }
  function handleCancel() {
    navigation.navigate("StoreProfile");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancelar </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
/*
 <SafeAreaView style={[GlobalStyles.droidSafeArea, styles.container]} >*/

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: 50,
    marginTop: StatusBar.currentHeight,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: "#483D8B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },

  cancelButton: {
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});