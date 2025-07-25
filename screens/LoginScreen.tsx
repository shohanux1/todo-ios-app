import { StyleSheet, Text, View } from "react-native";
import { SignIn } from "../components/SignIn";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ToDo</Text>
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "Lato-Bold",
    marginBottom: 40,
    color: "#333",
  },
});
