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
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        style={styles.listStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <QuoteCard index={index} item={item} />
        )}
        snapToInterval={Dimensions.get("window").width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingTop: 100,
  },
  listStyle: {
    paddingHorizontal: 20,
    gap: 30,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default QuoteScreen;
