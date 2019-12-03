import React from 'react';
import { Image, TouchableHighlight } from 'react-native';

const BeerDescription = ({ described, toggleDescription, beerId }) => {
  return (
    <>
      {!described ? (
        <TouchableHighlight onPress={() => toggleDescription(beerId)}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./icons/eye.png')}
          />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight onPress={() => toggleDescription(beerId)}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./icons/icon-eye-yellow.png')}
          />
        </TouchableHighlight>
      )}
    </>
  );
};

export default BeerDescription;
