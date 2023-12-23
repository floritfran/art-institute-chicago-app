import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ArtworksList from './src/screens/ArtworksList';
import FavoritesList from './src/screens/FavoritesList';
import ArtworkDetail from './src/screens/ArtworkDetail';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ArtworkList"
          component={ArtworksList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ArtworkDetail"
          component={ArtworkDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
