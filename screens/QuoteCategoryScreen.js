import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import QuoteCard from "../components/QuoteCard";
import { useEffect } from "react";

function QuoteCategoryScreen({ navigation, route }) {
  const { name, quotes } = route.params;

  useEffect(() => {
    console.log("Quotes data:", quotes);
    console.log(quotes.length)
  }, [quotes]);



  return (
    <View style={styles.container}>
      <Text> {name}</Text>

      <View style={styles.quoteCategoryCards}>
        <FlatList
          data={quotes}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width}
          renderItem={({ item, index }) => (
            <View style={styles.pageContainer}>
              <QuoteCard index={index} item={item} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  quoteCategoryCards: {
    paddingTop: 10,
  },
  pageContainer: {
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center'
    },
});

export default QuoteCategoryScreen;
