import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "../../stores/auth";

export default function AppLayout() {
  const { user } = useAuthStore();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
