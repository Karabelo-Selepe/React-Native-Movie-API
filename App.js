import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {

  const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=51302459';
  
  const [state, setState] = useState({
    s: 'Enter a movie...',
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + '&s=' + state.s).then(({ data }) => {
      let results = data.Search;
      //console.log(results)
      setState(prevState => {
        return {...prevState, results: results}
      });
    });
  }

  {/*  */}
  const openPopup = id => {
    axios(apiurl + '&i=' + id).then(({ data }) => {
      let result  = data;

      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie List</Text>
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />

      <ScrollView style={styles.display}>
          {state.results.map(result => (
            <TouchableHighlight key={result.imdbID} onPress={() => openPopup(result.imdbID)}> 
              
              <View style={styles.disp}> 
                <Image
                  source={{uri: result.Poster}}
                  style={{
                    width: '100%',
                    height: 300,
                  }}
                  resizeMode='cover'
                />
                <Text style={styles.head}> { result.Title + ' : ' + result.Year } </Text>
              </View>

            </TouchableHighlight>
          ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 40,
  },
  display: {
    flex: 1.
  },
  disp: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  head: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565',
  },
});