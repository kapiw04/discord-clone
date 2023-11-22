import { ReactElement } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { TextInput as RNTextInput, View, StyleSheet, Text } from "react-native";

type TextInputProps<T extends FieldValues> = {
  placeholder: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
};

const TextInput = <T extends FieldValues>({
  placeholder,
  label,
  control,
  name,
}: TextInputProps<T>): ReactElement => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
      >
        {value}
      </RNTextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default TextInput;
