import React, { useState, useEffect, Component } from "react";
import {
  Image,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import thumbnail from "../assets/perfil_.png";

export default function UserProfile({ navigation }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    async function handleInit() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);

      setUser(user);
    }

    handleInit();
  }, []);

  useEffect(() => {
    if (user && user.nome) {
      const name = user.nome.split(" ");

      setName(name[0]);
    }
  }, [user]);

  async function handleSubmit() {
    /*await api.post(`/service/${servico}/bookings`,{
             date
         },{
           headers:{user_id}
         })*/
  }
  useEffect(() => {
    handleSubmit();
  }, []);
  function handleNavigate() {
    navigation.navigate("ListAgendamentos");
  }

  function handlePerfil() {
    navigation.navigate("Profile");
  }
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source={thumbnail} style={styles.thumbnail} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.text}>Para o usuário</Text>
        <TouchableOpacity onPress={() => handleNavigate()} style={styles.btn}>
          <Text style={styles.btnText}>Seus agendamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePerfil()} style={styles.btn}>
          <Text style={styles.btnText}>Alterar Perfil</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#511D68",
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "rgba(255,255,255,0.5)",
  },
  text: {
    fontSize: 15,
    color: "#A5A5A5",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  thumbnail: {
    height: 120,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#66397A",
    marginLeft: 20,
  },
  btn: {
    height: 42,
    borderColor: "#BDAAC6",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#777",
  },
});
