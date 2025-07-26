import PrimaryButton from "@/components/PrimaryButton";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function HomeScreen() {
  const router = useRouter();
  const tasks = useQuery(api.tasks.get);
  const toggle = useMutation(api.tasks.toggle);
  const remove = useMutation(api.tasks.remove);
  const isLoading = !tasks;
  const user = useQuery(api.tasks.getUser);


  const handleToggle = async (taskId: Id<"tasks">, isCompleted: boolean) => {
    await toggle({ id: taskId, isCompleted: !isCompleted });
  };

  const handleDelete = async (taskId: Id<"tasks">) => {
    await remove({ id: taskId });
  };

  return (

    <SafeAreaView style={styles.container}>
     <View style={styles.header}>
    <Text style={styles.title}>Your Tasks</Text>
    <TouchableOpacity onPress={() => router.push("/(main)/profile")}>
    <Image
  source={{ uri: typeof user?.image === "string" ? user.image : undefined }}
  style={styles.avatar}
/>

</TouchableOpacity>
  </View>

      <View style={styles.taskListWrapper}>
        {isLoading ? (
          <View>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.skeletonItem} />
            ))}
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}

            data={tasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleToggle(item._id, item.isCompleted)}
                onLongPress={() => handleDelete(item._id)}
                style={styles.taskItem}
              >
                <View style={styles.taskContent}>
                  <View
                    style={[
                      styles.radioButton,
                      item.isCompleted && styles.radioChecked,
                    ]}
                  >
                    {item.isCompleted && <View style={styles.radioInner} />}
                  </View>

                  <Text
                    style={[
                      styles.taskText,
                      item.isCompleted && styles.isCompletedTaskText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>


      <PrimaryButton
        label="+ Add New Task"
        onPress={() => router.push("/(main)/new-task")}
      />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  taskListWrapper: {
    flex: 1,
  },
  loading: {
    fontSize: 16,
    color: "#888",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 3,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioChecked: {
    borderColor: "#000",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  taskText: {
    fontSize: 18,
    color: "#333",
    flexShrink: 1,
  },
  isCompletedTaskText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  skeletonItem: {
    height: 20,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  logoutLink: {
    marginTop: 12,
  },
  logoutText: {
    textAlign: "center",
    color: "#999",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
});
