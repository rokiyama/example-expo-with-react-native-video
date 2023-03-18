import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
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
  useEffect(() => loadMore(15), []);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
