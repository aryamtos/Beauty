import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon, ListItem } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import logo from "../assets/bmlogo.png";
import api from "../services/api";

export default function Customers({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useFocusEffect(() => {
    async function handleInit() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      const token = await AsyncStorage.getItem("token");

      const customers = [];

      const response = await api.get(`/partner/${user._id}`, {
        headers: {
          token_access: token,
        },
      });

      if (response.data) {
        for (let customer of response.data.customers) {
          customers.push(customer);
        }

        setCustomers(customers);
        if (customers.length > 0) {
          setIsLoaded(true);
        }
      }
    }

    handleInit();
  }, []);

  function handleNavigation() {
    navigation.navigate("NewCustomer");
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Clientes</Text>
      </View>
      <View style={styles.container}>
        {isLoaded && (
          <FlatList
            style={styles.list}
            data={customers}
            keyExtractor={(customer) => customer._id}
            renderItem={({ item }) => (
              <>
                {isLoaded && (
                  <TouchableOpacity style={styles.customerContainer}>
                    <Icon
                      name="circle-o"
                      type="font-awesome"
                      size={25}
                      color={"#ccc"}
                      style={{ marginTop: 8, marginRight: 10 }}
                    />
                    <Text style={styles.customerName}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
            ListEmptyComponent={() => (
              <Text>Você não tem clientes cadastrados</Text>
            )}
          />
        )}
        <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
          <Text style={styles.btnText}>NOVO CLIENTE</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  header: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontWeight: "normal",
    color: "#511D68",
  },
  logo: {
    height: 30,
    resizeMode: "contain",
    marginRight: 5,
  },
  btn: {
    height: 42,
    backgroundColor: "#511D68",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#fff",
    paddingHorizontal: 55,
  },
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  customerContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    height: 42,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#999",
    alignSelf: "center",
  },
});
