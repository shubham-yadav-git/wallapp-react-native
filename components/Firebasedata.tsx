import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation stack and route names as needed
type RootStackParamList = {
  ImagePage: {
    message:{}
  };
  
};

type FirebasedataNavigationProp = StackNavigationProp<RootStackParamList, 'ImagePage'>;

interface FirebasedataProps {
  navigation: FirebasedataNavigationProp;
}

interface DataDetails {
  image: string;
  search: string;
  title: string;
}

interface DataObject {
  id: string;
  details: DataDetails;
}

export default function Firebasedata({ navigation }: FirebasedataProps) {
  const [data, setData] = useState<{ [key: string]: DataDetails }>({});
  const [natureData, setNatureData] = useState<{ [key: string]: DataDetails }>({});
  const [superHeroData, setSuperHeroData] = useState<{ [key: string]: DataDetails }>({});

  useEffect(() => {
    Promise.all([
      database().ref('/Data').once('value'),
      database().ref('/nature').once('value'),
      database().ref('/random').once('value'),
    ]).then(([userDataSnapshot, natureDataSnapshot, superHeroDataSnapshot]) => {
      setData(userDataSnapshot.val());
      setNatureData(natureDataSnapshot.val());
      setSuperHeroData(superHeroDataSnapshot.val());
    });
  }, []);

  const dataArray: DataObject[] = Object.entries(data).map(([id, details]) => ({ id, details }));
  const natureArray: DataObject[] = Object.entries(natureData).map(([id, details]) => ({ id, details }));
  const superHeroArray: DataObject[] = Object.entries(superHeroData).map(([id, details]) => ({ id, details }));

  // Merge the arrays
  const mergedArray: DataObject[] = [...dataArray, ...natureArray, ...superHeroArray];

  return (
    <View style={styles.parentContainer}>
      <FlatList
        data={mergedArray}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ImagePage', {message: item})}>
            <View style={styles.card}>
              <Image
                source={{ uri: item.details.image }}
                style={{ width: 100, height: 150 }} // You can adjust the style as needed
              />
              <Text style={styles.cardTitle}>{item.details.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'lightblue',
    elevation: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 100,
    color: '#000',
  },
  parentContainer: {
    // Uncomment and adjust these styles as needed
    // flex: 1,
    // flexDirection: 'column',
    // margin: 1,
    // marginBottom: 100,
  },
});
