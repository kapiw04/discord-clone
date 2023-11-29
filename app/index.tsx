import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";

const defaultValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export default function Register() {
  const { control, handleSubmit, setError } = useForm({ defaultValues });
  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
    repeatPassword,
  }: typeof defaultValues) => {
    if (password !== repeatPassword) {
      setError("repeatPassword", { message: "Passwords are not identical!" });
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(user);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
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
          required
          pattern={
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          }
        />
        <TextInput
          name="password"
          control={control}
          placeholder="Type in your password"
          label="Password"
          required
          password
        />
        <TextInput
          name="repeatPassword"
          control={control}
          placeholder="Repeat your password"
          label="Repeat password"
          required
          password
        />
        <Button onPress={handleSubmit(onSubmit)} label="Register" />
      </View>
      <Link href="/login">Login</Link>
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
