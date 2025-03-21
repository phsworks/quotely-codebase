import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import QuoteMainScreen from "./screens/QuotesMainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import QuoteCategoriesScreen from "./screens/QuoteCategoriesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import QuoteCategoryScreen from "./screens/QuoteCategoryScreen";
import { StatusBar } from "react-native";
import { useState, useEffect } from "react";
import LandingScreen from "./screens/LandingScreen";
import AuthScreen from "./screens/AuthScreen";
import { supabase } from "./supabase/configUsers";
import SettingsScreen from "./screens/SettingsScreen";
import { FavoritesQuotesProvider } from "./context/FavoritesContext";
import QuoteDetailsScreen from "./screens/QuoteDetailsScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import InfoScreen from "./screens/InfoScreen";



const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function QuotelyOverview({ session }) {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8EEAEE",
        tabBarInactiveTintColor: "#676879",
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
        initialParams={{ session }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStack({ session }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Quotely Overview"
        component={QuotelyOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quote Category"
        component={QuoteCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuoteDetails"
        component={QuoteDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  function toggleColorScheme() {
    setColorScheme((prevScheme) => (prevScheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <FavoritesQuotesProvider>
      <NavigationContainer>
        {session ? (
          <AppStack
            session={session}
          />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </FavoritesQuotesProvider>
  );
}
