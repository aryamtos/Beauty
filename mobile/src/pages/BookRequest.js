import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  Image,
  Picker,
  SafeAreaView,
  Alert,
  TextInput,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import GlobalStyles from "../assets/GlobalStyles";
import lupa from "../assets/BUSCAR_cinza.png";
import logoLoja from "../assets/logo_loja.jpg";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../services/api";

//import ServiceList from '../components/ServiceList';x'

//import { Container, Title, Button, ButtonText, ProductList } from './styles';

export default function BookRequest({ navigation }) {
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
  const [street, setStreet] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const { services } = route.params;

    setServices(services);
  }, []);

  useEffect(() => {
    async function loadType() {
      const serviceType = await AsyncStorage.getItem("serviceType");
      console.log(serviceType);
      if (serviceType == "Autônomo") {
        setIsDelivery(true);
      }
    }
    loadType();
  }, []);

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
    /**
     * -----------------------------------------
     *    Pegando user do AsyncStorage
     * -----------------------------------------
     *
     * Como você usou stringify na hora de arma-
     * zenar o user, essa string precisa ser
     * formatada para um JSON novamente, então
     * se usa o JSON.parse() :)
     */
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);

    const user_id = user._id;

    try {
      const response = await api.post(
        `/service/${service._id}/bookings`,
        {
          date,
          paymentMethod,
          street,
          numberHouse,
          neighborhood,
          city,
          cep,
          reference,
        },
        {
          headers: { "Content-Type": "application/json", user_id: user_id },
        }
      );

      Alert.alert("Sucesso!", "Solicitação de serviço enviada");
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function handleCancel() {
    navigation.navigate("StoreProfile");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.inputText}>Selecione o serviço</Text>
        <Picker
          selectedValue={service}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => {
            setService(itemValue);
            setServicePrice(itemValue.preco);
          }}
        >
          {services.map((service) => (
            <Picker.Item
              color="#777"
              key={service._id}
              label={service.nomeService}
              value={service}
            />
          ))}
        </Picker>

        <TouchableOpacity style={styles.input} onPress={showDatepicker}>
          <Text style={styles.inputText}>Selecione a Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={showTimepicker}>
          <Text style={styles.inputText}>Selecione a Hora</Text>
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

        {isDelivery ? (
          <>
            <View>
              <Text style={styles.inputText}>
                Selecione o Método de Pagamento
              </Text>
              <Picker
                selectedValue={paymentMethod}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentMethod(itemValue)
                }
              >
                <Picker.Item color="#777" label="Dinheiro" value="Dinheiro" />
                <Picker.Item color="#777" label="Débito" value="Débito" />
                <Picker.Item color="#777" label="Crédito" value="Crédito" />
              </Picker>
              <Text style={styles.inputText}>Informe sua Rua</Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: Travessa Uruguaiana"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setStreet}
                />
              </TouchableOpacity>
              <Text style={styles.inputText}>Informe o Número da Casa</Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: 435"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setNumberHouse}
                />
              </TouchableOpacity>
              <Text style={styles.inputText}>Informe o Bairro</Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: Malhado"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setNeighborhood}
                />
              </TouchableOpacity>
              <Text style={styles.inputText}>Informe a Cidade</Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: Ilheus"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setCity}
                />
              </TouchableOpacity>
              <Text style={styles.inputText}>Informe o CEP</Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: 45651-350"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setCep}
                />
              </TouchableOpacity>
              <Text style={styles.inputText}>
                Informe um Ponto de Referência
              </Text>
              <TouchableOpacity style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Ex: proximo ao mercado"
                  placeholderTextColor="#A5A5A5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setReference}
                />
              </TouchableOpacity>

              <View style={styles.precoField}>
                <Text style={styles.precoText}>Total: R$ {servicePrice+10}</Text>
              </View>

            </View>
          </>
        ) : null}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Solicitar Serviço</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
/*
 <SafeAreaView style={[GlobalStyles.droidSafeArea, styles.container]} >*/

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: StatusBar.currentHeight + 50,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30,
  },
  input: {
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
    marginBottom: 20,
    borderRadius: 2,
  },
  inputText: {
    color: "#511D68",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    height: 42,
    backgroundColor: "#483D8B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  cancelButton: {
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  precoField: {
    marginBottom: 10,
  },
  precoText: {
    fontSize: 16,
    color: "#8C8C8C",
  },
});
