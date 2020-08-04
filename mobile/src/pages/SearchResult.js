import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  View,
  StatusBar,
  VirtualizedList,
  AsyncStorage,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  TouchableOpacity,
  RectButton,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import lupa from "../assets/BUSCAR_cinza.png";
import logoLoja from "../assets/logo_loja.jpg";
import api from "../services/api";
import SpotList from "../components/SpotList";
import GlobalStyles from "../assets/GlobalStyles";

export default function SearchResult({ navigation }) {
  //const [nomeService, setNome] = useState([]);

  const [spots, settipo] = useState({});
  const [nome, setNome] = useState([]);
  const [showServices, setShowServices] = useState(true);
  const [showStores, setShowStores] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const nomeService = await AsyncStorage.getItem("nomeService");
      const neighborhood = await AsyncStorage.getItem("neighborhood");
      const city = await AsyncStorage.getItem("city");

      const response = await api.get(`/search`, {
        params: { nomeService, neighborhood, city },
      });
      settipo(response.data);
      setIsSearchDone(true);
    }
    loadCategories();
  }, []);

  function handleListShow(option) {
    switch (option) {
      case 1:
        setShowServices(true);
        setShowStores(false);
        break;
      case 2:
        setShowServices(false);
        setShowStores(true);
        break;
      default:
        break;
    }
  }

  async function handleNavigate(servico) {
    if (!servico.user) {
      navigation.navigate("StoreProfile", { servico });
    } else {
      navigation.navigate("StoreProfile", { servico: servico.user });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Resultados</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            showServices && { borderBottomColor: "#ccc", borderBottomWidth: 1 },
          ]}
          onPress={() => handleListShow(1)}
        >
          <Text style={styles.btnText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            showStores && { borderBottomColor: "#ccc", borderBottomWidth: 1 },
          ]}
          onPress={() => handleListShow(2)}
        >
          <Text style={styles.btnText}>Estabelecimentos</Text>
        </TouchableOpacity>
      </View>
      {isSearchDone && (
        <>
          {showServices && (
            <>
              {spots.services[0] ? (
                <FlatList
                  style={styles.list}
                  data={spots.services}
                  keyExtractor={(servico) => String(servico._id)}
                  //horizontal
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: servico }) => (
                    <ScrollView>
                      <TouchableOpacity onPress={() => handleNavigate(servico)}>
                        <Image
                          source={{ uri: servico.user.thumbnail_url }}
                          style={styles.thumbnail}
                        ></Image>
                        <View style={styles.resultData}>
                          <Text style={styles.resultNameText}>
                            {servico.nomeService}
                          </Text>
                          <View style={styles.resultDataRate}></View>
                          <Text style={styles.resultText}>
                            {servico.user.category}
                          </Text>
                          <Text style={styles.resultText}>
                            {servico.user.address}. {servico.user.neighborhood},{" "}
                            {servico.user.city}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                />
              ) : (
                <View style={styles.failContainer}>
                  <Text style={[styles.resultText, { fontSize: 14 }]}>
                    Não encontramos nenhum serviço :(
                  </Text>
                </View>
              )}
            </>
          )}
          {showStores && (
            <>
              {spots.stores[0] ? (
                <FlatList
                  style={styles.list}
                  data={spots.stores}
                  keyExtractor={(partner) => String(partner._id)}
                  //horizontal
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: partner }) => (
                    <ScrollView>
                      <TouchableOpacity onPress={() => handleNavigate(partner)}>
                        <Image
                          source={{ uri: partner.thumbnail_url }}
                          style={styles.thumbnail}
                        ></Image>
                        <View style={styles.resultData}>
                          <Text style={styles.resultNameText}>
                            {partner.enterpriseName}
                          </Text>
                          <View style={styles.resultDataRate}></View>
                          <Text style={styles.resultText}>
                            {partner.category}
                          </Text>
                          <Text style={styles.resultText}>
                            {partner.address}. {partner.neighborhood},{" "}
                            {partner.city}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                />
              ) : (
                <View style={styles.failContainer}>
                  <Text style={[styles.resultText, { fontSize: 14 }]}>
                    Não encontramos nenhum estabelecimento :(
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
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
  failContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
