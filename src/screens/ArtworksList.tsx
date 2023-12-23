import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Button, Text, View} from 'react-native';
import ArtworkThumbnail from '../components/ArtworkThumbnail';

const ArtworksList = ({navigation}) => {
  const [artThumbnails, setArtThumbnails] = useState([]);

  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks')
      .then(response => response.json())
      .then(responseJson => {
        setArtThumbnails(responseJson.data);
      });
  }, []);

  const getArtThumbnails = () =>
    artThumbnails.map(artThumbnail => (
      <ArtworkThumbnail artThumbnail={artThumbnail} navigation={navigation} />
    ));

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text style={styles.title}>Art Institute Chicago App</Text>
        <View style={styles.body}>{getArtThumbnails()}</View>
      </View>
      <Button
        title={'Favorites'}
        onPress={() => navigation.navigate('Favorites')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'center',
  },
  body: {
    justifyCenter: 'center',
    alignItems: 'center',
  },
});

export default ArtworksList;
