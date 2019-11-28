import React, { useState } from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import api from '../api';
import Loader from '../../loader.gif';

import BeerList from './BeerList';

const Search = () => {
  const [beers, setBeers] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBeers = (updatedPageNb = '', query) => {
    const pageNumber = updatedPageNb ? `&page=${updatedPageNb}` : '';
    const searchUrl = `?beer_name=${query}${pageNumber}&per_page=10`;
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

  const handleChange = async query => {
    if (!query) {
      setQuery(query);
      setBeers([]);
      setMessage('');
    } else {
      setQuery(query);
      setLoading(true);
      setMessage('');
      await fetchBeers(1, query);
    }
  };

  return (
    <View>
      {/* Search input */}

      <TextInput
        style={{ height: 40 }}
        placeholder="Search by beer name!"
        name="query"
        value={query}
        onChangeText={handleChange}
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
