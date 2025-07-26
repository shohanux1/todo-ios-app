import { useAuthActions } from "@convex-dev/auth/react";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";
import { useState } from "react";
import {
  Platform,
} from "react-native";
import GoogleIcon from "../assets/icons/google.svg";
import PrimaryButton from "./PrimaryButton";


const redirectTo = makeRedirectUri();

export function SignIn() {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);


  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { redirect } = await signIn("google", { redirectTo });
      if (Platform.OS === "web") {
        setLoading(false);
        return;
      }

      const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);

      if (result.type === "success") {
        const { url } = result;
        const code = new URL(url).searchParams.get("code")!;
        await signIn("google", { code });
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (


    <PrimaryButton
      label="Login with Google"
      icon={<GoogleIcon width={20} height={20} />

      }
      onPress={handleSignIn}
      disabled={loading}
      loading={loading}
    />
  );
}

