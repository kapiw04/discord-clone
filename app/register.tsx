import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthStore } from "../stores/auth";
import { EMAIL_REGEX } from "../helpers/constants";
import { useEffect } from "react";

const defaultValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export default function Register() {
  const { control, handleSubmit, setError } = useForm({ defaultValues });
  const { setUser, user } = useAuthStore();
  const router = useRouter();

  const navigateToLogin = () => router.push("/login");

  const onSubmit = async ({
    email,
    password,
    repeatPassword,
  }: typeof defaultValues) => {
    if (password !== repeatPassword) {
      setError("repeatPassword", { message: "Hasła nie są identyczne!" });
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

  useEffect(() => {
    if (user) {
      router.push("/home/");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <View style={styles.formContainer}>
        <TextInput
          name="email"
          control={control}
          placeholder="email"
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
        <TextInput
          name="repeatPassword"
          control={control}
          placeholder="Powtórz hasło"
          required
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit(onSubmit)} label="Zarejestruj się" />
        <Button onPress={navigateToLogin} label="Zaloguj się" secondary />
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
