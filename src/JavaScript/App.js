import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import Search from './components/Search';

export default function App() {
  return (
    <SafeAreaView>
      <Text>The Awesome Beer Xperience</Text>
      <Search />
    </SafeAreaView>
  );
}
