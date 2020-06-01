import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

export default function Location({ navigation }) {
    function handleNavigation() {
        navigation.goBack();
    }

    function handleMap() {
        Alert.alert('MAPA :)');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Endereço:</Text>
                <View style={styles.cardAddress}>
                    <Text style={styles.cardText}>Rua, n°99, bairro</Text>
                    <Text style={styles.cardText}> - </Text>
                    <Text style={styles.cardText}>40000-000</Text>
                </View>
                <Text style={styles.cardText}>Cidade-BA</Text>
                <TouchableOpacity onPress={handleMap} style={styles.cardBtn}>
                    <Text style={styles.cardBtnText}>Ver no mapa</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                <Text style={styles.btnText}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    card: {
        alignSelf: 'stretch',
        padding: 40,
        borderColor: '#A5A5A5',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardAddress: {
        flexDirection: 'row',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#A3A3A3',
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#A3A3A3',
    },
    cardBtn: {
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    cardBtnText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#777',
    },
    btn: {
        height: 42,
        backgroundColor: '#707070',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});