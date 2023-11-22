import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const defaultValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values);
  };

  const registerWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
        <TextInput
          name="repeatPassword"
          control={control}
          placeholder="Repeat your password"
          label="Repeat password"
        />
        <Button onPress={handleSubmit(onSubmit)} label="Register" />
        <Button onPress={registerWithGoogle} label="Register with Google" />
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
