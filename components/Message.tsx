import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "../stores/auth";

type MessageProps = {
  email: string;
  message: string;
};

const Message: FC<MessageProps> = ({ email, message }) => {
  const auth = useAuthStore();
  const isCurrentUsersMessage = email === auth.user?.email;

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      {isCurrentUsersMessage ? null : (
        <Text style={styles.authorLabel}>{email}</Text>
      )}
      <View
        style={[
          styles.messageContainer,
          {
            backgroundColor: isCurrentUsersMessage ? "#969696" : "#026383",
            alignSelf: isCurrentUsersMessage ? "flex-end" : "flex-start",
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authorLabel: {
    fontSize: 14,
    color: "grey",
    paddingLeft: 5,
    marginVertical: 2,
  },
  messageContainer: {
    borderRadius: 15,
    overflow: "hidden",
    maxWidth: "60%",
    padding: 10,
    marginVertical: 2,
  },
  message: {
    color: "white",
    fontSize: 13,
  },
});

export default Message;
