// TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ContribuicoesScreen from "../screens/ContribuicoesScreen";
import { View } from "react-native-animatable";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Contribuicoes" component={ContribuicoesScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 5,
          height: 60, // Ajusta a altura da barra para evitar sobreposição
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: () => null, // Remove o label da home
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={48}
              color={focused ? "#FF6347" : "#007BFF"}
            />
          ),
          tabBarItemStyle: {
            flexDirection: "column",
            alignItems: "center",
            marginTop: -12,
            backgroundColor: "#ffffff",
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
