import { Stack } from "expo-router";
import BackButton from "../../../components/BackButton";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: BackButton,
        headerTitleStyle: {
          fontWeight: "400",
          fontSize: 24,
          color: "#276B81",
        },
      }}
    />
  );
}
