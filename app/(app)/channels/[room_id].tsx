import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function roomId() {
  let local = useLocalSearchParams();
  console.log(`roomId: ${local.room_id}`);
  return (
    <View>
      <Text>git</Text>
    </View>
  );
}
