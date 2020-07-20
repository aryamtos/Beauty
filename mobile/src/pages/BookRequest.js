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
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
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
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const service_id = route.params._id;

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setDate(selectedDate);
  };

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  function showDatepicker() {
    showMode("date");
  }

  function showTimepicker() {
    showMode("time");
  }

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
      <View>
        <RectButton style={styles.button} onPress={showDatepicker}>
          <Text style={styles.buttonText}>Data</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={showTimepicker}>
          <Text style={styles.buttonText}>Hora</Text>
        </RectButton>
      </View>
      {show && (
        <DateTimePicker
          mode={mode}
          value={date}
          is24Hour={true}
          onChange={onChange} // Use "en_GB" here
        />
      )}
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
    marginTop: StatusBar.currentHeight + 50,
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
