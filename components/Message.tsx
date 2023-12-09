import { Text, View } from "react-native";
import { useAuthStore } from "../stores/auth";

interface MessageProps {
  message: string;
  username: string;
}

export default function Message({ message, username }: MessageProps) {
  const { user } = useAuthStore();
  const isUser = username === user?.email;

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>
        {isUser ? "You: " : username + ": "}
      </Text>
      <Text>{message}</Text>
    </View>
  );
}
