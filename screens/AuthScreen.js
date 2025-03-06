import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../supabase/configUsers";
import { Input } from "@rneui/themed";
import MainButton from "../components/MainButton";
import logo from "../assets/Quotely-logo.png";
import { AuthApple } from "../components/Auth.native";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function AuthScreen({ setAuthComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      // Set the authentication as complete
      setAuthComplete(true);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.toggles}>
          <TouchableOpacity onPress={() => setIsSignUp(true)}>
            <Text style={[styles.toggle, isSignUp && styles.toggleActive]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(false)}>
            <Text style={[styles.toggle, !isSignUp && styles.toggleActive]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.loginBottom}>
        <View style={styles.inputFields}>
          <Input
            label="Email address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputFields}>
          <Input
            label="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <AuthApple />
        <View style={styles.signButton}>
          <MainButton
            style={styles.signButton}
            title={isSignUp ? "Sign Up" : "Sign In"}
            disabled={loading}
            onPress={() => (isSignUp ? signUpWithEmail() : signInWithEmail())}
          />
        </View>
      </View>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9e9e947",
  },
  imageContainer: {
    paddingTop: 150,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    boxShadow: "rgba(180, 182, 184, 0.2) 0px 4px 5px",
    backgroundColor: "white",
    marginBottom: 30,
  },
  logo: {
    width: "60%",
    height: "30%",
  },
  toggles: {
    flexDirection: "row",
    gap: 100,
  },
  toggle: {
    color: "#4d4d4d",
    fontSize: 20,
    paddingBottom: 15,
  },
  toggleActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#8EEAEE",
  },
  loginBottom: {
    height: '60%'
  },
  inputFields: {
    paddingTop: 10,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  signButton: {
    textAlign: "center",
    marginTop: 100,
  },
});
