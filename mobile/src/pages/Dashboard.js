import React, { useState, useEffect, Component } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  StatusBar,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import lupa from "../assets/BUSCAR_cinza.png";
import corte from "../assets/cabelo.png";
import barba from "../assets/barba.png";
import depila from "../assets/depil.png";
import manicure from "../assets/manicure.png";
import estetica from "../assets/estetica.png";
import spaday from "../assets/spaday.png";
import crespas from "../assets/crespo.png";

import salaoImage from "../assets/salao.png";
import deliveryImage from "../assets/delivery.png";

// API
import api from "../services/api";

export default function Dashboard({ navigation }) {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [nomeService, setNomeService] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [wasTypeSet, setWasTypeSet] = useState(false);

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

  useEffect(() => {
    if (serviceType !== "") {
      setWasTypeSet(true);
    }
  }, [serviceType]);

  const route = useRoute();

  async function handleSearchable() {
    navigation.navigate("Services");
  }
  async function handleNavigation(type) {
    navigation.navigate("CategoryPage", {
      screen: "Início",
      params: { type, serviceType },
    });
  }

  async function handleSubmit() {
    await AsyncStorage.setItem("nomeService", nomeService);

    navigation.navigate("SearchResult");
  }

  async function handleServiceType(typeOfService) {
    setServiceType(typeOfService);
    console.log(serviceType);
    await AsyncStorage.setItem("serviceType", typeOfService);
  }

  return (
    <>
      {isTokenValid ? (
        <View style={styles.container}>
          {wasTypeSet ? (
            <>
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => handleNavigation("Cabelo")}
                  style={styles.categoria}
                >
                  <ImageBackground source={corte} style={styles.categoriaImage}>
                    <LinearGradient
                      colors={["transparent", "white"]}
                      style={styles.gradientEffect}
                    >
                      <Text style={styles.categoriaText}>Cabelo</Text>
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
                  <ImageBackground
                    source={depila}
                    style={styles.categoriaImage}
                  >
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
                  <ImageBackground
                    source={manicure}
                    style={styles.categoriaImage}
                  >
                    <LinearGradient
                      colors={["transparent", "white"]}
                      style={styles.gradientEffect}
                    >
                      <Text style={styles.categoriaText}>
                        Manicure e Pedicure
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigation("Estética")}
                  style={styles.categoria}
                >
                  <ImageBackground
                    source={estetica}
                    style={styles.categoriaImage}
                  >
                    <LinearGradient
                      colors={["transparent", "white"]}
                      style={styles.gradientEffect}
                    >
                      <Text style={styles.categoriaText}>Estética</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigation("Spa day")}
                  style={styles.categoria}
                >
                  <ImageBackground
                    source={spaday}
                    style={styles.categoriaImage}
                  >
                    <LinearGradient
                      colors={["transparent", "white"]}
                      style={styles.gradientEffect}
                    >
                      <Text style={styles.categoriaText}>Spa day</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigation("Crespas e cacheadas")}
                  style={styles.categoria}
                >
                  <ImageBackground
                    source={crespas}
                    style={styles.categoriaImage}
                  >
                    <LinearGradient
                      colors={["transparent", "white"]}
                      style={styles.gradientEffect}
                    >
                      <Text style={styles.categoriaText}>
                        Crespas e Cacheadas
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>
            </>
          ) : (
            <>
              <Text style={styles.typeTitle}>
                Que tipo de serviço você procura?
              </Text>
              <View style={styles.typesContainer}>
                <TouchableOpacity
                  style={styles.type}
                  onPress={() => handleServiceType("Salão")}
                >
                  <View style={styles.typeImageContainer}>
                    <Image source={salaoImage} style={styles.typeImage} />
                  </View>
                  <Text style={styles.typeText}>Salão</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.type}
                  onPress={() => handleServiceType("Autônomo")}
                >
                  <View style={styles.typeImageContainer}>
                    <Image source={deliveryImage} style={styles.typeImage} />
                  </View>
                  <Text style={styles.typeText}>Delivery de Beleza</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    marginTop: StatusBar.currentHeight + 40,
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
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  typeImageContainer: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    elevation: 10,
    marginBottom: 10,
  },
  typeImage: {
    alignSelf: "center",
    width: 100,
    resizeMode: "contain",
  },
  typeTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#511d68",
    marginBottom: 40,
  },
  type: {
    padding: 20,
    alignSelf: "center",
    width: 150,
    marginBottom: 20,
    justifyContent: "center",
  },
  typeText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "normal",
    color: "#511d68",
  },
  optionsContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btn: {
    padding: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#511D68",
  },
});
