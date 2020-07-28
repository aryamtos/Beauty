import React, { useState, useEffect } from "react";
//import socketio from 'socket.io-client';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../services/api";
import BookingComponent from "../components/BookingComponent";

export default function StoreServices({ navigation }) {
  const route = useRoute();
  const [categoria, setCategoria] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [date, setDate] = useState("");
  const [services, setServices] = useState([]);
  const servico = route.params.servico;

  useEffect(() => {
    async function handleInit() {
      const token = await AsyncStorage.getItem("token");

      try {
        const response = await api.get("/partner/service/index", {
          headers: { user_id: servico._id, token_access: token },
        });

        if (response.data) {
          setServices(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleInit();
  }, []);

  async function handleSubmit() {
    navigation.navigate("BookRequest");
  }

  /*function handleNavigate(_id,servicos,user) {
        navigation.navigate('BookRequest', {_id,servicos,user});
    }*/
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Serviço</Text>
      </TouchableOpacity>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.service}>
            <View style={styles.leftSide}>
              <Text style={styles.serviceBoldText}>{item.nomeService}</Text>
              <Text style={styles.serviceNormalText}>{item.parte}</Text>
              <Text style={styles.serviceNormalText}></Text>
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.servicePrice}>R${item.preco}</Text>
              <Text style={styles.servicePrice}>{item.tempo} min</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
//servico._id,servico.servicos._id,servico.user   <TouchableOpacity onPress={() => handleNavigate()} style={styles.button}>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  service: {
    flexDirection: "row",
    alignSelf: "stretch",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serviceBoldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#747474",
  },
  serviceNormalText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#A5A5A5",
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#747474",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  leftSide: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  rightSide: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  button: {
    height: 32,
    backgroundColor: "#483D8B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15,
    marginBottom: 15,
  },
});
