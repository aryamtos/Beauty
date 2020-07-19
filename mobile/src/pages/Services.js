import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import api from "../services/api";

export default function Services() {
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    async function handleInit() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      const token = await AsyncStorage.getItem("token");

      try {
        const response = await api.get("/partner/service/index", {
          headers: { user_id: user._id, token_access: token },
        });

        if (response.data) {
          const nameList = response.data;
          setNameList(nameList);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleInit();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Seus serviços</Text>
      <FlatList
        data={nameList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ListItem
            style={styles.listItem}
            leftAvatar={{ source: { uri: item.foto_url } }}
            title={`${item.nomeService}`}
            subtitle={`${item.parte}`}
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
