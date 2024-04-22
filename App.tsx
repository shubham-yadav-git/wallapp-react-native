import { StyleSheet, Text, View } from 'react-native'
import Firebasedata from './components/Firebasedata'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePage from './components/ImagePage';


// console.log(data);

// export type RootStackParamList={
//   Firebasedata : undefined,
//   ImageData: {id:3}
// }

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element{

  return(
    <View style={styles.data}>
      <Text>imagePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    data: {
      fontSize: 40,
      color: 'green',
    }
})
