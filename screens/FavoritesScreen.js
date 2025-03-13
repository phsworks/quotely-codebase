import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import FavoritesQuotesContext from "../context/FavoritesContext";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Share } from "react-native";
import { useNavigation } from "@react-navigation/native";

function FavoritesScreen() {
  const { favoriteQuotes, addFavoriteQuote, removeFavoriteQuote } = useContext(
    FavoritesQuotesContext
  );

  function shareQuote(item) {
    Share.share({
      message: `Check out this Quote from Quotely: ${item.quote}`,
      title: "Quote alert",
    });
  }

  const navigation = useNavigation();

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
          <Pressable onPress={() => {
            console.log(item); 
            navigation.navigate("QuoteDetails", { item: item, index: index });
          }}>
            <View style={styles.outerContainer}>
              <LinearGradient
                colors={getGradientColors(index)}
                style={styles.quoteContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.quoteSection}>
                  <Text style={styles.quoteText}>"{item.quote}"</Text>
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
    justifyContent: "center",
    borderRadius: 10,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    elevation: 4,
  },
  outerContainer: {
    width: 180,
    height: 130,
    marginTop: 10,
  },
  quoteInfo: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: 'center',
    minWidth: 80,
    maxWidth: 120,
  },
  cardBottom: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
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
    color: "black",
    fontFamily: "Roboto",
    fontWeight: "400",
    paddingTop: 20,
  },
  favoriteQuotesList: {
    paddingBottom: 50,
  },
});

export default FavoritesScreen;
