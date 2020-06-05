import React from 'react';
import { Image, StyleSheet, FlatList, Text, TextInput, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import lupa from '../assets/BUSCAR_cinza.png';
import api from '../../services/api';

export default function AdrresComponent({ service, navigation }) {

    const [servicos, setServicos] = useState([])
    useEffect(() => {
        async function loadServices() {
            const response = api.get('/service/showservices', {
                params: { service },
            })
            setServicos(response.data);
        }
        loadServices();
    }, []);
    return (
        <FlatList
            style={styles.resultData}
            data={servicos}
            keyExtractor={service => service._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <Image style={styles.thumbnail} source={{ uri: item.foto_url }} />
                <View style={styles.resultData}>
                    <Text style={styles.resultNameText}>{item.nome}</Text>
                    <Text style={styles.resultText}>{item.cidade}</Text>
                    <View style={styles.resultDataRate}>
                        <Icon name="star-o" type="font-awesome" size={10} style={{ marginTop: 2, marginRight: 2 }} />
                        <Text style={styles.resultText}>4,0</Text>
                        <Text style={styles.resultText}>{item.categoria}</Text>
                    </View>
                </View>
            )}


        />

    )

}
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