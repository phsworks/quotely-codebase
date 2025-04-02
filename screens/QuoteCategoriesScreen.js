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
        const categories = data.reduce((acc, quote) => {
          if (!acc[quote.quote_category]) {
            acc[quote.quote_category] = [];
          }
          acc[quote.quote_category].push(quote);
          return acc;
        }, {});

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
          keyExtractor={(item) => item.quote_category}
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
                <Text style={styles.CategoryText}>{item.quote_category} - {item.quotes.length}</Text>
              </View>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
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
    paddingTop: 50,
  },
  quoteCategoriesContainer: {
    width: "80vw",
  },
  quoteCategory: {
    backgroundColor: "#f1f1f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.00,

    elevation: 2,
    borderRadius: 20,
    width: 160,
    height: 180,
    margin: 10,
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "78%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "space-around",
    gap: 15,
  },
  categoriesList: {
    paddingVertical: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  CategoryText: {
    color: "#545567",
    fontWeight: "600",
    textAlign: "center",
    padding: 12,
    fontFamily: "Avenir",
  },
});

export default QuoteCategoriesScreen;
