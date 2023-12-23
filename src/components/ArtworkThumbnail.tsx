import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Artwork} from '../types/Artwork';

const ArtworkThumbnail = ({
  artThumbnail,
  navigation,
}: {
  artThumbnail: Artwork;
  navigation: any;
}) => {
  return (
    <View
      key={artThumbnail.id}
      style={styles.artThumbnailContainer}
      onTouchEnd={() => {
        navigation.navigate('ArtworkDetail', artThumbnail);
      }}>
      <Image
        source={{uri: artThumbnail.thumbnail.lqip}}
        style={styles.previewImage}
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
  },
});

export default ArtworkThumbnail;
