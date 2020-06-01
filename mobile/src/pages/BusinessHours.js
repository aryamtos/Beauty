import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BusinessHours({ navigation }) {
    function handleNavigation() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>SEGUNDA-FEIRA</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>TERÇA-FEIRA</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>QUARTA-FEIRA</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>QUINTA-FEIRA</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>SEXTA-FEIRA</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>SÁBADO</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.cardText}>DOMINGO</Text>
                    <Text style={styles.cardText}>10h00-18h00</Text>
                </View>
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
    cardData: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderColor: '#DEDEDE',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 20,
    },
    cardText: {
        fontSize: 11,
        fontWeight: 'normal',
        color: '#A3A3A3',
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