import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../../firebaseConfig";
import { useAuthStore } from "../../../stores/auth";
import Message from "../../../components/Message";
import SendMessage from "../../../components/SendMessage";

type Message = {
  username: string;
  message: string;
};

export default function Room() {
  const local = useLocalSearchParams();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const auth = useAuthStore();
  const navigation = useNavigation();
  const ref = useRef<FlatList>(null);

  const sendMessage = (message: string) => {
    updateDoc(doc(firestoreDB, `rooms/${local.roomId}/`), {
      messages: [...messages, { username: auth.user?.email, message }],
    });
  };

  useEffect(() => {
    if (typeof local.roomId !== "string") return;
    navigation.setOptions({ headerTitle: local.roomId });
    const unsub = onSnapshot(
      doc(firestoreDB, `rooms/${local.roomId}`),
      (doc) => {
        setMessages(doc.data()?.messages);
        ref.current?.scrollToEnd();
      }
    );
    return unsub;
  }, []);

  if (typeof local.roomId !== "string") return;

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        style={{ flex: 1, width: "86%" }}
        data={messages}
        renderItem={({ item: { message, username } }) => (
          <Message email={username} message={message} />
        )}
      />
      <SendMessage sendMessage={sendMessage} />
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
});
