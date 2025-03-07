import { useState, useEffect } from "react";
import { supabase } from "../supabase/configUsers";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  BackHandler,
  TouchableOpacity,
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
        data: {
          email,
        },
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
          <>
            <Button
              title={loading ? "Loading ..." : "Save"}
              onPress={() => updateProfile({ name, email })}
              disabled={loading}
            />
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Feather name="slash" size={24} color="black" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Feather name="edit-3" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileBottom}>
        <Text style={styles.label}>Email</Text>
        {isEditing ? (
          <Input value={email || ""} onChangeText={(text) => setEmail(text)} />
        ) : (
          <Text>{email}</Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Name</Text>
        {isEditing ? (
          <Input value={name || ""} onChangeText={(text) => setName(text)} />
        ) : (
          <Text>{name}</Text>
        )}
      </View>

      <View>
        <Button
          title="Delete Profile"
          onPress={deleteProfile}
          buttonStyle={{ backgroundColor: "red" }}
          titleStyle={{ color: "white" }}
        />
      </View>

      <View>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12,
  },
  profileTop: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  profileTitle: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 600,
  },
  editProfile: {
    paddingTop: 2,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
