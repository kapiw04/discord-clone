import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { auth } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EMAIL_REGEX } from "../helpers/constants";
import { useEffect } from "react";

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { control, handleSubmit } = useForm({ defaultValues });
  const { setUser, user } = useAuthStore();
  const router = useRouter();

  const navigateToRegister = () => router.push("/register");

  const onSubmit = async ({ email, password }: typeof defaultValues) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/home/");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <View style={styles.formContainer}>
        <TextInput
          name="email"
          control={control}
          placeholder="Email"
          required
          pattern={EMAIL_REGEX}
        />
        <TextInput
          name="password"
          control={control}
          placeholder="Hasło"
          required
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit(onSubmit)} label="Zaloguj się" />
        <Button
          onPress={navigateToRegister}
          label="Zarejestruj się"
          secondary
        />
      </View>
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
    fontSize: 24,
    color: "#276B81",
    marginBottom: 100,
  },
  formContainer: {
    width: "80%",
    gap: 15,
    alignItems: "center",
    paddingVertical: 30,
  },
  buttonContainer: {
    justifyContent: "space-between",
    gap: 15,
    alignItems: "center",
  },
});
