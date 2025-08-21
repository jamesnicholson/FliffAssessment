import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AssetDetail, { Asset } from "./AssetDetail";

export type RootStackParamList = {
  Home: undefined;
  AssetDetail:  { asset: Asset } 
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AssetDetail" component={AssetDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}