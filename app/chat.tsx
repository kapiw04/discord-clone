import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { firestoreDB } from "../firebaseConfig";
import { Form } from "react-hook-form";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("Test2");
  const docRef = doc(firestoreDB, "rooms", room);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().messages);
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
          <Text>
            {username}: {message}
          </Text>
        ))}
      </View>
    </>
  );
}
