import { FC } from "react";
import { StyleSheet, Text, Pressable } from "react-native";

type ButtonProps = {
  onPress: () => unknown;
  label: string;
  secondary?: boolean;
};

const Button: FC<ButtonProps> = ({ onPress, label, secondary }) => {
  return (
    <Pressable
      style={[
        styles.button,
        ...(secondary ? [{ backgroundColor: "#0E2A34" }] : []),
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#276B81",
    borderRadius: 2,
    minWidth: 300,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 20,
    color: "white",
  },
});

export default Button;
