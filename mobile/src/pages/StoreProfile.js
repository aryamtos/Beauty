import React, { useState, useEffect } from "react";
import {
  Image,
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
  const [rating, setRating] = useState();
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
  const [services, setServices] = useState([]);
  let servico = route.params.servico;

  useEffect(() => {
    async function handleInit() {
      const token = await AsyncStorage.getItem("token");

      try {
        const response = await api.get("/partner/service/index", {
          headers: { user_id: servico._id, token_access: token },
        });

        if (response.data) {
          setServices(response.data);
        }
      } catch (error) {
        console.log(error, error.response);
      }
    }

    handleInit();
  }, []);

  async function handleSubmit() {
    const response = await api.get(`/service/${servico._id}`);
    setDate(response.data);
  }

  // useEffect(() => {
  //   async function handleInfo() {
  //     const token = await AsyncStorage.getItem("token");

  //     const user = await api.get(`/partner/${servico.user._id}`, {
  //       headers: {
  //         token_access: token,
  //       },
  //     });

  //     servico.user = user.data;
  //   }
  //   handleInfo();
  //   handleSubmit();
  // }, []);

  return (
    <>
      <ImageBackground
        source={{ uri: servico.thumbnail_url }}
        style={styles.resultHeader}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.8)"]}
          style={styles.gradient}
        ></LinearGradient>
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.resultData}>
          <Text style={styles.resultNameText}>{servico.enterpriseName}</Text>
          <Text style={styles.resultText}>
            {servico.address}. {servico.neighborhood}, {servico.city}
          </Text>
          <View style={styles.resultDataRate}>
            <Icon
              name="star-o"
              type="font-awesome"
              size={12}
              style={{ marginTop: 2, marginRight: 2 }}
            />
            <Text style={styles.resultText}>
              {servico.evaluations > 0 ? servico.rate.toFixed(1) : "novo"}
            </Text>
            <Text style={styles.resultText}>{servico.category}</Text>
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
