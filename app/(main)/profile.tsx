import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../convex/_generated/api";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useQuery(api.tasks.getUser);
  const { signOut } = useAuthActions();


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: typeof user?.image === "string" ? user.image : undefined }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || "Unknown User"}</Text>
        <Text style={styles.email}>{user?.email || "No email available"}</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
  },
  logoutBtn: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
