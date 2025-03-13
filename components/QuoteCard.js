import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Share } from "react-native";
import { useContext } from "react";
import FavoritesQuotesContext from "../context/FavoritesContext";


function QuoteCard({ item, index }) {
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

  function shareQuote() {
    Share.share({
      message: `Check out this Quote from Quotely: ${item.quote}`,
      title: "Quote alert",
    });
  }

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={getGradientColors(index)}
        style={styles.quoteContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardTop}>
          <Image source={{ uri: item.author_imageURL }} style={styles.image} />
          <View style={styles.quoteInfo}>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>
              {item.quote_category}
            </Text>
            <Text style={{ fontSize: 12 }}>{item.author_name}</Text>
            <View style={styles.origins}>
              <Text style={{ fontSize: 12 }}>{item.author_nationality}</Text>
              <Text style={{ fontSize: 12 }}>{item.author_occupation}</Text>
            </View>
          </View>
        </View>
        <View style={styles.quoteSection}>
          <Text style={styles.quoteText}>"{item.quote}"</Text>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity style={styles.buttons} onPress={shareQuote}>
            <Feather name="share" size={24} color="#e4ffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => toggleFavorite(item)}
          >
            {!isFavorite(item) ? (
              <Feather name="heart" size={24} color="#e4ffff" />
            ) : (
              <AntDesign name="heart" size={24} color="#e4ffff" />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    width: "90%",
    height: "73%",
  },
  quoteContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 30,
    borderRadius: 20,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    elevation: 4,
    opacity: 0.85,
    paddingTop: 10,
  },
  quoteInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: 130,
    gap: 5,
  },
  quoteSection: {
    width: 280,
  },
  quoteText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120,
    resizeMode: "cover",
  },
  cardTop: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 45,
  },
  origins: {
    flexDirection: "row",
    gap: 3,
  },
  cardBottom: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 80,
  },
  buttons: {
    borderRadius: 50,
    padding: 25,
    borderWidth: 0.5,
    borderColor: "#e4ffff",
    boxShadow: "0 15px 20px 5px rgba(158, 158, 158, 0.293)",
    elevation: 4,
    opacity: 0.8,
  },
});

export default QuoteCard;
