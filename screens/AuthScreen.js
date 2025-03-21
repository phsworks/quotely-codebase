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

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
    } else {
      // Insert the user's info into the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert([{ id: session.user.id, email: email, name: name }]);

      if (profileError) {
        Alert.alert(profileError.message);
      } else {
        Alert.alert(
          "Sign up successful!"
        );
      }
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
      <View style={styles.loginCenter}>
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
        {isSignUp && (
          <View style={styles.inputFields}>
            <Input
              label="Name"
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="Name"
              autoCapitalize="words"
            />
          </View>
        )}
      </View>
      <View style={styles.loginBottom}>
        <AuthApple />
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
    backgroundColor: "#e9e9e947",
    gap: 10,
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
    fontFamily: "Avenir",
  },
  toggleActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#8EEAEE",
  },
  loginCenter: {
    height: "30%",
    width: "85%",
  },
  inputFields: {
    alignSelf: "stretch",
  },
  loginBottom: {
    height: "20%",
    paddingTop: 20,
    gap: 10,
  },
  signButton: {
    textAlign: "center",
  },
});
