import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { auth } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { control, handleSubmit } = useForm({ defaultValues });
  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = async ({ email, password }: typeof defaultValues) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      </View>
      <Button onPress={handleSubmit(onSubmit)} label="Login" />
      <Link href="/">Login</Link>
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
