import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantList from "./src/components/HomeScreen";
import RestaurantDetails from "./src/components/RestaurantDetails";

// import "./src/App.css";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/*
      
      RestaurantList and RestaurantDetails are components rendered by Stack.Navigator, they will receive the navigation prop. You can use this prop to navigate between screens.
      
    */}

        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{ title: "Restaurants" }}
            component={RestaurantList}
          />
          <Stack.Screen
            name="Restaurants Details"
            component={RestaurantDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
