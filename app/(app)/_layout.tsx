import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "../../stores/auth";

console.log("auth guard");

export default function AppLayout() {
  const { user } = useAuthStore();
  console.log("entered at all");

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
