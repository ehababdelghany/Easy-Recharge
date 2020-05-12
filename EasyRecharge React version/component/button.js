import React from 'react';
import { StyleSheet, TouchableOpacity, View, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles2 = StyleSheet.create
({
    buttonContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonBorder:
    {
        borderColor: 'grey',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        width: 70,
        height: 70,
        backgroundColor: 'grey'
    },

})

const Buttonsubmit = ({ onPress,Icon}) =>
(
    <TouchableOpacity title="submit" onPress={onPress} style={styles2.buttonContainer}>
    <View style={styles2.buttonBorder}>
    <Text style={{color: 'white', fontSize: 16 }}>recharge</Text>
    </View>
    </TouchableOpacity>
)
export default Buttonsubmit;
