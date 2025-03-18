import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

function GoBack({ screenTitle }) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.goBackTop}>
          <Feather name="chevron-left" size={35} color="#4a5a5b" />
          <Text style={styles.screenTitle}>{screenTitle}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  goBackTop: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 5,
    marginTop: '20%',
    flexDirection: "row",
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4a5a5b",

  },
});

export default GoBack;
