import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Picker,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import logo from "../assets/bmlogo.png";
import lupa from "../assets/BUSCAR_cinza.png";

import api from "../services/api";

export default function NewService({ navigation }) {
  // Variáveis gerais do form
  const [customersArray, setCustomersArray] = useState([]);
  const [servicesArray, setServicesArray] = useState([]);
  const [customer, setCustomer] = useState({});
  const [service, setService] = useState({});

  // Variáveis de data
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  useEffect(() => {
    async function handleInit() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      const token = await AsyncStorage.getItem("token");

      let response = await api.get(`/partner/${user._id}`, {
        headers: {
          token_access: token,
        },
      });

      if (response.data) {
        setCustomersArray(response.data.customers);
      }

      response = await api.get("/partner/service/index", {
        headers: {
          user_id: user._id,
          token_access: token,
        },
      });

      if (response.data) {
        setServicesArray(response.data);
      }
    }

    handleInit();
  }, []);

  useEffect(() => {
    console.log("A data é", date);
  }, [date]);

  // Funções para lidar com o picker de data e hora
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  function showDatepicker() {
    showMode("date");
  }

  function showTimepicker() {
    showMode("time");
  }

  async function handleSubmit() {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    const token = await AsyncStorage.getItem("token");

    try {
      await api.post(
        `/service/${service._id}/bookings`,
        {
          token_access: token,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            user_id: customer._id,
          },
        }
      );

      Alert.alert("Sucesso!", "Solicitação de serviço enviada");
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Novo atendimento</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Selecione o cliente</Text>
        <Picker
          selectedValue={customer}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => {
            setCustomer(itemValue);
          }}
        >
          {customersArray.map((customer) => (
            <Picker.Item
              color="#777"
              key={customer._id}
              label={customer.nome}
              value={customer}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Selecione o serviço</Text>
        <Picker
          selectedValue={service}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => {
            setService(itemValue);
          }}
        >
          {servicesArray.map((service) => (
            <Picker.Item
              color="#777"
              key={service._id}
              label={service.nomeService}
              value={service}
            />
          ))}
        </Picker>
        <TouchableOpacity style={styles.cardBtn} onPress={showDatepicker}>
          <Text style={styles.cardBtnText}>Selecione a Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardBtn} onPress={showTimepicker}>
          <Text style={styles.cardBtnText}>Selecione a Hora</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            mode={mode}
            value={date}
            minimumDate={new Date()}
            is24Hour={true}
            onChange={onChange} // Use "en_GB" here
          />
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
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
  lupa: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginLeft: 10,
  },
  btn: {
    height: 42,
    backgroundColor: "#511D68",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#fff",
  },
  cardBtn: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  cardBtnText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#777",
  },
  cardTop: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 40,
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: "#BDAAC6",
  },
  label: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#511D68",
  },
});
