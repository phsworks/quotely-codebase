import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Share } from "react-native";
import { useContext, useRef, useEffect, useState } from "react";
import FavoritesQuotesContext from "../context/FavoritesContext";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

function QuoteCard({ item, index }) {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const imageRef = useRef();

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
      ["#ff5833ed", "#ffc400ff"],
      ["#33ff58ff", "#00c5ccff"],
      ["#fc5677ff", "#7e93ffff"],
      ["#1f4037ff", "#99f2c8ff"],
      ["#d9a7c7ff", "#f7b675ff"],
      ["#297fb9ff", "#6dd4faff"],
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    if (permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  async function shareQuote() {
    try {
      // Hide buttons before capturing
      setButtonsVisible(false);

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Capture the view
      const uri = await captureRef(imageRef.current, {
        format: "png",
        quality: 1.0,
      });

      // Share the image
      await Share.share({
        url: uri,
        title: "Quote alert",
        message: "Check out this Quote from Quotely!",
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
    } finally {
      setButtonsVisible(true);
    }
  }

  return (
    <>
      <View ref={imageRef} style={styles.outerContainer}>
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
              <Text style={{ fontWeight: 800, fontSize: 16, color: "#000000" }}>``
                {item.quote_category}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600, color: "#000000" }}>
                {item.author_name}
              </Text>
              <View style={styles.origins}>
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#000000" }}
                >
                  {item.author_nationality}
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#000000" }}
                >
                  {item.author_occupation}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.quoteSection}>
            <Text style={styles.quoteText}>"{item.quote}"</Text>
          </View>
          <View style={styles.cardBottom}>
            <Pressable
              style={buttonsVisible ? styles.buttons : styles.buttonsInvisible}
              onPress={shareQuote}
            >
              <Feather name="share" size={24} color="#e4ffff" />
            </Pressable>
            <TouchableOpacity
              style={buttonsVisible ? styles.buttons : styles.buttonsInvisible}
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
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    width: "90%",
    height: "82%",
  },
  quoteContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    elevation: 4,
    paddingTop: 10,
    opacity: 0.8,
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
    fontSize: 21,
    marginBottom: 10,
    textAlign: "center",
    color: "#000000",
    fontFamily: "playfairdisplay",
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
    marginBottom: 30,
  },
  origins: {
    flexDirection: "row",
    gap: 3,
  },
  cardBottom: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 80,
    marginTop: 30,
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
  buttonsInvisible: {
    display: "none",
  },
});

export default QuoteCard;
