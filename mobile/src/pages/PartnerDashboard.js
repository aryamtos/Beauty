import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import logo from '../assets/bmlogo_.png';

export default function PartnerDashboard({ navigation }){
    function handleNavigation(){
        navigation.navigate('NewService');
    }

    return(
        <>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>Olá, Leo Bob!</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.titleText}>SEUS AGENDAMENTOS DE HOJE</Text>
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
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 15,
        alignItems: 'center',
    },
    header: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        flexDirection: 'row',
        backgroundColor: '#511D68',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingBottom: 10,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#511D68',
    },
    headerText: {
        alignSelf: 'flex-end',
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
    },
    logo: {
        height: 30,
        resizeMode: 'contain',
        marginRight: 5,
    },
    btn: {
        height: 42,
        backgroundColor: '#511D68',
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