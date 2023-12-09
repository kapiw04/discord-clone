import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

interface buttonInterace {
  onPressHandler(): void;
  title: string;
}

export default function Button({ onPressHandler, title }: buttonInterace) {
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 15,
  },
});
