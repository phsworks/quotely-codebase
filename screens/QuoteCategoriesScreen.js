import { View, Text, StyleSheet, FlatList } from "react-native";
import { supabase } from "../supabase/config";
import { useState, useEffect } from "react";

function QuoteCategoriesScreen() {
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
    <View style={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.quoteText}>{item.quote_category}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default QuoteCategoriesScreen;
