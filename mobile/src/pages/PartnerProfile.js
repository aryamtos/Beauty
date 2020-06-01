import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import thumbnail from '../assets/perfil_.png';

export default function PartnerProfile({ navigation }) {
    function handleBusinessHours() {
        navigation.navigate('BusinessHours');
    }

    function handleServices() {
        navigation.navigate('Services');
    }

    function handleLocation() {
        navigation.navigate('Location');
    }
    return(
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Perfil</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image source={thumbnail} style={styles.thumbnail} />
                    <Text style={styles.name}>Leo Bob 2000</Text>
                </View>
                <Text style={styles.text}>Para parceiros</Text>
                <TouchableOpacity onPress={handleBusinessHours} style={styles.btn}>
                    <Text style={styles.btnText}>Horário de Funcionamento</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleServices} style={styles.btn}>
                    <Text style={styles.btnText}>Serviços</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLocation} style={styles.btn}>
                    <Text style={styles.btnText}>Localização</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#511D68',
        padding: 20,
        paddingTop: StatusBar.currentHeight + 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.5)',
    },
    text: {
        fontSize: 15,
        color: '#A5A5A5',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    }, 
    thumbnail: {
        height: 120,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#66397A',
        marginLeft: 20,
    },
    btn: {
        height: 42,
        borderColor: '#BDAAC6',
        borderWidth: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#777',
    }
}
);