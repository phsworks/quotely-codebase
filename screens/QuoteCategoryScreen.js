import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import QuoteCard from "../components/QuoteCard";
import Feather from "@expo/vector-icons/Feather";

function QuoteCategoryScreen({ navigation, route }) {
  const { name, quotes } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.categoryTop}>
        <Feather
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color="#4a5a5b"
        />
        <Text onPress={() => navigation.goBack()} style={styles.title}>
          {name}
        </Text>
      </View>

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

export default QuoteCategoryScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,

  },
  categoryTop: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    flexDirection: "row",
    marginTop: '20%',
  },
  pageContainer: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: "#4a5a5b",
  },
  quoteCategoryCards: {
    flex: 2,
    paddingBottom: 50,
  },
});

