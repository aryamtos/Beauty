

import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import api from '../services/api';

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
     loading : false,
      nameList: [],
      error: null,
    
    };

    this.arrayholder = [];
  }

  async componentDidMount() {
     await api.get('/all')
    .then(res =>{
      const nameList = res.data;
      this.setState({
        nameList,
        
      });
      console.log(nameList);
    })
  }
  /*
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.state.nameList.filter(item => {
      const itemData = `${item.nome}`;
      const textData = text;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      nameList: newData,
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };*/
  render(){
 
    return(
      <View style={{ flex: 1 }}>
      <FlatList
        data={this.state.nameList}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{ source: { uri: item.foto_url } }}
            title={`${item.nome}`}
            subtitle={item.categoria}
          />
        )}
      /*  ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}*/
      />
    </View>
    );
  }

}
export default Services;