import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import Toast from 'react-native-toast-message';






// Define the type for the message parameter
const showToast = (message: string): void => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

// Call this function where you want to show the toast message






// Define the types for your route parameters
type RootStackParamList = {
  ImagePage: {
    message: {
      data:{},
      details:{
        image:string
      }
    };
  };
};

// Define the type for the route prop
type ImagePageRouteProp = RouteProp<RootStackParamList, 'ImagePage'>;

interface ImagePageProps {
  route: ImagePageRouteProp;
}

const ImagePage: React.FC<ImagePageProps> = ({ route }) => {



  // Access the route parameter
  const dataReceived = route.params.message;

  const handleSetWallpaper = (imageUri: string) => {
    ManageWallpaper.setWallpaper(
      {
        uri: imageUri,
      },
      (res: string) => showToast('Wallpaper set successfully!'),
      TYPE.HOME // or TYPE.LOCK to set lock screen wallpaper
    );
  };


  return (
    <View style={styles.container}>
      <Image
      source={{ uri: dataReceived.details.image }}
      // style={{ width:"100%", height: "100%" }}
      style={styles.imageView}
      />
      <Toast/>
      <Button
      title='Set Wallpaper'
      // style={styles.buttonStyle}
      onPress={() => handleSetWallpaper(dataReceived.details.image)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:4
  },

  imageView: {
    flex:2,
    width:"100%", height: "100%",
    marginBottom:4
  },

  buttonStyle: {
    // flex:
  }
  // Add other styles if needed
});

export default ImagePage;
