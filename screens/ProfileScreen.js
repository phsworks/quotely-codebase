import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { supabase } from "../supabase/configUsers";

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
        .select("name, email, avatar_url")
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
        avatar_url: avatarUrl,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={avatarUrl}
        onChangeText={setAvatarUrl}
        placeholder="Avatar URL"
        editable={isEditing}
      />
      {isEditing ? (
        <Button
          title="Save"
          onPress={() => updateProfile({ name, email, avatarUrl })}
        />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
});
