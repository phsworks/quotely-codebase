import { useState, useEffect } from "react";
import { supabase } from "../supabase/configUsers";
import { StyleSheet, View, Alert, Text, BackHandler } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Account from "../components/Account";

function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const [session, setSession] = useState(route.params?.session || null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
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
        .select("name, email")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) throw error;

      if (data) {
        setName(data.name);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ name }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      setIsEditing(false);
      Alert.alert("Profile updated successfully!");
    } catch (error) {
      Alert.alert(error.message);
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
      {session && session.user ? (
        <Account session={session} name={name} />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <Text>{session?.user?.email}</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Name</Text>
        {isEditing ? (
          <Input value={name || ""} onChangeText={(text) => setName(text)} />
        ) : (
          <Text>{name}</Text>
        )}
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        {isEditing ? (
          <>
            <Button
              title={loading ? "Loading ..." : "Save"}
              onPress={() => updateProfile({ name, })}
              disabled={loading}
            />
            <Button
              title="Cancel"
              onPress={() => setIsEditing(false)}
              buttonStyle={{ backgroundColor: "grey" }}
              titleStyle={{ color: "white" }}
            />
          </>
        ) : (
          <Button
            title="Edit Profile"
            onPress={() => setIsEditing(true)}
            buttonStyle={{ backgroundColor: "blue" }}
            titleStyle={{ color: "white" }}
          />
        )}
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Delete Profile"
          onPress={deleteProfile}
          buttonStyle={{ backgroundColor: "red" }}
          titleStyle={{ color: "white" }}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
