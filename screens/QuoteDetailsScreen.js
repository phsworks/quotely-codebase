import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import QuoteCard from '../components/QuoteCard';

function QuoteDetailsScreen(props) {
  const { item, index } = props.route.params;
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.quoteDetailsTop}>
        <Feather
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color="#4a5a5b"
        />
        <Text style={styles.goBack}>Go Back</Text>
      </View>
      <View style={styles.quoteCardWrapper}>
          <QuoteCard item={item} index={index} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 120,
  },
  quoteDetailsTop: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    flexDirection: "row",
    gap: 5,
  },
  goBack: {
    fontSize: 18,
    color: "#4a5a5b",
  },
  quoteCardWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "flex-start",
  },
});

export default QuoteDetailsScreen;
