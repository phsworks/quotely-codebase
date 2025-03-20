import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import GoBack from "../components/GoBack";
import PHS from '../assets/PHS.png'
import logo from "../assets/Quotely-logo.png";


function InfoScreen() {
  return (
    <>
      <View>
        <GoBack screenTitle="App Info" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>About Quotely</Text>
        <Text style={styles.paragraph}>Version: 1.0.0</Text>
        <Text style={styles.paragraph}>Developer: PHS Development</Text>
        <Text style={styles.paragraph}>Website: www.phsdevelopment.nl</Text>
        <Text style={styles.paragraph}>
          Contact: piethein@phsdevelopment.nl
        </Text>
        <Text style={styles.paragraph}>Last Updated: March 2025</Text>

        <Image style={{ width: "90%", height: "20%", marginTop: 50, }} source={logo} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#545567",
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
    color: "#545567",
  },
});

export default InfoScreen;
