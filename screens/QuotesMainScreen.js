import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { supabase } from "../supabase/configQuotes";
import { useState, useEffect, useMemo, useRef } from "react";
import QuoteCard from "../components/QuoteCard";

import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const INTERSTITIAL_UNIT_ID = Platform.select({
  ios: "ca-app-pub-3940256099942544/4411468910",
});

// Debounce helper
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
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

  // Ad logic setup
  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(
      INTERSTITIAL_UNIT_ID,
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ["quotes", "inspiration", "motivation"],
      }
    );

    interstitialRef.current = interstitial;

    const unsubLoad = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
        if (swipeCount.current >= 10 && interstitialRef.current) {
          interstitialRef.current.show();
          swipeCount.current = 0;
          setAdLoaded(false);
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
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubLoad();
      unsubError();
      unsubClose();
    };
  }, []);

  // Fetch quotes from Supabase
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

        setQuotes(shuffleArray(validQuotes));
      } catch (error) {
        setError(error.message);
        console.error("Error fetching quotes:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getQuotes();
  }, []);

  const handleSwipe = () => {
    swipeCount.current += 1;

    if (swipeCount.current >= 12) {
      if (adLoaded && interstitialRef.current) {
        interstitialRef.current.show();
        swipeCount.current = 0;
        setAdLoaded(false);
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
