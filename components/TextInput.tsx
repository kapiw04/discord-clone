import { ReactElement } from "react";
import {
  Control,
  type FieldValues,
  type Path,
  type ValidationRule,
  useController,
} from "react-hook-form";
import { TextInput as RNTextInput, View, StyleSheet, Text } from "react-native";

type TextInputProps<T extends FieldValues> = {
  placeholder: string;
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  pattern?: RegExp;
  password?: boolean;
};

const TextInput = <T extends FieldValues>({
  placeholder,
  control,
  name,
  required,
  pattern,
  password,
}: TextInputProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: { value: !!required, message: "This field is required!" },
      pattern: pattern
        ? { value: pattern, message: "This field does not match pattern!" }
        : undefined,
    },
  });

  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={password}
        value={value}
      />
      {error?.message ? (
        <Text style={styles.error}>{error.message}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
  input: {
    backgroundColor: "#E4E5E8",
    borderRadius: 2,
    padding: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  error: {
    fontSize: 12,
    color: "red",
  },
});

export default TextInput;
