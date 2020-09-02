import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Rating, AirbnbRating } from 'react-native-ratings';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { ListItem } from "react-native-elements";

import api from "../services/api";
import BookingComponent from "../components/BookingComponent";

/**
 * -----------------------------------------------
 *    Atenção
 * -----------------------------------------------
 *
 *  O presente arquivo é uma "cópia" do component
 *  ListAgendamentos, se algum comentário estiver
 *  aparentemente fora de contexto, eis o motivo.
 */
export default function ListAgendamentos({ navigation }) {
  const [agendas, setAgendas] = useState([]);
  const [isDateHandled, setIsDateHandled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemId, setItemId] = useState();  
  const [rating, setRating] = useState();
  


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
             *  o histórico do usuário, é bom mostrar
             *  somente aqueles que ainda já passaram da
             *  data, sobre os agendamentos que não vieram,
             *  deixamos com a página de listagem.
             */
            var isDateValid = bookingDate.getTime() < moment;
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

  async function modalActivate(itemId) {
    setModalVisible(!modalVisible)
    setItemId(itemId)
  }

  async function handleSubmit() {

    try {
      const response = await api.post(
        `/rating`,
        {
          rate: rating,
          booking_id: itemId
        }
      );

      Alert.alert("Sucesso!", "Avaliação enviada");
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }


  
  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Avalie o Estabelecimento!</Text>
 
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={3}
              size={40}
              onFinishRating={setRating}
            />

            <TouchableHighlight
              style={ styles.button }
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Avaliar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={ styles.cancelButton }
              onPress={() => { setModalVisible(!modalVisible); }}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Text style={styles.containerTitle}>Seu histórico</Text>

      {isDateHandled === true && (
        <FlatList
          data={agendas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (

            <TouchableHighlight
              onPress={() => {
                modalActivate(item._id);
              }}>
              <ListItem
                style={styles.listItem}
                title={`${item.nameService}`}
                subtitle={`${item.date}`}
              />
            </TouchableHighlight>

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
  button: {
    height: 42,
    width: 170,
    marginTop: 10,
    backgroundColor: "#483D8B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    height: 42,
    width: 170,
    marginTop: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
