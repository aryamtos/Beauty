import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function StoreServices() {
    return(
        <View style={styles.container}>
            <View style={styles.service}>
                <View style={styles.leftSide}>
                    <Text style={styles.serviceBoldText}>Barba Completa</Text>
                    <Text style={styles.serviceNormalText}>45 min</Text>
                    <Text style={styles.serviceNormalText}>Barba</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.servicePrice}>R$12,00</Text>
                </View>
            </View>
            <View style={styles.service}>
                <View style={styles.leftSide}>
                    <Text style={styles.serviceBoldText}>Barba com pigmentação</Text>
                    <Text style={styles.serviceNormalText}>60 min</Text>
                    <Text style={styles.serviceNormalText}>Barba</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.servicePrice}>R$28,00</Text>
                </View>
            </View>
            <View style={styles.service}>
                <View style={styles.leftSide}>
                    <Text style={styles.serviceBoldText}>Corte Social</Text>
                    <Text style={styles.serviceNormalText}>30 min</Text>
                    <Text style={styles.serviceNormalText}>Cabelo</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.servicePrice}>R$25,00</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 10,
    },
    service: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceBoldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#747474',
    },
    serviceNormalText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#A5A5A5',
    },
    servicePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#747474',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    leftSide: {
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    rightSide: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
});