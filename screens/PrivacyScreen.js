import { View, Text, ScrollView, StyleSheet } from "react-native";
import GoBack from "../components/GoBack";

function PrivacyScreen() {
  return (
    <>
      <View>
        <GoBack screenTitle="Privacy Policy" />
      </View>
      <ScrollView style={styles.privacyContainer}>
        <Text style={styles.title}>Privacy Policy for Quotely</Text>

        <Text style={styles.paragraph}>
          Welcome to Quotely! This Privacy Policy outlines how PHS Development
          ("we," "our," or "us") collects, uses, and protects the information of
          users ("you") who interact with our mobile application, Quotely
          ("App"). By using our App, you agree to the collection and use of
          information as described in this policy.
        </Text>

        <Text style={styles.subtitle}>Personal Identification Information</Text>
        <Text style={styles.paragraph}>
          We may collect personal information such as your email address when
          you register or interact with certain features of the App. This helps
          us provide a better experience and improve our services. Providing
          this information is optional, and you can request deletion of your
          data by contacting us at support@phsdevelopment.com.
        </Text>

        <Text style={styles.subtitle}>
          Non-Personal Identification Information
        </Text>
        <Text style={styles.paragraph}>
          We may collect non-personal information such as device type, operating
          system, and usage statistics to enhance the performance and
          functionality of the App. This data helps us understand how users
          engage with Quotely.
        </Text>

        <Text style={styles.subtitle}>Third-Party Services</Text>
        <Text style={styles.paragraph}>
          We may use third-party services for analytics, advertising, and app
          improvements. These third parties may collect data through tracking
          technologies such as cookies or SDKs. We encourage you to review their
          privacy policies for more details.
        </Text>

        <Text style={styles.subtitle}>Data Security</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. We implement industry-standard
          security measures to protect your data. However, no method of
          transmission over the internet is 100% secure, so we cannot guarantee
          absolute security.
        </Text>

        <Text style={styles.subtitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this policy from time to time. Any changes will be
          reflected within the App. We encourage users to review the policy
          periodically.
        </Text>

        <Text style={styles.subtitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about this Privacy Policy, feel
          free to contact us at support@phsdevelopment.com.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  privacyContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#545567",
    fontFamily: "Avenir",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#545567",
    fontFamily: "Avenir",
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    color: "#545567",
    fontFamily: "Avenir",
  },
});

export default PrivacyScreen;
