import { useState } from "react";
import { Alert, StyleSheet, View, AppState, Button, Image } from "react-native";
import { supabase } from "../supabase/configUsers";
import { Input } from "@rneui/themed";
import MainButton from "../components/MainButton";
import logo from "../assets/Quotely-logo.png";

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
    } else if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    } else {
      // Set the authentication as complete
      setAuthComplete(true);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.toggles}>
          <Button
            style={styles.toggle}
            type="clear"
            title={"Sign Up"}
            onPress={() => setIsSignUp(true)}
          />
          <Button
            style={styles.toggle}
            type="clear"
            title={"Sign In"}
            onPress={() => setIsSignUp(false)}
          />
        </View>
      </View>
      <View style={styles.inputFields}>
        <Input
          label="Email address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email"
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
      <View style={styles.signButton}>
        <MainButton
          style={styles.signButton}
          title={isSignUp ? "Sign Up" : "Sign In"}
          disabled={loading}
          onPress={() => (isSignUp ? signUpWithEmail() : signInWithEmail())}
        />
      </View>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    paddingTop: 100,
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: 'space-between',
    borderRadius: 30,
    boxShadow: "rgba(180, 182, 184, 0.2) 0px 4px 5px",
    backgroundColor: "white",
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    height: "40%",
  },
  toggles: {
    flexDirection: "row",
    gap: 50,
  },
  toggle: {
    
  },
  inputFields: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  signButton: {
    textAlign: "center",
  },
});
