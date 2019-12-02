import React from 'react';
import { Text, View, ScrollView } from 'react-native';

const BeerList = ({ beers }) => {
  return (
    <ScrollView>
      {beers && beers.length > 0
        ? beers.map(beer =>
            <View key={`beer-${beer.id}`}>
              <Text>
                {beer.name}
              </Text>
              <Text>
                {beer.abv}
              </Text>
              {beer.food_pairing.map((item, i) =>
                <Text key={`item-${item}`}>
                  {item}
                </Text>
              )}
            </View>
          )
        : <Text>No more results</Text>}
    </ScrollView>
  );
};

export default BeerList;
