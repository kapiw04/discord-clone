import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";
import { Link } from "expo-router";

export default function Home() {
  const [rooms, setRooms] = useState<Array<string>>([]);

  useEffect(() => {
    const getRooms = async () => {
      const { docs } = await getDocs(collection(firestoreDB, "rooms"));
      if (docs.length) setRooms(docs.map(({ id }) => id));
    };
    getRooms();
  }, []);

  return (
    <View style={styles.container}>
      {rooms.length ? (
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <Link href={`/room/${item}`}>
              <Text>{item}</Text>
            </Link>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roomButton: {
    padding: 20,
  },
});
