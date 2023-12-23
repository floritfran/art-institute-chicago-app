import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Artwork} from '../types/Artwork';

const ArtworkDetail = ({route}) => {
  const artwork: Artwork = route.params;

  return (
    <View style={styles.container}>
      <Text>{artwork.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default ArtworkDetail;
