import { View, Text, StyleSheet } from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

function NotificationsScreen() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.settingsTop}>
        <Feather
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color="#4a5a5b"
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

export default NotificationsScreen;