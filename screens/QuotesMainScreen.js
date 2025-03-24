import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../supabase/configQuotes";
import { useState, useEffect, useCallback, useMemo } from "react";
import QuoteCard from "../components/QuoteCard";

// Debounce function defined outside component to avoid recreation
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

function QuoteScreen() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch quotes on component mount
  useEffect(() => {
    async function getQuotes() {
      try {
        setLoading(true);
        // Get quotes ordered by id to ensure consistent ordering
        const { data, error } = await supabase
          .from("famous-quotes")
          .select("*")


        if (error) {
          throw error;
        }

        // Filter out quotes with missing author images
        const validQuotes = data.filter(
          (quote) => quote && quote.author_imageURL && quote.author_name
        );

        if (validQuotes.length === 0) {
          throw new Error("No valid quotes found with author images");
        }

        setQuotes(validQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getQuotes();
  }, []);

  // Create memoized debounced search function
  const handleSearchChange = useMemo(() => {
    return debounce((text) => {
      setSearchQuery(text);
    }, 300);
  }, []);

  // Filter quotes based on search query
  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;

    return quotes.filter((quote) =>
      quote.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quotes, searchQuery]);

  // Display loading indicator while fetching quotes
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8EEAEE" />
        <Text style={styles.loadingText}>Loading quotes...</Text>
      </View>
    );
  }

  // Display error message if there was an error fetching quotes
  if (error) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for authors..."
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {filteredQuotes.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No authors found matching "{searchQuery}"
          </Text>
        </View>
      ) : (
        <View style={styles.quoteContainer}>
          <FlatList
            data={filteredQuotes}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={Dimensions.get("window").width}
            decelerationRate="fast"
            renderItem={({ item, index }) => (
              <View style={styles.pageContainer}>
                <QuoteCard index={index} item={item} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#545567",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
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
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: "#545567",
    textAlign: "center",
  },
});

export default QuoteScreen;
