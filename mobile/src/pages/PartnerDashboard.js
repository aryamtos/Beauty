import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

import logo from "../assets/bmlogo_.png";

import api from "../services/api";

export default function PartnerDashboard({ navigation }) {
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  useEffect(() => {
    async function handleInit() {
      try {
        /**
         * -----------------------------------
         *   Vericiando veracidade do token
         * -----------------------------------
         */
        const token = await AsyncStorage.getItem("token");
        let user = await AsyncStorage.getItem("user");
        user = JSON.parse(user);

        await api.get("/dashboard", {
          headers: { token_access: token, user_id: user._id },
        });

        setIsTokenValid(true);
      } catch (error) {
        console.log(error);
        setIsTokenValid(false);
        return;
      }

      /**
       * ---------------------------------
       *    Separando o nome do usuário
       * ---------------------------------
       */
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      setName(user.responsibleName.split(" ")[0]);
      handleBookings();
    }

    handleInit();
  }, []);

  useEffect(() => {
    if (!isTokenValid) {
      navigation.navigate("PartnerLogin");
    }
  }, [isTokenValid]);

  function handleNavigation() {
    navigation.navigate("NewService");
  }

  async function handleBookings() {
    const token = await AsyncStorage.getItem("token");
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);

    const bookings = [];

    // Pegando todos os agendamentos
    const response = await api.get("/bookings", {
      headers: {
        token_access: token,
        partner_id: user._id,
      },
    });

    // Verificando somente os que são hoje
    const moment = new Date();
    for (let booking of response.data.bookings) {
      const bookingDate = new Date(booking.date);
      var isDateValid =
        bookingDate.getDate() === moment.getDate() &&
        bookingDate.getMonth() === moment.getMonth() &&
        bookingDate.getFullYear() === moment.getFullYear() &&
        bookingDate.getHours() >= moment.getHours() &&
        bookingDate.getMinutes() >= moment.getMinutes();
      if (isDateValid) {
        bookings.push(booking);
      }
    }

    /**
     * ---------------------------------------
     *    Repassando as datas
     * ---------------------------------------
     *
     *    Estou repassando o vetor bookings
     *    para essa outra função a fim de
     *    formatar as datas como strings
     *    para já as exibir corretamente
     */
    const result = await handleDates(bookings);
    setBookings(result);
    return;
  }

  // Função responsável por formatar datas
  async function handleDates(datesArray) {
    const bookings = [];
    for (let date of datesArray) {
      let bookingDate = new Date(date.date);
      let dateDay =
        bookingDate.getDate() >= 10
          ? bookingDate.getDate()
          : "0" + bookingDate.getDate();
      let dateMonth =
        bookingDate.getMonth() >= 10
          ? bookingDate.getMonth()
          : "0" + bookingDate.getMonth();
      let dateHour =
        bookingDate.getHours() >= 10
          ? bookingDate.getHours()
          : "0" + bookingDate.getHours();
      let dateMinute =
        bookingDate.getMinutes() >= 10
          ? bookingDate.getMinutes()
          : "0" + bookingDate.getMinutes();

      const dateString = `${dateDay}/${dateMonth} ${dateHour}:${dateMinute}`;

      bookings.push({
        _id: date._id,
        date: dateString,
        nameService: date.nameService,
        service: date.service,
      });
    }
    return bookings;
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Olá, {name}!</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>SEUS AGENDAMENTOS DE HOJE</Text>
        <FlatList
          style={styles.list}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={styles.item}
              titleStyle={styles.bookingTitle}
              subtitleStyle={styles.bookingHour}
              style={styles.listItem}
              title={`${item.nameService}`}
              subtitle={`${item.date}`}
            />
          )}
        />
        <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
          <Text style={styles.btnText}>NOVO ATENDIMENTO</Text>
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
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  header: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    flexDirection: "row",
    backgroundColor: "#511D68",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    color: "#511D68",
  },
  headerText: {
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "normal",
    color: "#fff",
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
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 0,
  },
  item: {
    paddingHorizontal: 0,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#511D68",
  },
  bookingHour: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#aaa",
  },
});
