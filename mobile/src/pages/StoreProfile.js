import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
  AsyncStorage,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import StoreServices from "../pages/StoreServices";
import StoreDetails from "../pages/StoreDetails";
import StoreEmployees from "../pages/StoreEmployees";
import { createStackNavigator, createAppContainer } from "react-navigation";

import barba from "../assets/barba.png";
import api from "../services/api";

const TopTab = createMaterialTopTabNavigator();

function StoreNav() {
  const route = useRoute();
  const [date, setDate] = useState("");
  const [tipos, setTipos] = useState([]);
  // const servico = route.params;
  const servico = route.params.servico;

  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: "#511D68",
        inactiveTintColor: "#A8A8A8",
        indicatorStyle: {
          backgroundColor: "#511D68",
        },
        labelStyle: {
          fontSize: 11,
        },
      }}
    >
      <TopTab.Screen
        name="SERVIÇOS"
        initialParams={route.params}
        component={StoreServices}
      />
      <TopTab.Screen
        name="DETALHES"
        initialParams={route.params}
        component={StoreDetails}
      />
      <TopTab.Screen
        name="PROFISSIONAIS"
        initialParams={route.params}
        component={StoreEmployees}
      />
    </TopTab.Navigator>
  );
}

export default function StoreProfile({ navigation }) {
  const route = useRoute();
  const [date, setDate] = useState("");
  const [tipos, setTipos] = useState([]);
  const servico = route.params.servico;

  async function handleSubmit() {
    const response = await api.get(`/service/${servico._id}`);
    setDate(response.data);

    //console.log(response.data)
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <ImageBackground style={styles.resultHeader}>
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.8)"]}
          style={styles.gradient}
        ></LinearGradient>
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.resultData}>
          <Text style={styles.resultNameText}>
            {servico.user.interpriseName}
          </Text>
          <Text style={styles.resultText}>{servico.user.adress}</Text>
          <View style={styles.resultDataRate}>
            <Icon
              name="star-o"
              type="font-awesome"
              size={12}
              style={{ marginTop: 2, marginRight: 2 }}
            />
            <Text style={styles.resultText}>4,0</Text>
            <Text style={styles.resultText}>{servico.user.category}</Text>
          </View>
        </View>
        <StoreNav />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  resultHeader: {
    height: 92,
    resizeMode: "contain",
    alignSelf: "stretch",
    marginTop: StatusBar.currentHeight,
  },
  gradient: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  resultData: {
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginLeft: 30,
    marginTop: 15,
    width: "100%",
  },
  resultNameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#999",
  },
  resultText: {
    fontSize: 12,
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



*/
