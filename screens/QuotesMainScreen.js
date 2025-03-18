import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { supabase } from "../supabase/configQuotes";
import { useState, useEffect, useCallback } from "react";
import QuoteCard from "../components/QuoteCard";


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function QuoteScreen() {
  const [quotes, setQuotes] = useState([]);
  const [originalQuotes, setOriginalQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    async function getQuotes() {
      let { data, error } = await supabase.from("famous-quotes").select("*");

      if (error) {
        setError(error.message);
        console.log("There was an error", error);
      } else {
        const authorImages = {};

        data.forEach((quote) => {
          if (quote.author_imageURL && !authorImages[quote.author_name]) {
            authorImages[quote.author_name] = quote.author_imageURL;
          }
        });

        const updatedQuotes = data.map((quote) => {
          return {
            ...quote,
            author_imageURL:
              authorImages[quote.author_name] || quote.author_imageURL,
          };
        });

        // Shuffle the quotes randomly
        const shuffledQuotes = shuffleArray(updatedQuotes);
        setQuotes(shuffledQuotes);
        setOriginalQuotes(shuffledQuotes); // Set original quotes
      }
    }
    getQuotes();
  }, []);

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <Text>There was an error (error)</Text>
      </View>
    );
  }

  // Debounce function to limit how often search is performed
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Create memoized debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query) {
        setQuotes(originalQuotes); // Reset to original quotes
      } else {
        const filteredQuotes = originalQuotes.filter((quote) => {
          return quote.author_name.toLowerCase().includes(query.toLowerCase());
        });
        setQuotes(filteredQuotes);
      }
    }, 300),
    [originalQuotes]
  );

  // Apply search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);



  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for authors..."
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.quoteContainer}>
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={Dimensions.get("window").width}
          decelerationRate="fast"
          renderItem={({ item, index }) => (
            <View  style={styles.pageContainer}>
              <QuoteCard index={index} item={item} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingTop: "22%",
  },
  searchBar: {
    width: 350,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    paddingHorizontal: 20,
    color: "#8EEAEE",
    fontWeight: 600,
    fontSize: 18,
  },
  quoteContainer: {
    flex: 1,
  },
  pageContainer: {
    width: Dimensions.get("window").width,
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuoteScreen;
