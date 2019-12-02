import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ActivityIndicator, Picker, Button } from 'react-native';
import api from '../api';

import BeerList from './BeerList';

const Search = () => {
  const [beers, setBeers] = useState([]);
  const [queryParam, setQueryParam] = useState({name:'', abv:'', food:''});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  const fetchBeers = (updatedPageNb = '', queryParam) => {
    const name = queryParam.name ? `beer_name=${queryParam.name}` : '';
    const abv = queryParam.abv ? `abv_gt=${queryParam.abv}` : '';
    const food = queryParam.food ? `food=${queryParam.food}` : '';
    const pageNumber = updatedPageNb ? `&page=${updatedPageNb}` : '';
    const searchUrl = `?${name}&${abv}&${food}${pageNumber}&per_page=10`;
    console.log(searchUrl);
    
    api(searchUrl)
      .then(res => {
        const resultNotFoundMsg = !res.length
          ? 'There are no more search results. Please try a new search'
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

  const handleChange = async (e, info) => {
    if (!e) {
      setQueryParam({
      name: info === 'name' ? e : queryParam.name,
      abv: info === 'abv' ? e : queryParam.abv,
      food: info === 'food' ? e : queryParam.food
    });
      setBeers([]);
    } else {   
      setQueryParam({
        name: info === 'name' ? e : queryParam.name,
        abv: info === 'abv' ? e : queryParam.abv,
        food: info === 'food' ? e : queryParam.food
      });    
      setLoading(true);
      setMessage('');
      await fetchBeers(1, queryParam);
    }
  };  


  const handleNextPage = () => {
    const nextPage = currentPage + 1
    fetchBeers(nextPage, queryParam)
    setCurrentPage({nextPage})

  }

  return (
    <View>

      {/* Search inputs */}
      <TextInput
        style={styles.inputs}
        placeholder="Search by beer name..."
        name="name"
        value={queryParam.name}
        onChangeText={(e) => handleChange(e, "name")}
      />

      <Picker
        selectedValue={queryParam.abv}
        style={styles.inputs}
        itemStyle={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          handleChange(itemValue, "abv")
        }>
          <Picker.Item style={{fontSize: 8}} label="No alcohol limit" value="0" />
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
      <ActivityIndicator size="large" color="#0000ff" animating={true} />}
      </>


      <BeerList beers={beers} />
      
      {beers && beers.length > 0 &&
      <Button title="More beers" onPress={(e) => handleNextPage()} />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    justifyContent: 'center',
    height: 30,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'lightgrey'
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
})

export default Search;

