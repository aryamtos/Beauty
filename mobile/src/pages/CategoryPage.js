import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { SafeAreaView, ScrollView, Image, AsyncStorage, View, StyleSheet, FlatList,List} from 'react-native';
import CategoryCard from '../components/CategoryCard';
//import logo from '../assets/blogoh.png'
//import GlobalStyles from '../assets/GlobalStyles'
import SpotList from '../components/SpotList';
import api from '../services/api';

export default function CategoryPage({isFocused}) {


    const [categoriaServico, setCategories] = useState([]);


    async function loadCategories(){

        const response = await api.get('/CategoriaModel');

        setCategories(response.data);
        //console.log(response)
    }
    useEffect(() =>{

       if(isFocused){

        loadCategories();
       }
    },[isFocused]);


    return (

        <SafeAreaView>
        
        </SafeAreaView>
    )


}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    logo: {

        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: 100,
    },

    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbmail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

});