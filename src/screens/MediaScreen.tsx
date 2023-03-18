import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import { Media } from "../components/media";
import { useCameraRoll } from "../hooks/useCameraRoll";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Media">;

type onViewableItemsChanged =
  | ((info: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => void)
  | null
  | undefined;

export const MediaScreen = ({ route }: Props) => {
  const { index } = route.params;
  const { width, height } = useWindowDimensions();
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [isSwiping, setIsSwiping] = useState(false);
  // https://github.com/facebook/react-native/issues/30171
  const onViewableItemsChanged = useRef<onViewableItemsChanged>(
    ({ viewableItems }) => {
      if (viewableItems.length < 1) return;
      const i = viewableItems[viewableItems.length - 1].index;
      if (!i) return;
      setCurrentIndex(i);
    }
  );
  const { assets, loadMore } = useCameraRoll();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        initialScrollIndex={index}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onScrollBeginDrag={() => {
          console.log("begin");
          setIsSwiping(true);
        }}
        onMomentumScrollEnd={() => {
          console.log("end");
          setIsSwiping(false);
        }}
        data={assets}
        onEndReached={() => loadMore(3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Media item={item} />
          </TouchableOpacity>
        )}
      />
      <Text>
        index:{index} currentIndex:{currentIndex} count:{count} isSwiping:
        {String(isSwiping)}
      </Text>
      <Text style={{ ...styles.monoFont, color: "seagreen" }}>
        {assets[currentIndex].uri}
      </Text>
      <Text style={{ ...styles.monoFont, color: "sienna" }}>
        {assets[currentIndex].localUri}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  monoFont: {
    fontFamily:
      Platform.OS === "ios"
        ? "Courier New"
        : Platform.OS === "android"
        ? "monospace"
        : "",
  },
});
