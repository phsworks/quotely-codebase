import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";

import QuoteMainScreen from "./screens/QuotesMainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import QuoteCategoriesScreen from "./screens/QuoteCategoriesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import QuoteCategoryScreen from "./screens/QuoteCategoryScreen";
import { useColorScheme, StyleSheet, View } from "react-native";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function QuotelyOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8EEAEE",
        tabBarInactiveTintColor: "#4a5a5b",
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingTop: 5,
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="cloud" size={size} color={color} />
          ),
        }}
        name="Quotes"
        component={QuoteMainScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
        name="Categories"
        component={QuoteCategoriesScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
        name="Favorites"
        component={FavoritesScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(systemColorScheme);

  function toggleColorScheme() {
    setColorScheme((prevScheme) => (prevScheme === "dark" ? "light" : "dark"));
  }

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Quotely Overview"
            component={QuotelyOverview}
            options={{
              headerLeft: () => (
                <Feather
                  onPress={toggleColorScheme}
                  name={colorScheme === "dark" ? "sun" : "moon"}
                  size={27}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              ),
              headerTitle: "",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#171717" : "#f2f2f2",
              },
            }}
          />
          <Stack.Screen
            name="Quote Category"
            component={QuoteCategoryScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
