import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
  Share
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase/configUsers";
import GoBack from "../components/GoBack";

function SettingsScreen() {
  const navigation = useNavigation();

  async function deleteProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", session?.user.id);
      if (error) throw error;

      BackHandler.exitApp();
      Alert.alert("Profile deleted successfully!");
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  const deleteAlert = () =>
    Alert.alert(
      "Are you sure you want to delete this account?",
      "You cannot undo this action",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteProfile;
          },
        },
      ]
    );
  const signOutAlert = () =>
    Alert.alert(
      "Are you sure you want to sign out?",
      "You can Sign In again whenever you want",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => {
            supabase.auth.signOut();
          },
        },
      ]
    );

  const openEmailBug = () => {
    const email = "support@phsdevelopment.com";
    const subject = "Bug Report";
    const body = "Describe your bug: ";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink).catch((err) =>
      Alert.alert("Error", "Could not open mail app")
    );
  };
  const suggestQuote = () => {
    const email = "support@phsdevelopment.com";
    const subject = "Quote Suggestion for Quotely";
    const body = `I’d love to suggest this quote for Quotely✨:

    Author (if known):
    Hope this can be added!`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

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
      <GoBack screenTitle="Settings" />
      <View style={styles.settingTiles}>
        <View style={styles.generalSettings}>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              paddingLeft: 20,
              paddingBottom: 10,
            }}
          >
            GENERAL
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Privacy")}
            style={styles.settingsTile}
          >
            <View style={styles.tileLeft}>
              <Feather name="lock" size={24} color="#545567" />
              <Text style={styles.userSettings}>Privacy</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info")}
            style={styles.settingsTile}
          >
            <View style={styles.tileLeft}>
              <Feather name="info" size={24} color="#545567" />
              <Text style={styles.userSettings}>Info</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsTile} onPress={signOutAlert}>
            <View style={styles.tileLeft}>
              <Feather name="log-out" size={24} color="#545567" />
              <Text style={styles.userSettings}>Sign Out</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAlert} style={styles.settingsTile}>
            <View style={styles.tileLeft}>
              <Feather name="trash-2" size={24} color="#545567" />
              <Text style={styles.userSettings}>Delete Account</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              paddingBottom: 10,
              paddingLeft: 20,
              fontFamily: "Avenir",
            }}
          >
            FEEDBACK
          </Text>
          <TouchableOpacity onPress={suggestQuote} style={styles.settingsTile}>
            <View style={styles.tileLeft}>
              <Feather name="cloud" size={24} color="#545567" />
              <Text style={styles.userInfo}>Send Your Quote Suggestions!</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsTile}>
            <View style={styles.tileLeft}>
              <Feather name="star" size={24} color="#545567" />
              <Text style={styles.userInfo}>Rate us in the Appstore</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareApp} style={styles.settingsTile}>
            <View style={styles.tileLeft}>
              <Feather name="send" size={24} color="#545567" />
              <Text style={styles.userInfo}>Share Quotely</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openEmailBug} style={styles.settingsTile}>
            <View style={styles.tileLeft}>
              <Feather name="alert-triangle" size={24} color="#545567" />
              <Text style={styles.userInfo}>Report a bug</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#545567" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  settingTiles: {
    flexDirection: "column",
    gap: 30,
    marginTop: 30,
  },
  settingsTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#c4c4c4",
  },
  userSettings: {
    fontSize: 16,
    color: "#434451",
    fontFamily: "Avenir",
  },
  tileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default SettingsScreen;
