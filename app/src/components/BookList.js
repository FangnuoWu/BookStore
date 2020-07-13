import React from 'react';
import {styles} from '../style/style';
import {getBooks} from '../services/BookService';
import {ScrollView, View, Image} from 'react-native';
import {Card, Searchbar, Text, Title} from 'react-native-paper';

export default function BookList(props) {
  const {navigation} = props;
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    getBooks(query, data => setData(data)).catch();
  }, [query]);

  let itemList = data.map((product, key) => {
    return (
      <Card
        style={{margin: 10}}
        key={key}
        onPress={() => {
          navigation.navigate('Detail', {
            itemId: product.id,
          });
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{flex: 2, height: 180}}
            resizeMode="contain"
            source={{uri: product.image}}
          />
          <View style={{flex: 3, marginTop: 25}}>
            <Text style={{fontSize: 15, color: 'grey'}}>{product.type}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <Title style={styles.price}>￥{product.price}</Title>
          </View>
        </View>
      </Card>
    );
  });

  let _onChangeSearch = value => {
    setQuery(value);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={_onChangeSearch}
        value={query}
      />
      <ScrollView>{itemList}</ScrollView>
    </View>
  );
}
