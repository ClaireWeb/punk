import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import api from '../api';

const Search = () => {
  const [beers, setBeers] = useState([]);
  const [name, setName] = useState('');
  const [abv, setAbv] = useState('');

  // useEffect(() => {
  //   api('/random')
  //     .then(response => setBeers(response))
  //     .catch(error => console.error(error));
  // }, []);

  const urlConstructor = (elt1, elt2) => {
    let url = '';
    if (elt1 && elt2) {
      url = `?beer_name=${elt1}&abv_gt=${elt2}&per_page=10`;
    }
    if (elt1 && !elt2) {
      url = `?beer_name=${elt1}&per_page=10`;
    }
    if (!elt1 && elt2) {
      url = `?abv_gt=${elt2}&per_page=10`;
    }
    return url;
  };

  const handleChange = (name, abv) => {
    setName(name);
    setAbv(abv);
    api(urlConstructor(name, abv))
      .then(response => setBeers(response))
      .catch(error => console.error(error));
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, border: '1px solid black' }}
        placeholder="Search by beer name!"
        onChangeText={handleChange}
        value={name}
      />

      <TextInput
        style={{ height: 40, border: '1px solid black' }}
        placeholder="Search by minimum abv!"
        onChangeText={handleChange}
        value={abv}
      />

      {beers.map(beer =>
        <Text key={`beer-${beer.id}`}>
          {beer.name}
        </Text>
      )}
    </View>
  );
};

export default Search;
