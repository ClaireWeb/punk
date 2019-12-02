import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image
} from 'react-native';

const BeerList = ({ beers }) => {
  return (
    <ScrollView>
      {beers && beers.length > 0
        ? beers.map(beer =>
            <View style={styles.card} key={`beer-${beer.id}`}>
              <ImageBackground
                style={styles.cardImage}
                source={{ uri: beer.image_url }}
              />
              <View style={styles.cardTextContainer}>
                <View>
                  <Text style={styles.cardText}>
                    {beer.name}
                  </Text>
                  <Text style={styles.cardText}>
                    {beer.abv}
                  </Text>
                </View>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('./icons/eye.png')}
                />
              </View>
              <Text style={styles.cardTagline}>
                {beer.tagline}
              </Text>

              {/* {beer.food_pairing.map(item =>
                <Text key={`item-${item}`}>
                  {item}
                </Text>
              )} */}
            </View>
          )
        : <Text>No more results</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '95%',
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 3,
      height: 3
    },
    position: 'relative'
  },
  cardImage: {
    width: '50%',
    height: 400,
    alignSelf: 'center'
  },
  cardTextContainer: {
    width: '100%',
    height: 100,
    padding: 20,
    backgroundColor: 'lightgrey',
    opacity: 0.8,
    position: 'absolute',
    bottom: 26,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardText: {
    padding: 5,
    fontSize: 14
  },
  cardTagline: {
    textAlign: 'center',
    paddingVertical: 5,
    fontStyle: 'italic',
    color: '#f1cc26',
    backgroundColor: 'grey',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});

export default BeerList;
