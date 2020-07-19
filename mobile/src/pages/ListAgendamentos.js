import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ListItem } from "react-native-elements";

import api from "../services/api";

export default function ListAgendamentos({ navigation }) {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    async function handleInit() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);

      const response = await api.get("/bookings", {
        headers: {
          user_id: user._id,
        },
      });

      setAgendas(response.data);
    }

    handleInit();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Seus agendamentos</Text>
      <FlatList
        data={agendas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ListItem
            style={styles.listItem}
            title={`${item.nameService}`}
            subtitle={`${item.date}`}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight + 20,
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#511D68",
    marginLeft: 20,
    marginBottom: 20,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#eee",
  },
});
