import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AssetDetailScreen, { Asset } from './AssetDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  AssetDetail: { asset: Asset; similarAssets: Asset[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AssetDetail" component={AssetDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
