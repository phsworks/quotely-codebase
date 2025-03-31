import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import { supabase } from "../supabase/configQuotes";
import { useState, useEffect, useMemo, useRef } from "react";
import QuoteCard from "../components/QuoteCard";

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

// Debounce helper
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

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function QuoteScreen() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(null);

  const swipeCount = useRef(0);
  const interstitialRef = useRef(null);




  // Setup ad logic
  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL,
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ["quotes", "inspiration", "motivation"],
      }
    );

    interstitialRef.current = interstitial;

    // 👇 Place the updated LOADED event listener here
    const unsubLoad = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("Ad loaded");
        setAdLoaded(true);

        // 👉 Check if user already hit 10 swipes while ad was loading
        if (swipeCount.current >= 10 && interstitialRef.current) {
          interstitialRef.current.show();
          setAdLoaded(false);
          swipeCount.current = 0;
        }
      }
    );

    const unsubError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.warn("Ad error:", error);
        setAdError(error?.message || "Unknown ad error");
      }
    );

    const unsubClose = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        interstitial.load(); // reload after close
      }
    );

    interstitial.load();

    return () => {
      unsubLoad();
      unsubError();
      unsubClose();
    };
  }, []);

  // Get quotes from Supabase
  useEffect(() => {
    async function getQuotes() {
      try {
        setLoading(true);
        const { data, error } = await supabase
        .from("famous-quotes")
        .select("*");

        if (error) throw error;

        const validQuotes = data.filter(
          (quote) => quote && quote.author_imageURL && quote.author_name
        );

        if (validQuotes.length === 0) {
          throw new Error("No valid quotes found with author images");
        }

        const shuffledQuotes = shuffleArray(validQuotes);
        setQuotes(shuffledQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getQuotes();
  }, []);


  const handleSwipe = () => {
    swipeCount.current += 1;
    console.log("Swipe count:", swipeCount.current);

    if (swipeCount.current >= 10) {
      if (adLoaded && interstitialRef.current) {
        console.log("Showing ad...");
        interstitialRef.current.show();
        setAdLoaded(false); // wait for it to reload after close
        swipeCount.current = 0;
      } else {
        console.log("Ad not ready yet, will show when loaded");
        // We DON'T reset swipeCount here
        // We wait for ad to load and show it on the NEXT swipe
      }
    }
  };


  const handleSearchChange = useMemo(() => {
    return debounce((text) => {
      setSearchQuery(text);
    }, 300);
  }, []);

  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;

    return quotes.filter((quote) =>
      quote.author_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [quotes, searchQuery]);

if (loading) {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8EEAEE" />
        <Text style={styles.loadingText}>Loading quotes...</Text>
      </View>
    );
  }

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
            onMomentumScrollEnd={handleSwipe}
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
    fontWeight: "600",
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
