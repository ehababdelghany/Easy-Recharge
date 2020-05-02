import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const width = Dimensions.get('window').width;
const largeContainerSize = width / 2;
const largeImageSize = width / 4;

const styles = StyleSheet.create
({
    container: 
    {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },

    containerSize: 
    {
        width: largeContainerSize,
        height: largeContainerSize,
        alignItems: 'center',
        justifyContent: 'center',
        tintColor: 'grey'   
    },

    imageSize:
    {
        width: largeImageSize,
        height: largeImageSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        resizeMode: 'cover'
    },

    chosenImage:
     {
        width: width / 1.25,
        height: width / 1.25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
})

class PhotoComponent extends Component
 {
   renderDefault(){
        return(
            <View style={styles.container}>
            <Image
            resizeMode='contain'
            style={styles.containerSize}
            //source={require('../assets/background.png')}
            />
            <Image
            resizeMode='stretch'
            style={styles.imageSize}
            source={require('../assets/unnamed.png')}
            />
            </View>
)
}
    renderImage(){
        return(
            <View style={styles.container}>
            <Image
            resizeMode='contain'
            style={styles.chosenImage}
             source={{uri: this.props.uri}}/>
            </View>
)
}

    render(){
        const displayImage = this.props.uri ? this.renderImage() : this.renderDefault()
         return(
            <View style={styles.container}>
            {displayImage}
            </View>
)
}
}

export default PhotoComponent;