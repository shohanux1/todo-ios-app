import { SignIn } from "@/components/SignIn";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

});
