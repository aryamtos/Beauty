import React from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search({ navigation }) {
    async function handleNavigation() {
        navigation.navigate('SearchResult');
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Busca</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Serviço ou estabelecimento"
                />
                <View style={styles.containerDivide}>
                    <TextInput 
                        style={[styles.input, styles.inputDivide]}
                        placeholder="Cidade"
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
            <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
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