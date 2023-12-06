import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "./Button";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";

const RoomCreator: FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuthStore();

  const createRoom = () => {
    if (!auth.user?.email) return null;
    setDoc(doc(firestoreDB, `rooms/${name}/`), {
      messages: [{ username: auth.user.email, message }],
    });
  };

  return (
    <View style={styles.creatorContainer}>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={setName}
        placeholder="Podaj nazwę pokoju..."
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Napisz pierwszą wiadomość..."
      />
      <Button label="Utwórz własny!" onPress={createRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E4E5E8",
    borderRadius: 2,
    padding: 8,
  },
  creatorContainer: {
    gap: 8,
    padding: 8,
  },
});

export default RoomCreator;
