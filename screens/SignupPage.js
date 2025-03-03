import { View, Text, StyleSheet } from "react-native";
import MainButton from "../components/MainButton";

function SignupPage() {
  return (
      <View style={styles.container}>
        <View style={styles.signupTop}>

        </View>
        <View style={signupForm}>

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
});

export default SignupPage;
