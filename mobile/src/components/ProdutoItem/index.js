import React from 'react'
import { Text } from 'react-native'

import { Container, ProductImage, InfoContainer, ProductName } from './styles'

export default function ProductItem({ product }) {
  return (
    <Container>
      <ProductImage
        source={{ uri: product.url }}
      />
     
    </Container>
  );
}
/*
 <InfoContainer>
        <ProductName>{product.nome}</ProductName>
        <Text>Preço: {product.preco}</Text>
        <Text>Descrição: {product.descricao}</Text>
      </InfoContainer>  */