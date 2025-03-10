import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { supabase } from "../supabase/configQuotes";
import { useState, useEffect } from "react";

function QuoteCategoriesScreen({ navigation }) {
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuotes() {
      let { data, error } = await supabase
        .from("famous-quotes")
        .select("*")
        .order("quote_category", { ascending: true });

      if (error) {
        setError(error.message);
        console.log("There was an error", error);
      } else {
        // Groepeer de quotes per categorie
        const categories = data.reduce((acc, quote) => {
          if (!acc[quote.quote_category]) {
            acc[quote.quote_category] = [];
          }
          acc[quote.quote_category].push(quote);
          return acc;
        }, {});

        // Een array van unieke categorieën met hun quotes
        const uniqueCategories = Object.keys(categories).map((category) => ({
          quote_category: category,
          quotes: categories[category],
          category_image: categories[category][0]?.category_image || "",
        }));

        setQuoteCategories(uniqueCategories);
      }
    }
    getQuotes();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.quoteCategoriesContainer}>
        <FlatList
          data={quoteCategories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Quote Category", {
                  name: item.quote_category,
                  quotes: item.quotes,
                })
              }
            >
              <View style={styles.quoteCategory}>
                <Image
                  style={styles.image}
                  source={{ uri: item.category_image }}
                />
                <Text style={styles.CategoryText}>{item.quote_category}</Text>
              </View>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={styles.categoriesList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
  quoteCategoriesContainer: {
    width: "80vw",
  },
  quoteCategory: {
    textAlign: "center",
    boxShadow: "rgba(180, 182, 184, 0.2) 0px 4px 5px",
    elevation: 4,
    borderRadius: 20,
    width: 160,
    height: 180,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "space-around",
    gap: 15,
  },
  categoriesList: {
    paddingBottom: 50,
  },
  CategoryText: {
    color: "black",
    padding: 12,
    textAlign: "center",
  },
});

export default QuoteCategoriesScreen;
