import React, { Component } from 'react';
import { StyleSheet, alert, Linking, Platform, Button, View, ImageBackground, Text,Image,TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PhotoComponent from './PhotoComponent';
import ButtonComponent from './ButtonComponent';
import  Buttonsubmit from './button';
import { Item } from 'native-base';


let styles = StyleSheet.create
({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  /*container:{
      flex :1,
  },*/
  statusBar: {
    backgroundColor: "blue",
    height: 90,
  },

    container: {
      flex: 1,
      backgroundColor: '#ececeb',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
      height:50,
      fontSize:40,
      color:"#000",
      marginBottom:20
    },
    callTxt:{
      backgroundColor:"#42b883",
      padding:10,
      borderRadius:30,
      width:80,
      textAlign:"center",
      color:"#fff",
      fontSize:30
    }
});


class Main extends Component
 {
  
  number = 123558496; //the number from kart el she7n :)

  constructor(props)
  {
    super(props)
    this.state =
    {
      uploadSource: null,
    }
  }
  componentDidMount() 
  {
  this.getPermissionAsync();  
  }

  getPermissionAsync = async () =>
  {
    if (Constants.platform.ios)
    {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted')
     {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () =>
  {
      let result = await ImagePicker.launchImageLibraryAsync
      ({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        base64: true,
      });
      console.log(result);
      if (!result.cancelled) 
      {
        this.setState({ uploadSource: result.uri });
      }
  };


  _takePhoto = async () =>
  {
      let result = await ImagePicker.launchCameraAsync
      ({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
      });
      console.log(result);
      if (!result.cancelled)
     {
        this.setState({ uploadSource: result.uri });
      }
  };


  call = async (number) =>
  {
      let phoneNumber = '';
      if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
      else {phoneNumber = `telprompt:${number}`; }
      Linking.openURL(phoneNumber); 
  }

  render(){
      let { uploadSource } = this.state;
      
      let sim = "vodafone"; //noo3 el sim eeh men kart el sha7n bardo ;)
      let charge=" ";

      switch(sim) 
      {
 
        case "etisalat":
          charge="*556*"+ this.number +"#";
          break;
      
        case "vodafone":
          charge = "*858*" + this.number + "Hashtag";
          break;
 
        case "orange":
          charge="*556*"+ this.number +"#";
          break;

        case "we":
          charge= "*556*" + this.number + "#";
          break;

        default:
          Alert.alert("SIM NOT FOUND");
    
      }

      return(
        <View style={styles.container}>
        <View style={styles.statusBar }><Text style={{color: 'white', fontSize: 18, textAlign: 'center',fontWeight: 'bold' }}>charge</Text></View>
        <PhotoComponent uri={this.state.uploadSource} />
        <View style={{ flexDirection: 'row', paddingBottom: 40 }}>
        <ButtonComponent onPress={this._takePhoto} icon='camera'/>
        <Buttonsubmit onPress={ ()=>{this.call(charge)}}/>
        <ButtonComponent onPress={this._pickImage} icon='image'/>
        </View>
        </View>
 )
}
}

export default Main;