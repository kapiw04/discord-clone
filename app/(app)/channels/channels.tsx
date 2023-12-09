import { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Channel from "./channel";
import { useLocalSearchParams } from "expo-router";
import { useGlobalSearchParams } from "expo-router";

interface channels {
  channelsIDs: string[];
}

let width = Dimensions.get("window").width;

export default function Channels({ channelsIDs }: channels) {
  return (
    <ScrollView style={styles.container}>
      {channelsIDs.map((id, i) => {
        return <Channel key={i} id={i} name={id} />;
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignContent: "stretch",
    width: width,
  },
});
