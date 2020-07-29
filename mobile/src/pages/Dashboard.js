import React, { useState, useEffect, Component } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import lupa from "../assets/BUSCAR_cinza.png";
import corte from "../assets/cabelo.png";
import barba from "../assets/barba.png";
import depila from "../assets/depil.png";
import manicure from "../assets/manicure.png";

// API
import api from "../services/api";

export default function Dashboard({ navigation }) {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [nomeService, setNomeService] = useState("");

  useEffect(() => {
    async function handleInit() {
      /**
       * ---------------------------------------
       * Pegando o objeto de usuário e seu token
       * ---------------------------------------
       *
       * O user estou pegando somente para fins
       * de teste, mas o único a ser usado será
       * provavelmente o token
       */
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");

        await api.get("/dashboard", {
          headers: { token_access: token },
        });

        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
      }
    }

    handleInit();
  }, []);

  useEffect(() => {
    if (isTokenValid === false) {
      navigation.navigate("Login");
    }
  }, [isTokenValid]);

  const route = useRoute();
  const [categoriaServico, setCategoria] = useState([]);

  async function handleSearchable() {
    navigation.navigate("Services");
  }
  async function handleNavigation(type) {
    navigation.navigate("CategoryPage", { screen: "Início", params: { type } });
  }

  async function handleSubmit() {
    await AsyncStorage.setItem("nomeService", nomeService);

    navigation.navigate("SearchResult");
  }

  return (
    <>
      {isTokenValid ? (
        <View style={styles.container}>
          <View style={styles.busca}>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnLupa}>
              <Image source={lupa} style={styles.buscaIcon} />
            </TouchableOpacity>
            <TextInput
              style={styles.buscaText}
              placeholder="Buscar serviços ou estabelecimentos"
              value={nomeService}
              onChangeText={setNomeService}
              onSubmitEditing={handleSubmit}
            />
          </View>
          <Text style={styles.containerText}>Categorias</Text>
          <TouchableOpacity
            onPress={() => handleNavigation("Cabelo")}
            style={styles.categoria}
          >
            <ImageBackground source={corte} style={styles.categoriaImage}>
              <LinearGradient
                colors={["transparent", "white"]}
                style={styles.gradientEffect}
              >
                <Text style={styles.categoriaText}>Corte</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigation("Rosto")}
            style={styles.categoria}
          >
            <ImageBackground source={barba} style={styles.categoriaImage}>
              <LinearGradient
                colors={["transparent", "white"]}
                style={styles.gradientEffect}
              >
                <Text style={styles.categoriaText}>Barba</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigation("Depilação")}
            style={styles.categoria}
          >
            <ImageBackground source={depila} style={styles.categoriaImage}>
              <LinearGradient
                colors={["transparent", "white"]}
                style={styles.gradientEffect}
              >
                <Text style={styles.categoriaText}>Depilação</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigation("Manicure e pedicure")}
            style={styles.categoria}
          >
            <ImageBackground source={manicure} style={styles.categoriaImage}>
              <LinearGradient
                colors={["transparent", "white"]}
                style={styles.gradientEffect}
              >
                <Text style={styles.categoriaText}>Manicure</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  containerText: {
    fontSize: 14,
    color: "#aaa",
    paddingVertical: 10,
  },
  busca: {
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  buscaIcon: {
    height: 20,
    resizeMode: "contain",
    padding: 0,
    margin: -40,
  },
  btnLupa: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  buscaText: {
    fontSize: 14,
    color: "#444",
    padding: 0,
  },
  categoria: {
    alignSelf: "stretch",
    alignItems: "center",
    marginBottom: 10,
  },
  categoriaImage: {
    flexDirection: "row",
    alignSelf: "stretch",
    height: 90,
    resizeMode: "contain",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  categoriaText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#511D68",
    padding: 10,
  },
  gradientEffect: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
});
