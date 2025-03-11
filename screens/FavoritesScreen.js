import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import FavoritesQuotesContext from "../context/FavoritesContext";
import { useContext } from "react";
import QuoteCard from "../components/QuoteCard";


function FavoritesScreen() {
  const { favoriteQuotes, addFavoriteQuote, removeFavoriteQuote } = useContext(
    FavoritesQuotesContext
  );
  console.log(favoriteQuotes)

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteQuotes}
        keyExtractor={(item) => item.quote}
        renderItem={({ item, index }) => (
            <Text>{item.quote}</Text>
        )}
      />k
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default FavoritesScreen;
