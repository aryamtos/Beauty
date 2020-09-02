import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { Icon } from "react-native-elements";

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
          const moment = new Date().getTime();
          for (let booking of agendas) {
            // Formatando as datas de criação de atualização
            let bookingDate = new Date(booking.date);
            /**
             * ---------------------------------------------
             *    Filtro
             * ---------------------------------------------
             *
             *  Como se trata de uma página que irá listar
             *  os agendamentos do usuário, é bom mostrar
             *  somente aqueles que ainda não passaram da
             *  data, sobre os agendamentos que já foram,
             *  deixamos com a página de histórico.
             */
            var isDateValid = bookingDate.getTime() >= moment;
            if (isDateValid) {
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
                isApproved: booking.isApproved,
                wasCanceled: booking.wasCanceled,
              });
            }
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

  async function handleCancelVerify(id) {
    Alert.alert(
      "Cancelamento",
      "Tem certeza de que deseja cancelar o agendamento?",
      [{ text: "Não" }, { text: "Sim", onPress: () => handleCancel(id) }]
    );
  }

  async function handleCancel(id) {
    const response = await api.put(`/bookings/${id}`, { wasCanceled: true });

    if (response.data) {
      Alert.alert("Sucesso!", "Seu agendamento foi cancelado");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Seus agendamentos</Text>
      {isDateHandled === true && (
        <FlatList
          data={agendas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <>
              {!item.wasCanceled && (
                <TouchableOpacity style={styles.listItem}>
                  <View>
                    <Text style={styles.listName}>{item.nameService}</Text>
                    <Text style={styles.listDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.listStatus}>
                    {item.isApproved ? "Aprovado" : "Pendente"}
                  </Text>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => handleCancelVerify(item._id)}
                  >
                    <Icon
                      name="times"
                      size={30}
                      type="font-awesome"
                      color="#511D68"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            </>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#511D68",
  },
  listDate: {
    fontSize: 16,
    color: "#777",
  },
  cancelBtn: {
    padding: 5,
  },
  listStatus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#777",
  },
});
