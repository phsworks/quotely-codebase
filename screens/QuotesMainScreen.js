import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { supabase } from "../supabase/config";
import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";

function QuoteScreen() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuotes() {
      let { data, error } = await supabase.from("famous-quotes").select("*");

      if (error) {
        setError(error.message);
        console.log("There was an error", error);
      } else {
        setQuotes(data);
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

  return (
    <View style={styles.mainContainer}>
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
            <View style={styles.pageContainer}>
              <QuoteCard index={index} item={item} />
            </View>
          )}
        />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quoteContainer: {
    flex: 1,
  },
  listStyle: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  pageContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default QuoteScreen;
