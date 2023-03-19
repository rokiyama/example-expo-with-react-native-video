import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useCameraRoll } from "../hooks/useCameraRoll";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { width } = useWindowDimensions();
  const { assets, loadMore } = useCameraRoll();
  useEffect(() => loadMore(18), []);

  return (
    <View>
      <FlatList
        numColumns={3}
        data={assets}
        keyExtractor={(item) => item.id}
        onEndReached={() => loadMore(6)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Media", { index });
            }}
          >
            <Image
              style={{ width: width / 3, height: width / 3 }}
              source={{ uri: item.uri }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
