import { View, Text, StyleSheet, Image } from "react-native";
import logo from "../assets/Quotely-logo.png";
import { useNavigation } from '@react-navigation/native'
import MainButton from "../components/MainButton";

function LandingScreen() {

  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <MainButton
        onPress={() => navigation.navigate("Quotely Overview")}
        title="Get Started"
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
    gap: 250,
    paddingBottom: 50,
  },
  logo: {
    width: "60%",
    height: "12%",
  },

});

export default LandingScreen;
