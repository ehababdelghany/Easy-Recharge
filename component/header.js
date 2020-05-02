import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import {rightComponent, leftComponent,centerComponent,Content} from 'native-base'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
  });

export default class Navbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => alert('ea'),
          }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="pink"
        />
      </View>
    );
  }
}

