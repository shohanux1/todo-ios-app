import PrimaryButton from "@/components/PrimaryButton";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../convex/_generated/api";

export default function NewTaskScreen() {
  const [text, setText] = useState("");
  const createTask = useMutation(api.tasks.create);
  const router = useRouter();

  const handleAddTask = async () => {
    if (!text.trim()) {
      Alert.alert("Please enter a task");
      return;
    }
    try {
      await createTask({ text: text.trim() });
      router.back();
    } catch (error) {
      Alert.alert("Failed to add task", String(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Task</Text>

        <TextInput
          placeholder="Enter task description"
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
          autoFocus
        />

 

        <PrimaryButton
  label="Add Task"
  onPress={handleAddTask}
// icon={AddIcon} // Uncomment if you have an SVG icon
/>

        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 24,
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 16,
  },
  cancelText: {
    color: "#999",
    textAlign: "center",
    fontSize: 16,
  },
});
