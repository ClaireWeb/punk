import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import BeerDescription from './BeerDescription';

const BeerList = ({ beers, toggleDescription, described }) => {
  return (
    <View>
      {beers.map(beer =>
        <View style={styles.card} key={`beer-${beer.id}`}>
          {!described
            ? <ImageBackground
                style={styles.cardImage}
                source={{ uri: beer.image_url }}
              />
            : <View style={styles.cardDescription}>
                <Text style={[styles.cardDescText, { fontStyle: 'italic' }]}>
                  {beer.description}
                </Text>
                <View style={[styles.cardDescText, { paddingVertical: 10 }]}>
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontWeight: 'bold',
                      fontSize: 16
                    }}
                  >
                    Food matching :
                  </Text>
                  {beer.food_pairing.map(item =>
                    <Text key={`item-${item}`} style={{ paddingBottom: 5 }}>
                      {item}
                    </Text>
                  )}
                </View>
                <Text style={styles.cardDescText}>
                  <Text style={{ fontWeight: 'bold' }}>TIPS !</Text>{' '}
                  {beer.brewers_tips}
                </Text>
              </View>}

          <View
            style={[
              styles.cardTextContainer,
              described && { backgroundColor: 'none' }
            ]}
          >
            <View style={described && { opacity: 0 }}>
              <Text style={[styles.cardText, { fontWeight: 'bold' }]}>
                {beer.name}
              </Text>
              <Text style={styles.cardText}>
                Alcohol: {beer.abv}°
              </Text>
            </View>
            <BeerDescription
              described={described}
              toggleDescription={toggleDescription}
              beerId={beer.id}
            />
          </View>
          <Text style={styles.cardTagline}>
            {beer.tagline}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BeerList;

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
  cardDescription: {
    height: 400,
    padding: 10
  },
  cardDescText: {
    flex: 4,
    alignItems: 'center',
    flexShrink: 1
  },
  cardImage: {
    width: '50%',
    height: 400,
    alignSelf: 'center'
  },
  cardTextContainer: {
    width: '100%',
    height: 80,
    padding: 20,
    backgroundColor: 'lightgrey',
    opacity: 0.9,
    position: 'absolute',
    bottom: 37,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardText: {
    color: 'grey',
    padding: 5,
    fontSize: 16,
    opacity: 1
  },
  cardTagline: {
    textAlign: 'center',
    paddingVertical: 10,
    fontStyle: 'italic',
    color: '#f1cc26',
    backgroundColor: 'grey',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});
