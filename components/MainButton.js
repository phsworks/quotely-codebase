import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function MainButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8EEAEE",
    padding: 20,
    borderRadius: 25,
    width: 320,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "Avenir"
  },
});

export default MainButton;
