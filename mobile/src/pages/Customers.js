import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import logo from '../assets/bmlogo.png';

export default function Customers({ navigation }) {
    function handleNavigation() {
        navigation.navigate('NewCustomer');
    }

    return(
        <>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>Clientes</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.customerContainer}>
                    <Icon name="circle-o" type="font-awesome" size={25} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                    <Text style={styles.customerName}>Nome Sobrenome</Text>
                </View>
                <View style={styles.customerContainer}>
                    <Icon name="circle-o" type="font-awesome" size={25} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                    <Text style={styles.customerName}>Nome Sobrenome</Text>
                </View>
                <View style={styles.customerContainer}>
                    <Icon name="circle-o" type="font-awesome" size={25} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                    <Text style={styles.customerName}>Nome Sobrenome</Text>
                </View>
                <View style={styles.customerContainer}>
                    <Icon name="circle-o" type="font-awesome" size={25} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                    <Text style={styles.customerName}>Nome Sobrenome</Text>
                </View>
                <View style={styles.customerContainer}>
                    <Icon name="circle-o" type="font-awesome" size={25} color={'#ccc'} style={{ marginTop: 8, marginRight: 10 }}/>
                    <Text style={styles.customerName}>Nome Sobrenome</Text>
                </View>
                <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
                    <Text style={styles.btnText}>NOVO CLIENTE</Text>
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
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#fff',
        paddingHorizontal: 55,
    },
    customerContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 42,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#999',
        alignSelf: 'center',
    },
});