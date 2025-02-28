import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { supabase } from "../supabase/config";
import { useState, useEffect } from "react";

function QuoteCategoriesScreen( {navigation}) {
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuotes() {
      let { data, error } = await supabase
        .from("famous-quotes")
        .select("*", { distinct: true })
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
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Quote Category", {name: item.quote_category, quotes: item.quote } )}>
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
    height: "70%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e8e8",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "space-around",
    gap: 15,
  },
  CategoryText: {
    color: "black",
    padding: 20,
    textAlign: "center",
  },
});

export default QuoteCategoriesScreen;
