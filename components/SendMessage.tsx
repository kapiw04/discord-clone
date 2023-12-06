import { FC, useState } from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import SendIcon from "../assets/images/send-icon.svg";

type SendMessageProps = {
  sendMessage: (message: string) => void;
};

const SendMessage: FC<SendMessageProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => setMessage(value)}
        style={styles.input}
        placeholder="Napisz coś..."
        onSubmitEditing={() => sendMessage(message)}
        placeholderTextColor="#88BFD0"
      />
      <Pressable style={styles.icon} onPress={() => sendMessage(message)}>
        <SendIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#276B81",
    padding: 15,
    color: "#88BFD0",
  },
  icon: { position: "absolute", bottom: 12, right: 25 },
  container: { width: "100%" },
});

export default SendMessage;
