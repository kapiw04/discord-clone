import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  onPress: () => unknown;
  label: string;
};

const Button: FC<ButtonProps> = ({ onPress, label }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#888",
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 5,
  },
});

export default Button;
