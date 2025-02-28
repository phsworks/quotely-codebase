import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import QuoteCard from "../components/QuoteCard";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";

function QuoteCategoryScreen({ navigation, route }) {
  const { name, quotes } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.categoryTop}>
        <Feather
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={24}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 80,
    backgroundColor: 'white'
  },
  categoryTop: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    flexDirection: "row",
    marginTop: 60,
  },
  pageContainer: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: "#4a5a5b",
  },
});

export default QuoteCategoryScreen;
