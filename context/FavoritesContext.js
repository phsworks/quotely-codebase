import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const FavoritesQuotesContext = createContext({
  favoriteQuotes: [],
  addFavoriteQuote: (quote) => {},
  removeFavoriteQuote: (quote) => {},
});

export const FavoritesQuotesProvider = ({ children }) => {
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  useEffect(() => {
    const loadFavoriteQuotes = async () => {
      try {
        const storedQuotes = await AsyncStorage.getItem("favoriteQuotes");
        if (storedQuotes) {
          setFavoriteQuotes(JSON.parse(storedQuotes));
        }
      } catch (error) {
        console.error("Error loading favorite quotes", error);
      }
    };
    loadFavoriteQuotes();
  }, []);

  const addFavoriteQuote = async (quote) => {
    const newFavoriteQuotes = [...favoriteQuotes, quote];
    setFavoriteQuotes(newFavoriteQuotes);
    await AsyncStorage.setItem(
      "favoriteQuotes",
      JSON.stringify(newFavoriteQuotes)
    );
  };

  const removeFavoriteQuote = async (quote) => {
    const newFavoriteQuotes = favoriteQuotes.filter((q) => q !== quote);
    setFavoriteQuotes(newFavoriteQuotes);
    await AsyncStorage.setItem(
      "favoriteQuotes",
      JSON.stringify(newFavoriteQuotes)
    );
  };

  return (
    <FavoritesQuotesContext.Provider
      value={{ favoriteQuotes, addFavoriteQuote, removeFavoriteQuote }}
    >
      {children}
    </FavoritesQuotesContext.Provider>
  );
};

export default FavoritesQuotesContext;
