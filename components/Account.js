import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Account = ({ session, name, }) => {
  if (!session || !session.user) {
    return <Text>Loading...</Text>;
  }

  const { user } = session;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{user.email}</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.info}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    marginBottom: 10,
  },
});

export default Account;
