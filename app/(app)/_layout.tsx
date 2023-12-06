import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "../../stores/auth";
import usePersistedUser from "../../helpers/hooks/usePersistedUser";

export default function AppLayout() {
  const { user } = useAuthStore();

  const persistedUser = usePersistedUser();

  if (!user && !persistedUser) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
