import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase/configUsers';

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

  return (
    <View style={styles.container}>
      <View>
        <Feather
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color="#4a5a5b"
        />
        <Text onPress={() => navigation.goBack()} style={styles.title}></Text>
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
      <View>
        <Button
          title="Delete Account"
          onPress={deleteProfile}
          buttonStyle={{ backgroundColor: "red" }}
          titleStyle={{ color: "white" }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    backgroundColor: "white",
  },
});

export default SettingsScreen;