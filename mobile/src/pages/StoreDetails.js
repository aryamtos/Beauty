import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../services/api";
import { set } from "react-native-reanimated";

export default function StoreDetails() {
  const route = useRoute();
  const [categoria, setCategoria] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [date, setDate] = useState("");

  /**
   * -------------------------------------------
   *    Armazenando os detalhes em variáveis
   * -------------------------------------------
   *
   *  Chamar as informações requeridas usando
   *  servico.user.x não vai funcionar, porque
   *  o campo user contem somente o _id desse
   *  usuário, e não o usuário inteiro.
   */
  const [store, setStore] = useState({});
  const [businessHours, setBusinessHours] = useState([]);
  const servico = route.params.servico;

  /**
   * ------------------------------------
   *   Pegando as informações da loja
   * ------------------------------------
   */
  useEffect(() => {
    async function handleInit() {
      const service = route.params.servico;

      const token = await AsyncStorage.getItem("token");

      try {
        const response = await api.get(`/partner/${service.user}`, {
          headers: { token_access: token },
        });
        if (response.data) {
          setStore(response.data);
        }
      } catch (error) {
        console.log(error);
      }

      const response = await api.get("/businesshour", {
        headers: { partner_id: service.user },
      });

      if (response.data) {
        console.log(response.data);
        setBusinessHours(response.data.businessHours);
      }
    }

    handleInit();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.session}>
        <Text style={styles.sessionBoldText}>Sobre</Text>
        <Text style={styles.sessionNormalText}>{store.about}</Text>
      </View>
      <View style={styles.session}>
        <Text style={styles.sessionBoldText}>Endereço</Text>
        <Text style={styles.sessionNormalText}>{store.adress}</Text>
      </View>
      <View style={styles.session}>
        <Text style={styles.sessionBoldText}>Contato</Text>
        <Text style={styles.sessionNormalText}>E-Mail: {store.email}</Text>
        <Text style={styles.sessionNormalText}>Telefone: {store.phone}</Text>
      </View>
      <View style={styles.session}>
        <Text style={styles.sessionBoldText}>Horário de Funcionamento</Text>
        <View style={styles.hoursSession}>
          {businessHours.map((businessHour) => (
            <View key={businessHour.dia} style={styles.businessHourContainer}>
              <Text style={styles.sessionNormalText}>{businessHour.dia}</Text>
              <Text style={styles.sessionNormalText}>
                {businessHour.horaInicio} - {businessHour.horaFim}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  session: {
    flexDirection: "column",
    alignSelf: "stretch",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 10,
  },
  hoursSession: {
    flexDirection: "column",
  },
  businessHourContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "50%",
    marginLeft: 10,
  },
  sessionBoldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#747474",
  },
  sessionNormalText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#A5A5A5",
    marginLeft: 10,
  },
  sessionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#747474",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
});

/*

<View style={styles.session}>
                <Text style={styles.sessionBoldText}>Sobre</Text>
    <Text style={styles.sessionNormalText}>{servico.descricao}</Text>
            </View>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Endereço</Text>
    <Text style={styles.sessionNormalText}>{servico.address}</Text>
            </View>
            <View style={styles.session}>
                <Text style={styles.sessionBoldText}>Contato</Text>
    <Text style={styles.sessionNormalText}>{servico.user.email}</Text>
            </View>


*/
