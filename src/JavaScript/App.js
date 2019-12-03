import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView
} from 'react-native';

import Search from './components/Search';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView>
        <Text style={styles.title}>The Beer Xperience</Text>
        <Search />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 30
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#FEFEFE',
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#f1cc26',
    shadowColor: '#464646',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  }
});

export default App;
