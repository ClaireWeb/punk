import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ActivityIndicator, Picker, Button } from 'react-native';
import api from '../api';

import BeerList from './BeerList';

const Search = () => {
  const [beers, setBeers] = useState([]);
  const [queryParam, setQueryParam] = useState({beer_name:'', abv_lt:'', food:''});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [described, setDescribed] = useState(false)

  // API request
  const fetchBeers = (updatedPageNb = '', queryParam) => {
    // URL construction
    let searchUrl = [];
    const pageNumber = updatedPageNb ? `page=${updatedPageNb}` : '';
    for (const property in queryParam) {
      if (queryParam[property] !== '') {
        searchUrl.push(`${property}=${queryParam[property]}`)
      }
    }
    if (searchUrl.length > 0) {
      searchUrl.push(`${pageNumber}&per_page=10`)
      searchUrl = searchUrl.join('&');
      searchUrl = `?${searchUrl}`
    }
    
    // Fetch the data
    api(searchUrl)
      .then(res => {
        const resultNotFoundMsg = !res.length
          ? 'No more results. Please try a new search !'
          : '';
        setBeers(res);
        setMessage(resultNotFoundMsg);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setMessage('Failed to fetch the beers. Please check your connexion !');
        setCurrentPage(1)
      });
  };

  // Catch the users actions on inputs
  const handleChange = async (e, info) => {
    if (!e) {
      setQueryParam({
      beer_name: info === 'beer_name' ? e : queryParam.beer_name,
      abv_lt: info === 'abv_lt' ? e : queryParam.abv_lt,
      food: info === 'food' ? e : queryParam.food
    });
      setBeers([]);
    } else {   
      setQueryParam({
        beer_name: info === 'beer_name' ? e : queryParam.beer_name,
        abv_lt: info === 'abv_lt' ? e : queryParam.abv_lt,
        food: info === 'food' ? e : queryParam.food
      });    
      setLoading(true);
      setMessage('');
      await fetchBeers(1, queryParam);
    }
  };  

  // Display the next page by pressing the button
  const handleNextPage = () => {
    const nextPage = currentPage + 1
    fetchBeers(nextPage, queryParam)
    setCurrentPage(nextPage)    
  }

  // Display more informations on Beer Cards
  const toggleDescription = beerId => {
    beers.map(beer =>
      beerId === beer.id ? setDescribed(!described) : described
    )
  };

  return (
    <View style={{padding: 10}}>
      {/* Search inputs */}
      <TextInput
        style={styles.inputs}
        placeholder="Search by beer name..."
        name="beer_name"
        value={queryParam.beer_name}
        onChangeText={(e) => handleChange(e, "beer_name")}
      />

      <Picker
        selectedValue={queryParam.abv_lt}
        style={[styles.inputs, {color: 'grey'}]}
        itemStyle={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          handleChange(itemValue, "abv_lt")
        }>
          <Picker.Item label="No alcohol limit" value="0" />
          <Picker.Item label="Light beer: under 5°" value="5" />
          <Picker.Item label="Medium beer: until 10°" value="10" />
          <Picker.Item label="Strong beer: until 15°" value="15" />
      </Picker>

      <TextInput
        style={styles.inputs}
        placeholder="Search by matching food !"
        name="food"
        value={queryParam.food}
        onChangeText={(e) => handleChange(e, "food")}
      />

      {/* Error message */}
      <>
      {message &&
        <Text style={styles.message}>
          {message}
        </Text>}
      </>
      
      <>
      {/* Loader */}
      {loading &&
      <ActivityIndicator size="large" color="#FFD700" animating={true} />}
      </>

      {/* Search results */}
      {(beers && beers.length > 0 )
      && <BeerList beers={beers} toggleDescription={toggleDescription} described={described}/>}

      {/* Button more */}
      {(beers && beers.length > 0 )
      && <Button color={'#FFD700'} title="More beers" onPress={(e) => handleNextPage()} />
      }
      
      {/* Welcome message */}
      {(!beers || beers.length === 0) &&
      <View style={{ margin: 30, paddingVertical: 10 }}>
        <Text style={[styles.welcome, { fontWeight: 'bold', letterSpacing: 3 }]}>Welcome to the American Punk beer application !</Text>
        <Text style={[styles.welcome, {}]}>You can search a beer by its name, filter by alcohol percentage, or by matching food.</Text>
        <Text style={[styles.welcome, {}]}>Click on the eye to know everything about your favorite beer!</Text>         
      </View>
      }

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    lineHeight: 25
  },
  inputs: {
    justifyContent: 'center',
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f6f6e9'
  },
  picker: {
    fontSize: 10
  },
  message: {
    margin: 10, 
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center"
  }
});