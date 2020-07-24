import React, { useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { Icon } from "react-native-elements";

import logo from "../assets/bmlogo_.png";

import api from "../services/api";

export default function PartnerDashboard({ navigation }) {
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isDateHandled, setIsDateHandled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função que inicializa tudo
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

  // Chamando a função para inicializar
  useEffect(() => {
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
    for (let booking of response.data.bookings) {
      const moment = new Date();
      const bookingDate = new Date(booking.date);

      var isDateValid =
        bookingDate.getDate() === moment.getDate() &&
        bookingDate.getMonth() === moment.getMonth() &&
        bookingDate.getFullYear() === moment.getFullYear() &&
        (bookingDate.getHours() > moment.getHours() ||
          (bookingDate.getHours() === moment.getHours &&
            bookingDate.getMinutes() >= moment.getMinutes()));
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
    setIsDateHandled(true);
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
        isApproved: date.isApproved,
        wasCanceled: date.wasCanceled,
      });
    }
    return bookings;
  }

  /**
   * ---------------------------------------
   *    Cancelamento
   * ---------------------------------------
   *  Funções que lidam com o cancelamento
   *  de bookings previamente agendados
   */
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
    }
  }

  /**
   * ---------------------------------------
   *    Aprovação
   * ---------------------------------------
   *  Funções que lidam com a aprovação
   *  de bookings previamente agendados
   */
  async function handleApproveVerify(id) {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja aprovar o agendamento?",
      [{ text: "Não" }, { text: "Sim", onPress: () => handleApprove(id) }]
    );
  }

  async function handleApprove(id) {
    const response = await api.put(`/bookings/${id}`, { isApproved: true });

    if (response.data) {
      Alert.alert("Sucesso!", "O agendamento foi aprovado.");
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Olá, {name}!</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>SEUS AGENDAMENTOS DE HOJE</Text>
        {isDateHandled === true && (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <>
                {!item.wasCanceled && item.isApproved && (
                  <TouchableOpacity style={styles.listItem}>
                    <View>
                      <Text style={styles.listName}>{item.nameService}</Text>
                      <Text style={styles.listDate}>{item.date}</Text>
                    </View>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agendamentos pendentes</Text>
            <FlatList
              style={{ flex: 1 }}
              data={bookings}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <>
                  {!item.wasCanceled && !item.isApproved && (
                    <TouchableOpacity style={styles.listItem}>
                      <View>
                        <Text style={styles.listName}>{item.nameService}</Text>
                        <Text style={styles.listDate}>{item.date}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => handleApproveVerify(item._id)}
                      >
                        <Icon
                          name="check"
                          size={30}
                          type="font-awesome"
                          color="#511D68"
                        />
                      </TouchableOpacity>
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
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.btnWhite}
          onPress={() => setIsModalVisible(!isModalVisible)}
        >
          <Text style={styles.btnWhiteText}>Agendamentos pendentes</Text>
        </TouchableOpacity>
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
  btnWhite: {
    height: 42,
    borderWidth: 1,
    borderColor: "#BDAAC6",
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#511D68",
    height: 44,
    marginTop: 10,
    borderRadius: 2,
  },
  btnWhiteText: {
    color: "#511D68",
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#511D68",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
