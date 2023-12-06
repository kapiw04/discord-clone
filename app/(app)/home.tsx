import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";
import { Link } from "expo-router";
import RoomCreator from "../../components/RoomCreator";

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
      <Text style={styles.title}>Dołącz do kanału</Text>
      {rooms.length ? (
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={rooms}
          renderItem={({ item }) => (
            <Link href={`/room/${item}`} style={styles.card}>
              <Text style={styles.cardLabel}>{item}</Text>
            </Link>
          )}
        />
      ) : null}
      <RoomCreator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#F4FCFF",
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 5,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#F4FCFF",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardLabel: {
    fontSize: 20,
    color: "#443E3EBF",
  },
  title: {
    fontSize: 24,
    color: "#276B81",
    marginVertical: 20,
  },
});
