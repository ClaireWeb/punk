import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, Picker } from 'react-native';
import api from '../api';
import Loader from '../../loader.gif';

import BeerList from './BeerList';

export default function Search () {
  const [beers, setBeers] = useState([]);
  const [queryParam, setQueryParam] = useState({name:'', abv:'', food:''});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
        setMessage('Failed to fetch the beers.');
      });
  };

  const handleChange = async (e, info) => {
    console.log(e, info)
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
      console.log('setState if e', queryParam);
      
      setLoading(true);
      setMessage('');
      await fetchBeers(1, queryParam);
    }  
  };

  return (
    <View>

      {/* Search inputs */}
      <TextInput
        style={{ height: 40 }}
        placeholder="Search by beer name!"
        name="name"
        value={queryParam.name}
        onChangeText={(e) => handleChange(e, "name")}
      />

      {/* <TextInput
        style={{ height: 40 }}
        placeholder="Search by min abv!"
        name="abv"
        value={queryParam.abv}
        onChangeText={(e) => handleChange(e, "abv")}
      /> */}
      <Picker
        selectedValue={queryParam.abv}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          handleChange(itemValue, "abv")
        }>
          <Picker.Item label="no limit" value="0" />
          <Picker.Item label="light beer > 5°" value="5" />
          <Picker.Item label="medium beer > 10°" value="10" />
          <Picker.Item label="strong beer > 15°" value="10" />
      </Picker>

      <TextInput
        style={{ height: 40 }}
        placeholder="Search by matching food!"
        name="food"
        value={queryParam.food}
        onChangeText={(e) => handleChange(e, "food")}
      />

      {/* Error message */}
      <>
      {message &&
        <Text>
          {message}
        </Text>}
      </>
      
      <>
      {/* Loader */}
      {loading &&
      <ActivityIndicator size="large" color="#0000ff"
        source={Loader}
        alt="loader"
      />}
      </>

      <BeerList beers={beers} />
    </View>
  );
};

