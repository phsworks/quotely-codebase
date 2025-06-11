import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import QuoteScreen from "./screens/QuotesMainScreen";
import QuoteCategoriesScreen from "./screens/QuoteCategoriesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import QuoteCategoryScreen from "./screens/QuoteCategoryScreen";
import { useEffect, useState } from "react";
import MenuScreen from "./screens/MenuScreen";
import { FavoritesQuotesProvider } from "./context/FavoritesContext";
import QuoteDetailsScreen from "./screens/QuoteDetailsScreen";
import InfoScreen from "./screens/InfoScreen";
import { MobileAds } from "react-native-google-mobile-ads";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function QuotelyOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8EEAEE",
        tabBarInactiveTintColor: "#676879",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "Avenir",
          fontWeight: "600",
        },
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
        component={QuoteScreen}
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
            <Feather name="menu" size={size} color={color} />
          ),
        }}
        name="Menu"
        component={MenuScreen}
      />
    </BottomTabs.Navigator>
  );
}

function AppStack() {
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
        name="QuoteDetails"
        component={QuoteDetailsScreen}
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
  const [adsInitialized, setAdsInitialized] = useState(false);
  const [adsError, setAdsError] = useState(null);

  useEffect(() => {
    async function initializeAds() {
      try {
        // Initialize the Mobile Ads SDK with more configuration options
        await MobileAds()
          .initialize()
          .then(() => {
            console.log("MobileAds initialized successfully");
            setAdsInitialized(true);
          })
          .catch((error) => {
            console.error("MobileAds initialization error:", error);
            setAdsError(error?.message || "Unknown error initializing ads");
          });
      } catch (err) {
        console.error("Failed to initialize ads:", err);
        setAdsError(err?.message || "Unknown error initializing ads");
      }
    }

    initializeAds();
  }, []);


  return (
    <FavoritesQuotesProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </FavoritesQuotesProvider>
  );
}
