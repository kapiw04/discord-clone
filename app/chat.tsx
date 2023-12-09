import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { firestoreDB } from "../firebaseConfig";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import { useAuthStore } from "../stores/auth";
import { set } from "react-hook-form";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("Test");
  const docRef = doc(firestoreDB, "rooms", room);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setMessages(docSnap.data().messages);
      } else {
        console.log("No such document!");
        setMessages([]);
      }
    };
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        setMessages(doc.data()?.messages);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
    getData();
  }, []);

  const sendMessage = (message: string, username: string) => {
    console.log(message);

    setDoc(docRef, {
      messages: [
        ...messages,
        {
          message: message,
          username: username,
        },
      ],
    });
  };

  return (
    <>
      <Text>{room.toUpperCase()}</Text>

      <View>
        {messages?.length === 0 ? (
          <Text>No messages</Text>
        ) : (
          <View>
            {messages.map(({ message, username }) => (
              <Text>
                <Message key={message} message={message} username={username} />
              </Text>
            ))}
          </View>
        )}
      </View>

      <SendMessage room={room} sendMessage={sendMessage} />
    </>
  );
}
