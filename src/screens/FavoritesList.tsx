import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Realm from '../persistence/Realm';
import ArtworkThumbnail from '../components/ArtworkThumbnail';
import {Artwork} from '../types/Artwork';

const FavoritesList = ({navigation}) => {
  const [favorites, setFavorites] = useState(Realm.findAll('FavoriteArtworks'));

  useEffect(() => {
    Realm.subscribeToSchemaChanges('FavoriteArtworks', (fav: Artwork) =>
      setFavorites(fav),
    );
  }, []);

  const getFavoriteArtworkThumbnails = () =>
    favorites.map((artThumbnail: Artwork) => (
      <ArtworkThumbnail artThumbnail={artThumbnail} navigation={navigation} />
    ));

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.body}>{getFavoriteArtworkThumbnails()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyCenter: 'center',
    alignItems: 'center',
  },
});

export default FavoritesList;
