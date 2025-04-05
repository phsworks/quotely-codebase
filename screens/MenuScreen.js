import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";

function MenuScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const openEmailBug = () => {
    const email = "support@phsdevelopment.com";
    const subject = "Bug Report";
    const body = "Describe your bug: ";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink).catch(() =>
      Alert.alert("Error", "Could not open mail app")
    );
  };

  const suggestQuote = () => {
    const email = "support@phsdevelopment.com";
    const subject = "Quote Suggestion for Quotely";
    const body = `I’d love to suggest this quote for Quotely✨:\n\nAuthor (if known):\nHope this can be added!`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink).catch(() =>
      Alert.alert("Error", "Could not open mail app")
    );
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Check out Quotely! A great app for daily inspiration✨. Download it here: https://quotely.app",
      });
    } catch (error) {
      Alert.alert("Error", "Could not share the app");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Menu</Text>
        <View style={styles.settingTiles}>
          {/* GENERAL */}
          <View style={styles.generalSettings}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.phsdevelopment.nl/privacy")
              }
              style={styles.settingsTile}
            >
              <View style={styles.tileLeft}>
                <Feather name="lock" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Privacy Policy</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Info")}
              style={styles.settingsTile}
            >
              <View style={styles.tileLeft}>
                <Feather name="info" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Info</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>
          </View>

          {/* FEEDBACK */}
          <View>
            <TouchableOpacity
              onPress={suggestQuote}
              style={styles.settingsTile}
            >
              <View style={styles.tileLeft}>
                <Feather name="cloud" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Send Your Quotes!</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsTile}>
              <View style={styles.tileLeft}>
                <Feather name="star" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Rate us in the Appstore</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>

            <TouchableOpacity onPress={shareApp} style={styles.settingsTile}>
              <View style={styles.tileLeft}>
                <Feather name="send" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Share Quotely</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openEmailBug}
              style={styles.settingsTile}
            >
              <View style={styles.tileLeft}>
                <Feather name="mail" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Send Feedback</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openEmailBug}
              style={styles.settingsTile}
            >
              <View style={styles.tileLeft}>
                <Feather name="alert-triangle" size={24} color="#8EEAEE" />
                <Text style={styles.userSettings}>Report a bug</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#acacb6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  settingsTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    borderBottomWidth: 1,
    borderColor: "#eeeee4",
    backgroundColor: "white",
  },
  tileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  userSettings: {
    fontSize: 16,
    color: "#62626e",
    fontFamily: "Avenir",
    fontWeight: 400,
  },
  header: {
    fontSize: 26,
    color: "#62626e",
    fontWeight: 600,
    paddingLeft: 30,
    paddingTop: 80,
    paddingBottom: 20,
    fontFamily: "Avenir",
  },
});

export default MenuScreen;
