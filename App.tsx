import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [artThumbnails, setArtThumbnails] = useState([]);

  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks')
      .then(response => response.json())
      .then(responseJson => {
        setArtThumbnails(responseJson.data);
      });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getArtThumbnails = () =>
    artThumbnails.map(artThumbnail => (
      <View key={artThumbnail.id} style={styles.artThumbnailContainer}>
        <Image
          source={{uri: artThumbnail.thumbnail.lqip}}
          style={styles.previewImage}
        />
        <Text>{artThumbnail.title}</Text>
      </View>
    ));

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.title}>Art Institute Chicago App</Text>
          <View style={styles.body}>{getArtThumbnails()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  previewImage: {
    height: 50,
    width: 50,
  },
  artThumbnailContainer: {
    alignItems: 'center',
    margin: 10,
  },
});

export default App;
