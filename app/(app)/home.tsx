import { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { getDocs, collection, setDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";
import Channels from "./channels/channels";
import { ThemeProvider } from "@react-navigation/native";
import Button from "./channels/button";

interface serverData {
  message: string;
  username: string;
}

export default function Home() {
  const docRef = collection(firestoreDB, "rooms");
  const [serversId, setServersId] = useState([] as string[]);
  const [text, setText] = useState("");
  const onPressHandler = async () => {
    //do rooms wrzucic
    const { docs } = await getDocs(docRef);
    // docs.map(({ id }) => {
    //   // if (id !== text) {
    //   //   //update
    //   // }
    // });
    console.log("create channel");
  };
  useEffect(() => {
    const getData = async () => {
      const { docs } = await getDocs(docRef);
      setServersId(docs.map(({ id }) => id) as any);
      let temp: string[] = [];
      docs.map(({ id }) => {
        temp.push(id);
      });
      setServersId(temp);
      console.log(temp);
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Dołącz do kanału</Text>
      </View>
      <Channels channelsIDs={serversId} />
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button onPressHandler={onPressHandler} title="lub utwórz własny" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  text: {},
  textContainer: {
    height: 100,
    alignItems: "center",
    // flex: 1,
  },
  input: {
    borderWidth: 2,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});
