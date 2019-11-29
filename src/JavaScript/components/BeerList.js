import React from 'react';
import { Text, View } from 'react-native';

const BeerList = ({ beers }) => {
  return (
    <View>
      {beers.map(beer =>
        <View key={`beer-${beer.id}`}>
          <Text>
            {beer.name}
          </Text>
          <Text>
            {beer.abv}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BeerList;
