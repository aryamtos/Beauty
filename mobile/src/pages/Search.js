import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, TextInput, View,AsyncStorage ,StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';
export default function Search({ navigation }) {

   const [nomeService, setNome] = useState('');
    const[rua, setRua] = useState('');
    const [bairro,setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    
    const [endereco, setEndereco] = useState('')
    
   /*useEffect(() =>{
    AsyncStorage.getItem('user').then(user =>{
        if(user){
            navigation.navigation('SearchResult');
        }
    })
   },[]);*/

   
   async function handleSubmit(){
     //  const response = await api.post('/search',{
       ///    nomeService,
     
       await AsyncStorage.setItem('nomeService',nomeService);
       //const {_id} = response.data;

       //await AsyncStorage.setItem('user', _id);
       //await AsyncStorage.setItem('tipos', tipos);
       //await AsyncStorage.setItem('nome', nome);
     

       navigation.navigate('SearchResult');
   }
    

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Busca</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Serviço ou estabelecimento"
                    autoCorrect={false}
                    value={nomeService}
                    onChangeText={setNome}

                />
                <View style={styles.containerDivide}>
                    <TextInput 
                        style={[styles.input, styles.inputDivide]}
                        placeholder="Cidade"
                        value={cidade}
                    onChangeText={setCidade}
                        
                    />
                    <TextInput 
                        style={[styles.input, styles.inputDivide]}
                        placeholder="Estado"
                    />
                </View>
                <TextInput 
                    style={styles.input}
                    placeholder="Bairro"
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.btnText}>Buscar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 40,
        marginTop: StatusBar.currentHeight+10,
        padding: 10,
    },
    form:{
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
        //Sombras
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
    formTitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#511D68',
    },
    input: {
        borderWidth: 0,
        borderColor: '#D5D3D6',
        borderBottomWidth: 1,
        fontSize: 16,
        color: '#9E9AA0',
        textAlign: 'center',
        paddingTop: 10,
    },
    containerDivide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputDivide: {
        width: '47%',
        alignSelf: 'stretch',
    },
    btn: {
        height: 42,
        backgroundColor: '#511D68',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});