import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const FavoritesList = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text style={styles.container}>aaaaa</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    heigth: '80%',
  },
});

export default FavoritesList;
