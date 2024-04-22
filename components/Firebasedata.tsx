import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';


export default function Firebasedata() {
    
    let [data, setData] = useState({});
    let [natureData, setNatureData] = useState({});
    let [superHeroData, setSuperHeroData] = useState({});


    useEffect(() => {
        const userdata = database().ref('/Data').once('value').then(snapshot => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
        });
        const naturedata = database().ref('/nature').once('value').then(snapshot => {
            const fetchedData = snapshot.val();
            setNatureData(fetchedData);
        });
        const superHeroData = database().ref('/random').once('value').then(snapshot => {
            const fetchedData = snapshot.val();
            setSuperHeroData(fetchedData);
        });
    }, []);


    interface DataDetails {
        image: string;
        search: string;
        title: string;
    }

    interface DataObject {
        id: string;
        details?: DataDetails;
    }

    const dataArray: DataObject[] = Object.entries(data).map(([id, details]): DataObject => ({ id, ...details }));
    const natureArray: DataObject[] = Object.entries(natureData).map(([id, details]): DataObject => ({ id, ...details }));
    const superHeroArray: DataObject[] = Object.entries(superHeroData).map(([id, details]): DataObject => ({ id, ...details }));

    // Merge the arrays
    const mergedArray: DataObject[] = [...dataArray, ...natureArray, ...superHeroArray];


    console.log(dataArray);

    return (
        <View style={styles.parentContainer}>
  <FlatList
    data={mergedArray}
    renderItem={({ item }) => (
    //   <TouchableOpacity onPress={() => navigation.navigate('ImagePage', { item })} style={styles.card}>
        <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 150 }} // You can adjust the style as needed
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
    //   </TouchableOpacity>
    )}
    keyExtractor={item => item.id}
    numColumns={3}
    columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
  />
</View>

    )
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
        color: '#000'
    },
    parentContainer: {
        // flex:1,
        // flexDirection: 'column',
        // margin:1
        marginBottom: 100
    }
})