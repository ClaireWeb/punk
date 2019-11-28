import React from 'react';
import { Text, View } from 'react-native';

const BeerList = ({ beers }) => {
  return (
    <View>
      {beers.map(beer =>
        <Text key={`beer-${beer.id}`}>
          {beer.name}
        </Text>
      )}
    </View>
  );
};

export default BeerList;
