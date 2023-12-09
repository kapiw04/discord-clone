import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { firestoreDB } from "../firebaseConfig";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("Test2");
  const docRef = doc(firestoreDB, "rooms", room);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages);
      } else {
        console.log("No such document!");
      }
    };
    getData();
  }, []);

  return (
    <>
      <Text>{room.toUpperCase()}</Text>

      <View>
        {messages.map(({ message, username }) => (
          <Message key={message} message={message} username={username} />
        ))}
      </View>

      <SendMessage />
    </>
  );
}
