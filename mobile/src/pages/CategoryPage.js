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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import GlobalStyles from "../assets/GlobalStyles";
import lupa from "../assets/BUSCAR_cinza.png";
import logoLoja from "../assets/logo_loja.jpg";
import PropTypes from "prop-types";

import api from "../services/api";

export default function CategoryPage({ navigation }) {
  const route = useRoute();
  const [servicos, setServicos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const servico = route.params;
  //console.log(servico._id)

  useEffect(() => {
    async function loadProducts() {
      const { type } = route.params;
      const token = await AsyncStorage.getItem("token");
      const response = await api.get("/partner/service/showuservices", {
        params: { type },
      });
      let servicos = response.data;

      for (let servico of servicos) {
        const user = await api.get(`/partner/${servico.user}`, {
          headers: {
            token_access: token,
          },
        });

        servico.user = user.data;
      }

      setServicos(servicos);
    }

    loadProducts();
  }, []);

  function handleNavigate(servico) {
    navigation.navigate("StoreProfile", { servico });
  }
  //renderListItem = ({ item }) => <ProductItem product={item} />

  return (
    <View style={styles.container}>
      <View style={styles.busca}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
          style={styles.btnLupa}
        >
          <Image source={lupa} style={styles.buscaIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.buscaText}
          placeholder="Buscar serviços ou estabelecimentos"
          onSubmitEditing={() => {
            navigation.navigate("Search");
          }}
        />
      </View>
      <Text style={styles.containerText}>Estabelecimentos encontrados</Text>
      <FlatList
        style={styles.list}
        data={servicos}
        keyExtractor={(servico) => String(servico._id)}
        //horizontal
        showsVerticalScrollIndicator={false}
        renderItem={({ item: servico }) => (
          <ScrollView>
            <Image style={styles.thumbnail}></Image>
            <TouchableOpacity
              onPress={() => handleNavigate(servico)}
              style={styles.result}
            >
              <View style={styles.resultData}>
                <Text style={styles.resultNameText}>
                  {servico.user.enterpriseName}
                </Text>
                <View style={styles.resultDataRate}></View>
                <Text style={styles.resultText}>{servico.user.category}</Text>
                <Text style={styles.resultText}>
                  {servico.user.address}. {servico.user.neighborhood},{" "}
                  {servico.user.city}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    </View>
  );
}
/*
 <SafeAreaView style={[GlobalStyles.droidSafeArea, styles.container]} >*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
    paddingTop: 30,
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
    marginBottom: 10,
  },
  listItem: {
    marginRight: 15,
  },
  buscaIcon: {
    height: 20,
    resizeMode: "contain",
    padding: 0,
    margin: -40,
  },
  list: {
    paddingHorizontal: 20,
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
  result: {
    flexDirection: "row",
    marginBottom: 10,
  },
  thumbnail: {
    flexDirection: "row",
    alignSelf: "stretch",
    height: 90,
    resizeMode: "contain",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    /*
    width:200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,*/
    /*
    height: 90,
    resizeMode: 'contain',
    marginRight: 10,*/
    /*width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2*/
  },
  resultData: {
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: "100%",
  },
  resultNameText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#999",
  },
  resultText: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#999",
    marginRight: 15,
  },
  resultDataRate: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

/*
 source={{ uri: servico.foto_url }}


*/
