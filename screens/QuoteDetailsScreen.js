import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import QuoteCard from '../components/QuoteCard';

function QuoteDetailsScreen({ quote }) {
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
        <Text style={styles.settingsTitle}>Quote</Text>
      </View>
      <View>
          <QuoteCard item={quote} />
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
  quoteDetailsTop: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    flexDirection: "column",
    gap: 20,
    marginBottom: "10%",
  },
});

export default QuoteDetailsScreen;