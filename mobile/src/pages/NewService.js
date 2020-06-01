import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import logo from '../assets/bmlogo.png';
import lupa from '../assets/BUSCAR_cinza.png';

export default function NewService({ navigation }) {
    function handleNavigation() {
        navigation.goBack();
    }

    return(
        <>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>Novo atendimento</Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.cardBtn, { height: 100 }]}>
                    <View style={styles.cardTop}>
                        <Icon name="circle-o" type="font-awesome" size={40} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                        <Text style={[styles.cardBtnText, { alignSelf: 'center' }]}>Selecione o cliente</Text>
                        <Image source={lupa} style={styles.lupa}/>
                    </View>
                    <Text style={styles.cardBtnText}>71 99999-9999</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardBtn}>
                    <Text style={styles.cardBtnText}>Selecione o serviço</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardBtn}>
                    <Text style={styles.cardBtnText}>Selecione o horário</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                    <Text style={styles.btnText}>AGENDAR</Text>
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
        backgroundColor: '#fff',
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
    lupa: {
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginLeft: 10,
    },
    btn: {
        height: 42,
        backgroundColor: '#511D68',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#fff',
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
    cardTop: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 40,
    },  
});