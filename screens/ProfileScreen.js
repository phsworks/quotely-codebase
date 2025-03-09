import { useState, useEffect } from "react";
import { supabase } from "../supabase/configUsers";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  BackHandler,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Avatar from "../components/Avatar";

function ProfileScreen({ route }) {
  const [session, setSession] = useState(route.params?.session || null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("name, email", "avatar_url")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) throw error;

      if (data) {
        setName(data.name);
        setEmail(data.email);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ name, email, avatarUrl }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        name,
        email,
        avatarUrl,
        updated_at: new Date(),
      };

      // Update the profiles table
      const { error: profilesError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (profilesError) throw profilesError;

      // Update the auth table
      const { error: authError } = await supabase.auth.updateUser({
          email,
      });

      if (authError) throw authError;

      // Success feedback
      setIsEditing(false);
      Alert.alert("Profile updated successfully!");
    } catch (error) {
      // Error feedback
      Alert.alert("Error updating profile:", error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.profileTop}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Avatar
          size={150}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ avatar_url: url });
          }}
        />
      </View>
      <View style={styles.editProfile}>
        {isEditing ? (
          <View style={styles.editingControl}>
            <Feather
              onPress={() => updateProfile({ name, email })}
              name="check-circle"
              size={28}
              color="#545567"
            />
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Feather name="x-circle" size={28} color="#545567" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Feather name="edit-3" size={28} color="#545567" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.userTile}>
        <Feather name="mail" size={24} color="#545567" />
        {isEditing ? (
          <Input
            value={email || ""}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            onChangeText={(text) => setEmail(text)}
          />
        ) : (
          <Text style={styles.userInfo}>{email}</Text>
        )}
      </View>
      <View style={styles.userTile}>
        <Feather name="user" size={24} color="#545567" />
        {isEditing ? (
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            value={name || ""}
            onChangeText={(text) => setName(text)}
          />
        ) : (
          <Text style={styles.userInfo}>{name}</Text>
        )}
      </View>
      <View style={styles.userTile}>
        <Feather name="settings" size={24} color="#545567" />
        <Text style={styles.userInfo}>Settings</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.userTile}
          onPress={() => supabase.auth.signOut()}
        >
          <Feather name="log-out" size={24} color="#545567" />
          <Text style={styles.userInfo}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 15,
  },
  profileTop: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 600,
    color: "#535360",
  },
  editProfile: {
    paddingTop: 2,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  editingControl: {
    flexDirection: 'row',
    gap: 10,
  },
  userTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    boxShadow: "rgba(180, 182, 184, 0.402) 0px 4px 5px",
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  userInfo: {
    fontSize: 16,
    color: "#434451",
  },
  inputContainer: {
    width: "80%",
    height: "1%",
    borderBottomWidth: 0,
    margin: 0,
    marginTop: 20,
  },
  input: {
    fontSize: 14, // Adjust the font size as needed
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333",
  },
});
