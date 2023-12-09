import { TextInput, View, Text } from "react-native";
import Button from "./Button";
import { useState } from "react";

export default function SendMessage() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Message..."
        onChangeText={setMessage}
        onSubmitEditing={sendMessage}
        value={message}
      />

      <Button onPress={sendMessage} label="Send" />
    </View>
  );
}
