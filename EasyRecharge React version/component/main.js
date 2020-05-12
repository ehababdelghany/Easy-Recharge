import React, { Component } from 'react';
import { StyleSheet, alert, Linking, Platform, Button, ActivityIndicator, View, ViewStyle, ImageBackground, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PhotoComponent from './PhotoComponent';
import ButtonComponent from './ButtonComponent';
import Buttonsubmit from './button';
import { Item } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from 'expo-file-system';



let styles = StyleSheet.create
  ({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    },

    statusBar: {
      backgroundColor: 'green',
      justifyContent: 'center',
      paddingLeft: 20,
      width: 400,
      paddingTop: getStatusBarHeight(),
      height: 50 + getStatusBarHeight(),

    },

    container: {
      flex: 1,
      backgroundColor: '#F0F8FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


class Main extends Component {


  constructor(props) {
    super(props)
    this.state =
    {
      source: null,
      profilePhoto: null,
      uploadSource: null,
      base64: null,
      sim: null,
      number: null,
      finalo:null,
      isLoading: false,
      
    }
  }


   componentDidMount() 
   {
   this.getPermissionAsync();  
   }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _takePhoto = async () => {

    this.setState({isLoading:true,});
    let result = await ImagePicker.launchCameraAsync
      ({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality:0.7,
        aspect: [4, 3],
        base64: true,
      });

    const LOL = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

    if (result.cancelled) {
      Alert.alert('massege', 'process cancelled!!');
    }

    if (!result.cancelled) {
      this.setState({ uploadSource: result.uri });
    }
    
    let data2 = JSON.stringify(LOL);
    //console.log(data);
    fetch('http://ec2-18-224-138-249.us-east-2.compute.amazonaws.com/upload/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: data2,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Fetch Success==================');
         console.log(responseData);
        this.setState(
          {
            sim: responseData.company,
            number: responseData.cardNo,
            isLoading:false,
          });
          Alert.alert("Done!! ... if you want to recharge press recharge");
        // console.log(this.state.sim)
      })
      .catch(error => {
        console.error(error);
      })
    //console.log(this.state.sim);


  };


  _pickImage = async () => {

    this.setState({isLoading:true,});

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    
    const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

    if (result.cancelled) {
      Alert.alert('massege', 'process cancelled!!');
    }
    if (!result.cancelled) {
      this.setState({ uploadSource: result.uri });
    }

    let data = JSON.stringify(base64);
    //console.log(data);
    fetch('http://ec2-18-224-138-249.us-east-2.compute.amazonaws.com/upload/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Fetch Success==================');
        //console.log(responseData.cardNo);
        this.setState(
          {
            sim: responseData.company,
            number: responseData.cardNo,
            isLoading:false,
          });
          Alert.alert("Done!! ... if you want to recharge press recharge");
         console.log(this.state.sim)
      })
      .catch(error => {
        console.error(error);
      })
    //console.log(this.state.sim);

  };

 
  GETCARD = (siml) => {
    let charge = '';

    switch (siml) {

      case "etisalat":
       charge = "*556*" + this.state.number + "%23"; 
        break;

      case "vodafone":
       charge = "*858#" + this.state.number + "%23"; 
        break;

      case "orange":
        charge = "%23102*" + this.state.number + "%23";
        break;

      case "we":
        charge = "*556*" + this.state.number + "%23";
        break;

      default:
       Alert.alert("SIM NOT FOUND");

    }
    this.setState({final: charge})
    return (charge);
  };


  call = async () =>{
   let phoneNumber='';
    let final= this.GETCARD(this.state.sim);
   
    console.log(final);
    if (Platform.OS === 'android') { phoneNumber = `tel:${final}`; }
    else { phoneNumber = `telprompt:${final}`; }
    Linking.openURL(phoneNumber);
  }


  render() {
    let { uploadSource } = this.state;


    return (

      <View style={styles.container}>
        <View style={styles.statusBar}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>Easy-Recharge</Text>
        </View>
        <PhotoComponent uri={this.state.uploadSource} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.isLoading && <ActivityIndicator size='large' color={"#2f5"} />}
      </View>
        <View style={{ flexDirection: 'row', paddingBottom: 40 }}>
          <ButtonComponent onPress={this._takePhoto} icon='camera' />
          <Buttonsubmit onPress={() => { this.call() }} />
          <ButtonComponent onPress={this._pickImage} icon='image' />
        </View>
      </View>

    )
  }
}

export default Main;