import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import FavoritesQuotesContext from "../context/FavoritesContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// Predefined gradient colors for quote cards
const GRADIENT_COLORS = [
  ["#ff5833c8", "#ffc400c2"],
  ["#33ff58b9", "#00c5ccb4"],
  ["#fc5677c0", "#7e93ffb5"],
  ["#1f4037b6", "#99f2c8bb"],
  ["#d9a7c7c2", "#f7b67599"],
  ["#ff9966c3", "#ff5e61b7"],
  ["#297fb9c2", "#6dd4fabc"],
];

// Quote card component
const QuoteCard = ({ item, index, onPress }) => {
  const gradientColors = GRADIENT_COLORS[index % GRADIENT_COLORS.length];

  return (
    <Pressable onPress={onPress}>
      <View style={styles.outerContainer}>
        <LinearGradient
          colors={gradientColors}
          style={styles.quoteContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.quoteSection}>
            <Text style={styles.quoteText}>{item.quote}</Text>
          </View>
          <View style={styles.cardBottom}>
            <Image
              source={{ uri: item.author_imageURL }}
              style={styles.image}
            />
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

function FavoritesScreen() {
  const { favoriteQuotes } = useContext(FavoritesQuotesContext);
  const navigation = useNavigation();
  const totalFavoriteQuotes = favoriteQuotes.length;

  const handleQuotePress = (item, index) => {
    navigation.navigate("QuoteDetails", {
      item: item,
      index: index,
    });
  };

  if (favoriteQuotes.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.noFavoritesText}>No favorite quotes yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {totalFavoriteQuotes > 1 && (
        <View style={styles.totalFavoriteQuotes}>
          <Text style={styles.totalCountText}>
            {totalFavoriteQuotes} Favorite Quotes
          </Text>
        </View>
      )}

      <FlatList
        data={favoriteQuotes}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <QuoteCard
            item={item}
            index={index}
            onPress={() => handleQuotePress(item, index)}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  noFavoritesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noFavoritesText: {
    fontFamily: "Avenir",
    fontSize: 16,
    color: "#36363c",
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 8,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  quoteContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "rgba(149, 157, 165, 0.2)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  outerContainer: {
    width: 180,
    height: 130,
    marginTop: 10,
  },
  cardBottom: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 120,
    resizeMode: "cover",
  },
  quoteSection: {
    flex: 1,
    minWidth: 120,
    maxWidth: 160,
    minHeight: 40,
    maxHeight: 90,
  },
  quoteText: {
    fontSize: 10,
    textAlign: "center",
    color: "#36363c",
    fontFamily: "Avenir",
    fontWeight: "500",
    paddingTop: 20,
  },
  totalFavoriteQuotes: {
    width: "100%",
    height: "5%",
    justifyContent: "center",
  },
  totalCountText: {
    textAlign: "center",
    color: "#74d4da",
    fontFamily: "Avenir",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default FavoritesScreen;
