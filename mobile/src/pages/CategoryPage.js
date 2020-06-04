  import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import api from '../services/api'
import ProductItem from '../components/ProductItem'

import { Container, Title, Button, ButtonText, ProductList } from './styles'

export default function CategoryPage() {

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProducts() {

      const response = await api.get('/service/showservices')

      console.log(response.data)

      setData(response.data.products);
    }

    loadProducts();
  }, []);

  renderListItem = ({ item }) => <ProductItem product={item} />

  return (
    <Container>
      <ProductList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderListItem}
        // onRefresh={loadProducts}
        // refreshing={refreshing}
      />
    </Container>
  );
}

CategoryPage.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};