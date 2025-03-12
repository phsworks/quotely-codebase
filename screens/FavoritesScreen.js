import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import FavoritesQuotesContext from "../context/FavoritesContext";
import { useContext } from "react";
import QuoteCard from "../components/QuoteCard";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { Share } from "react-native";

function FavoritesScreen() {
  const { favoriteQuotes, addFavoriteQuote, removeFavoriteQuote } = useContext(
    FavoritesQuotesContext
  );

  const isFavorite = (quote) => favoriteQuotes.includes(quote);

  const toggleFavorite = (quote) => {
    if (isFavorite(quote)) {
      removeFavoriteQuote(quote);
    } else {
      addFavoriteQuote(quote);
    }
  };

  function shareQuote() {
    Share.share({
      message: `Check out this Quote from Quotely: ${item.quote}`,
      title: "Quote alert",
    });
  }

  const getGradientColors = (index) => {
    const gradients = [
      ["#ff5833c8", "#ffc400c2"],
      ["#33ff58b9", "#00c5ccb4"],
      ["#fc5677c0", "#7e93ffb5"],
      ["#1f4037b6", "#99f2c8bb"],
      ["#d9a7c7c2", "#f7b67599"],
      ["#ff9966c3", "#ff5e61b7"],
      ["#297fb9c2", "#6dd4fabc"],
    ];
    return gradients[index % gradients.length];
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteQuotes}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <View style={styles.outerContainer}>
              <LinearGradient
                colors={getGradientColors(index)}
                style={styles.quoteContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardTop}>
                  <Image
                    source={{ uri: item.author_imageURL }}
                    style={styles.image}
                  />
                  <View style={styles.quoteInfo}>
                    <Text style={{ fontSize: 10 }}>{item.author_name}</Text>
                  </View>
                </View>
                <View style={styles.quoteSection}>
                  <Text style={styles.quoteText}>"{item.quote}"</Text>
                </View>
              </LinearGradient>
            </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.favoriteQuotesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "space-around",
    gap: 8,
  },
  quoteContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    elevation: 4,
  },
  outerContainer: {
    width: 180,
    height: 140,
    marginTop: 10,
  },
  quoteInfo: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: 'center',
    minWidth: 80,
    maxWidth: 120,
  },
  cardTop: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
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
    maxHeight: 80,
  },
  quoteText: {
    fontSize: 9,
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  favoriteQuotesList: {
    paddingBottom: 50,
  },

});

export default FavoritesScreen;
