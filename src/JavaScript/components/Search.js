import React, { useState } from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import api from '../api';
import Loader from '../../loader.gif';

import BeerList from './BeerList';

const Search = () => {
  const [beers, setBeers] = useState([]);
  const [queryParam, setQueryParam] = useState({name:'', abv:''});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBeers = (updatedPageNb = '', queryParam) => {
    const name = queryParam.name ? `beer_name=${queryParam.name}` : '';
    const abv = queryParam.abv ? `abv_gt=${queryParam.abv}` : '';
    const pageNumber = updatedPageNb ? `&page=${updatedPageNb}` : '';
    const searchUrl = `?${name}&${abv}${pageNumber}&per_page=10`;
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
      setQueryParam({queryParam})
      setBeers([]);
      console.log('setState if not e', queryParam);
    } else {
      setQueryParam.info({...queryParam, info: e});
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

      <TextInput
        style={{ height: 40 }}
        placeholder="Search by min abv!"
        name="abv"
        value={queryParam.abv}
        onChangeText={(e) => handleChange(e, "abv")}
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
      <Image
        source={Loader}
        alt="loader"
      />}
      </>

      <BeerList beers={beers} />
    </View>
  );
};

export default Search;
