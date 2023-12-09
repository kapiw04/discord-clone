import { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from "expo-router";

interface channelInterface {
  name: string;
  id: number;
}

export default function Channel({ name, id }: channelInterface) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/channels/${name}`);
      }}
      style={styles.container}
    >
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});
