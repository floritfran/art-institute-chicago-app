import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Artwork} from '../types/Artwork';
import Icon from 'react-native-vector-icons/FontAwesome';
import Realm from '../persistence/Realm';

const icons = {
  heartEmpty: 'heart-o',
  heartFull: 'heart',
};

const ArtworkThumbnail = ({
  artThumbnail,
  navigation,
}: {
  artThumbnail: Artwork;
  navigation: any;
}) => {
  const isFavorite = () => {
    return (
      Realm.isLoaded() && Realm.findById('FavoriteArtworks', artThumbnail.id)
    );
  };

  const toggleFavorite = () => {
    if (isFavorite()) {
      Realm.deleteById('FavoriteArtworks', artThumbnail.id);
    } else {
      Realm.saveToSchema('FavoriteArtworks', [artThumbnail]);
    }
  };

  const getIcon = () => {
    let icon;

    if (isFavorite()) {
      icon = icons.heartFull;
    } else {
      icon = icons.heartEmpty;
    }

    return icon;
  };

  return (
    <View key={artThumbnail.id} style={styles.artThumbnailContainer}>
      <Icon
        style={styles.icon}
        name={getIcon()}
        size={20}
        color={'red'}
        onPress={toggleFavorite}
      />
      <Image
        source={{uri: artThumbnail.thumbnail.lqip}}
        style={styles.previewImage}
        onTouchEnd={() => navigation.navigate('ArtworkDetail', artThumbnail)}
      />
      <Text>{artThumbnail.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    height: 50,
    width: 50,
  },
  artThumbnailContainer: {
    alignItems: 'center',
    margin: 10,
    width: '30%',
  },
  icon: {
    alignSelf: 'flex-end',
  },
});

export default ArtworkThumbnail;
