import { FC } from "react";
import { Pressable } from "react-native";
import BackArrow from "../assets/images/back-arrow.svg";
import { useRouter } from "expo-router";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <Pressable onPress={router.back}>
      <BackArrow />
    </Pressable>
  );
};

export default BackButton;
