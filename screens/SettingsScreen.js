import { View, Text, StyleSheet } from 'react-native';

function SettingsScreen() {
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
        <Button
          title="Delete Profile"
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default SettingsScreen;