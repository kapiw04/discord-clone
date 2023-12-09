import { Text, View, StyleSheet } from "react-native";
import { useAuthStore } from "../stores/auth";

interface MessageProps {
  message: string;
  username: string;
}

export default function Message({ message, username }: MessageProps) {
  const { user } = useAuthStore();
  const isUser = username === user?.email;

  return (
    <View style={styles.container}>
      <Text style={isUser ? styles.userText : styles.usernameText}>
        {isUser ? "You: " : username + ": "}
      </Text>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  userText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  usernameText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  messageText: {
    fontSize: 16,
  },
});
