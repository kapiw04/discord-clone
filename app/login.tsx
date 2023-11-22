import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const defaultValues = {
  email: "",
  password: "",
};

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.formContainer}>
        <TextInput
          name="email"
          control={control}
          placeholder="Type in your email"
          label="email"
        />
        <TextInput
          name="password"
          control={control}
          placeholder="Type in your password"
          label="Password"
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)} label="Register" />
      <Link href="/">Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    width: "80%",
    height: 200,
    justifyContent: "space-between",
  },
});
