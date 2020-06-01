import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import logo from '../assets/bmlogo.png';

export default function NewCustomer({ navigation }) {
    function handleNavigation() {
        navigation.goBack();
    }

    return(
        <>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>NOVO CLIENTE</Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                    <Text style={styles.btnText}>FINALIZAR CADASTRO</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    header: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 20,
        alignSelf: 'flex-end',
        fontWeight: 'normal',
        color: '#511D68'
    },
    logo: {
        height: 30,
        resizeMode: 'contain',
        marginRight: 5,
    },
    btn: {
        height: 42,
        backgroundColor: '#511D68',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#fff',
        paddingHorizontal: 55,
    },
});