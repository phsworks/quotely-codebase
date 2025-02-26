import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";
import { supabase } from "../supabase/config";
import { useState, useEffect } from "react";

function QuoteCategoriesScreen() {
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuotes() {
      let { data, error } = await supabase
        .from("famous-quotes")
        .select("id, quote_category, category_image", { distinct: true })
        .order("quote_category", { ascending: true });

      if (error) {
        setError(error.message);
        console.log("There was an error", error);
      } else {
        const uniqueCategories = Object.values(
          data.reduce((uniqueCategoryObj, item) => {
            if (!uniqueCategoryObj[item.quote_category]) {
              uniqueCategoryObj[item.quote_category] = item;
            }
            return uniqueCategoryObj;
          }, {})
        );
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable>
              <View style={styles.quoteCategory}>
                <ImageBackground resizeMode="cover"
                  source={{ uri: item.category_image }}
                  style={styles.image}
                >
                  <Text style={styles.CategoryText}>
                    {item.quote_category}
                  </Text>
                </ImageBackground>
              </View>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 80,
  },
  quoteCategoriesContainer: {
    width: "90vw",
  },
  quoteCategory: {
    textAlign: "center",
    boxShadow: "rgba(180, 182, 184, 0.2) 0px 4px 5px",
    elevation: 4,
    borderRadius: 20,
    width: 165,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "space-around",
    gap: 20,
  },
  CategoryText: {
    color: "black",
    padding: 20,
    textAlign: "center",
  },
});

export default QuoteCategoriesScreen;
