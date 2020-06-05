
import React, { useState, useEffect } from 'react';
//import socketio from 'socket.io-client';

import { Alert, SafeAreaView, Text, Image, AsyncStorage, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';

import logo from '../../assets/logo1.png'


import SpotList from '../components/SpotList';

import PropTypes from 'prop-types';

import api from '../services/api';



export default function CategoryPage({navigation}) {

  const [services, setServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);



  return (
   <Text></Text>

  )
}