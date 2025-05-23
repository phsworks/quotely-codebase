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

// Production ad unit IDs
const PRODUCTION_INTERSTITIAL_UNIT_ID = {
  ios: "ca-app-pub-3363401404948517/3015333117",
  android: "ca-app-pub-3363401404948517/9389169738",
};

// Get the correct ad unit ID based on platform
const getAdUnitId = () => {
  return Platform.OS === "ios"
    ? PRODUCTION_INTERSTITIAL_UNIT_ID.ios
    : PRODUCTION_INTERSTITIAL_UNIT_ID.android;
};

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

  const swipeCount = useRef(0);
  const interstitialRef = useRef(null);
  const adUnitId = getAdUnitId();

  // Ad logic setup
  useEffect(() => {
    const loadInterstitial = () => {
      try {
        const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
          requestNonPersonalizedAdsOnly: true,
          keywords: ["quotes", "inspiration", "motivation"],
        });

        interstitialRef.current = interstitial;

        const unsubLoad = interstitial.addAdEventListener(
          AdEventType.LOADED,
          () => {
            setAdLoaded(true);
          }
        );

        const unsubError = interstitial.addAdEventListener(
          AdEventType.ERROR,
          () => {
            setAdLoaded(false);
            // Retry loading after error (with a delay)
            setTimeout(() => {
              interstitial.load();
            }, 60000); // retry after 1 minute
          }
        );

        const unsubClosed = interstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setAdLoaded(false);
            // Load a new ad when the current one is closed
            interstitial.load();
          }
        );

        interstitial.load();

        return () => {
          unsubLoad();
          unsubError();
          unsubClosed();
        };
      } catch (err) {
        console.error("Failed to set up ad:", err);
      }
    };

    loadInterstitial();
  }, [adUnitId]);

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

  const showAdIfAvailable = () => {
    // Consistent threshold of 10 swipes
    const SWIPE_THRESHOLD = 10;

    if (swipeCount.current >= SWIPE_THRESHOLD) {
      if (adLoaded && interstitialRef.current) {
        try {
          interstitialRef.current.show();
          swipeCount.current = 0;
        } catch (err) {
          // Reset and try to load a new ad
          setAdLoaded(false);
          if (interstitialRef.current) {
            interstitialRef.current.load();
          }
        }
      }
    }
  };

  const handleSwipe = () => {
    swipeCount.current += 1;
    showAdIfAvailable();
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
          placeholderTextColor="#737373"
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  quoteContainer: {
    flex: 1,
  },
  pageContainer: {
    width: Dimensions.get("window").width,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.40,
    shadowRadius: 5,
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
