import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, StatusBar, FlatList, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

export default function ServiceList({ navigation }) {

    const [servicos, setServicos] = useState([]);
    useEffect(() => {
        async function loadProducts() {

            const response = await api.get('/all');//showservices

            console.log(response.data);

            setServicos(response.data);
        }

        loadProducts();
    }, []);
    function handleNavigation() {

    }
    return (
            <TouchableOpacity onPress={handleNavigation} style={styles.result}>
                <FlatList
                    data={servicos}
                    keyExtractor={servico => servico._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.foto_url }} style={styles.thumbnail} />
                       
                )}
                />

            </TouchableOpacity>
       

    );

}

/*</TouchableOpacity>  
      <Text style={styles.resultNameText}>{nome}</Text>
      <Text style={styles.resultText}>{cidade}</Text>
      <View style={styles.resultDataRate}>
          <Icon name="star-o" type="font-awesome" size={10} style={{ marginTop: 2, marginRight: 2 }} />
          <Text style={styles.resultText}>4,0</Text>
          <Text style={styles.resultText}>{categoria}</Text>
      </View>
  </View>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight,
        paddingTop: 20,
    },
    containerText: {
        fontSize: 14,
        color: '#aaa',
        paddingVertical: 10,
    },
    busca: {
        flexDirection: 'row',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buscaIcon: {
        height: 20,
        resizeMode: 'contain',
        padding: 0,
        margin: -40,
    },
    btnLupa: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buscaText: {
        fontSize: 14,
        color: '#444',
        padding: 0,
    },
    result: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    thumbnail: {
        height: 72,
        resizeMode: 'contain',
        marginRight: 10,
    },
    resultData: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 10,
        width: '100%',
    },
    resultNameText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#999',
    },
    resultText: {
        fontSize: 10,
        fontWeight: 'normal',
        color: '#999',
        marginRight: 15,
    },
    resultDataRate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});