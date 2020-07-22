import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import api from "../services/api";

export default function BusinessHours({ navigation }) {
  const [businessHours, setBusinessHours] = useState([]);

  useEffect(() => {
    async function handleInit() {
      try {
        let user = await AsyncStorage.getItem("user");
        /**
         * ----------
         *  brenu
         * ----------
         *  Lembra de colocar autenticação nas rotas
         *  de booking e businesshour, por favor.
         */
        let token = await AsyncStorage.getItem("token");
        //----------------------------------------------------------
        user = JSON.parse(user);

        const response = await api.get(`/businesshour`, {
          headers: {
            token_access: token,
            partner_id: user._id,
          },
        });

        setBusinessHours(response.data.businessHours);
      } catch (error) {
        console.log(error);
      }
    }

    handleInit();
  }, []);

  function handleNavigation() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {businessHours.map((businessHour) => (
          <View key={businessHour._id} style={styles.cardData}>
            <Text style={styles.cardText}>{businessHour.dia}</Text>
            <Text style={styles.cardText}>
              {businessHour.horaInicio} - {businessHour.horaFim}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
        <Text style={styles.btnText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  card: {
    alignSelf: "stretch",
    padding: 40,
    borderColor: "#A5A5A5",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardData: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderColor: "#DEDEDE",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 11,
    fontWeight: "normal",
    color: "#A3A3A3",
  },
  btn: {
    height: 42,
    backgroundColor: "#707070",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
