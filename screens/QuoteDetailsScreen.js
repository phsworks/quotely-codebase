import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import QuoteCard from '../components/QuoteCard';
import GoBack from '../components/GoBack';

function QuoteDetailsScreen(props) {
  const { item, index } = props.route.params;
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <GoBack screenTitle="Favorite Quotes" />
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
    padding: 3,

  },
  quoteCardWrapper: {
    width: "100%",
    height: "77%",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "flex-start",
  },
});

export default QuoteDetailsScreen;
