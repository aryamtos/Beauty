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
import BookingComponent from "../components/BookingComponent";

export default function ListAgendamentos({ navigation }) {
  const [agendas, setAgendas] = useState([]);
  const [isDateHandled, setIsDateHandled] = useState(false);

  useEffect(() => {
    async function handleInit() {
      setIsDateHandled(false);
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);

      const response = await api.get("/bookings", {
        headers: {
          user_id: user._id,
        },
      });

      setAgendas(response.data.bookings);
    }

    handleInit();
  }, []);

  /**
   * Evento engatilhado sempre que sessions atualiza
   * para formatar as datas a serem exibidas
   */
  useEffect(() => {
    if (!isDateHandled) {
      async function handleDates() {
        var newBookings = [];

        if (agendas && agendas.length > 0) {
          for (let booking of agendas) {
            // Formatando as datas de criação de atualização
            let bookingDate = new Date(booking.date);
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

            // Inserindo o novo formato no array genérico
            newBookings.push({
              _id: booking._id,
              date: dateString,
              nameService: booking.nameService,
              service: booking.service,
            });
          }

          // Pondo os dados do array genérico no array original
          setAgendas(newBookings);
          setIsDateHandled(true);
        }
      }
      // Formatando as datas
      handleDates();
      //console.log(agendas);
    }
  }, [agendas]);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Seus agendamentos</Text>
      {isDateHandled === true && (
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
      )}
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
