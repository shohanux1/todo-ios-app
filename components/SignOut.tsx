import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "react-native";

export function SignOut() {
  const { signOut } = useAuthActions();
  return <Button title="Sign Out" onPress={signOut} />;
}