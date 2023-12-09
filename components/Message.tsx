import { Text, View } from "react-native";

interface MessageProps {
  message: string;
  username: string;
}

export default function Message({ message, username }: MessageProps) {
  return (
    <View>
      <Text>
        {username}: {message}
      </Text>
    </View>
  );
}
