import { View, Text, StyleSheet, Image } from "react-native";
import GoBack from "../components/GoBack";
import logo from "../assets/Quotely-logo.png";


function InfoScreen() {
  return (
    <>
      <View>
        <GoBack screenTitle="App Info" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>About Quotely</Text>
        <Text style={styles.paragraph}>Version: 1.0.5</Text>
        <Text style={styles.paragraph}>Developed By: PHS Development</Text>
        <Text style={styles.paragraph}>Website: www.phsdevelopment.com</Text>
        <Text style={styles.paragraph}>
          Contact: support@phsdevelopment.com
        </Text>
        <Text style={styles.paragraph}>Sources: WikiQuote - Wikimedia </Text>

        <Image
          style={{ width: "90%", height: "20%", marginTop: 50 }}
          source={logo}
        />
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
    fontFamily: "Avenir",
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
    color: "#545567",
    fontFamily: "Avenir",
  },
});

export default InfoScreen;
