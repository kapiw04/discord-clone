import { Text, View, StyleSheet, FlatList, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FieldValue,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB } from "../../../firebaseConfig";
import { useAuthStore } from "../../../stores/auth";

type Message = {
  username: string;
  message: string;
};

export default function Room() {
  const local = useLocalSearchParams();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const auth = useAuthStore();
  console.log(auth.user);

  const sendMessage = (message: string) => {
    updateDoc(doc(firestoreDB, `rooms/${local.roomId}/`), {
      messages: [...messages, { username: auth.user?.email, message }],
    });
  };

  useEffect(() => {
    if (typeof local.roomId !== "string") return;
    const unsub = onSnapshot(
      doc(firestoreDB, `rooms/${local.roomId}`),
      (doc) => {
        setMessages(doc.data()?.messages);
      }
    );
    return unsub;
  }, []);

  if (typeof local.roomId !== "string") return;

  return (
    <View style={styles.container}>
      <Text>Room: {local.roomId}</Text>
      <FlatList
        data={messages}
        renderItem={({ item: { message, username } }) => (
          <View>
            <Text>
              {username}: {message}
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your message..."
        onSubmitEditing={(event) => sendMessage(event.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  roomButton: {
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 2,
  },
});
