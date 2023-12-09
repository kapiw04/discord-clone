import { TextInput, View, Text } from "react-native";
import Button from "./Button";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";

interface Props {
  room: string;
  sendMessage: (message: string, username: string) => void;
}

export default function SendMessage({ room, sendMessage }: Props) {
  const [message, setMessage] = useState("");
  const { user } = useAuthStore() as any;
  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Message..."
        onChangeText={setMessage}
        onSubmitEditing={() => sendMessage(message, user?.email)}
        value={message}
      />

      <Button
        onPress={() => {
          sendMessage(message, user?.email);
          setMessage("");
        }}
        label="Send"
      />
    </View>
  );
}
