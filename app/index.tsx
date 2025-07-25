// app/index.tsx
import { Text, View } from "react-native";
import { SignOut } from "../components/SignOut";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Lato-Bold", fontSize: 20 }}>
        Welcome to your ToDo app!
      </Text>
      <SignOut />
    </View>
  );
}
