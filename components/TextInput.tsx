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
  label: string;
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  pattern?: RegExp;
  password?: boolean;
};

const TextInput = <T extends FieldValues>({
  placeholder,
  label,
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
      <Text style={styles.label}>{label}</Text>
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
  error: {
    fontSize: 12,
    color: "red",
  },
});

export default TextInput;
