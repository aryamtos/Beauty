import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
//import { format } from 'date-fns';

import styles from './styles';

// COLEÇÃO DE ÍCONES
//import typeIcons from '../../utils/typeIcons';

export default function CaCard({ servico, categoriaServico, description,price,onPress }){
  return (
    // <TouchableOpacity style={styles.card} onPress={onPress}>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardLeft}>
        <Text style={styles.cardTitle}>{servico}</Text>
        <Text style={styles.cardTitle}>{description}</Text>
      </View>
      <View style={styles.cardRight}>
  <Text style={styles.cardDate}>{categoriaServico}</Text>
        <Text style={styles.cardTime}>{price}}</Text>
      </View>
    </TouchableOpacity>
  )
}