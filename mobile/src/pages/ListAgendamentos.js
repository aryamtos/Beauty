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

      setAgendas(response.data);
    }

    handleInit();
  }, []);

  /**
   * Evento engatilhado sempre que sessions atualiza
   * para formatar as datas a serem exibidas
   */
  useEffect(() => {
    async function handleDates() {
      var newBookings = [];

      if (agendas && agendas.length > 0) {
        for (let booking of agendas) {
          // Formatando as datas de criação de atualização
          let date = booking.date.split("T");
          let year = reverseDate(date[0].split(/-(.+)/)[1]);
          let hours = handleHours(date[1].split(".")[0]);
          date = [year, " ", hours].join("");

          // Inserindo o novo formato no array genérico
          newBookings.push({
            date: date,
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
  }, [agendas]);

  /**
   * Função que inverte mès/dia para dia/mês
   * @param {string} date
   */
  function reverseDate(date) {
    if (date) {
      const splittedDate = date.split("-");
      splittedDate.reverse();
      const newDate = splittedDate.join("/");
      return newDate;
    }
  }

  /**
   * Função que corta as horas de HH:MM:SS para HH:MM
   * @param {string} hours
   */
  function handleHours(hours) {
    const splittedHour = hours.split(":");
    const newHour = splittedHour.slice(0, 2).join(":");

    return newHour;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Seus agendamentos</Text>
      {isDateHandled && (
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
