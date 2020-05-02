import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View, TextInput } from 'react-native';
import Main from './component/main'
import { Header } from 'native-base';

const image = { uri: "https://reactjs.org/logo-og.png" };

class App extends Component 
{
  render() {
    return <Main />
    }
    }
    
export default App;