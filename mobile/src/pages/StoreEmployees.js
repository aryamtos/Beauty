import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../services/api";

export default function StoreEmployees({ navigation }) {
  const [professionals, setProfessionals] = useState([]);
  const route = useRoute();

  useEffect(() => {
    async function handleInit() {
      if (route) {
        const service = route.params.servico;

        try {
          const response = await api.get(`/professional/${service._id}`);
          if (response) {
            setProfessionals(response.data.professionals);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    handleInit();
  }, []);

  return (
    <View style={styles.container}>
      {professionals.map((professional) => (
        <View key={professional.name} style={styles.profContainer}>
          <Text style={styles.profName}>{professional.name}</Text>
          <Text style={styles.profFunction}>
            {professional.professionalFunction}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  profContainer: {
    marginBottom: 10,
  },
  profName: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#511D68",
  },
  profFunction: {
    fontSize: 14,
    color: "#777",
    paddingLeft: 10,
  },
});
