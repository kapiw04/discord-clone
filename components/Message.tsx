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
    maxWidth: "80%",
    padding: 1000,
  },
  userText: {
    fontWeight: "bold",
    marginRight: 5,
    padding: 1000,
  },
  usernameText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  messageText: {
    fontSize: 16,
    color: "white",
    borderRadius: 5,
    backgroundColor: "#276B82",
    padding: 1000,
  },
});
