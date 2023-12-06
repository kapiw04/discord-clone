import { Link, useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Button from "../components/Button";

export default function Register() {
  const router = useRouter();

  const navigateToLogin = () => router.push("/login");
  const navigateToRegister = () => router.push("/register");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cześć nieznajomy</Text>
      <View style={styles.formContainer}>
        <Link href="/register">
          <Button onPress={navigateToRegister} label="Rejestracja" />
        </Link>
        <Link href="/login">
          <Button onPress={navigateToLogin} label="Logowanie" secondary />
        </Link>
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
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
});
