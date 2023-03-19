import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { Media } from "../components/Media";
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
  const tw = useTailwind();
  const { index } = route.params;
  const { width } = useWindowDimensions();
  const [count, setCount] = useState(0);
  const { assets, loadMore } = useCameraRoll();
  const [currentIndex, setCurrentIndex] = useState(index);
  // https://github.com/facebook/react-native/issues/30171
  const onViewableItemsChanged = useRef<onViewableItemsChanged>(
    ({ viewableItems }) => {
      if (viewableItems.length < 1) {
        return;
      }
      const i = viewableItems[viewableItems.length - 1].index;
      if (!i) {
        return;
      }
      setCurrentIndex(i);
    }
  );
  return (
    <SafeAreaView style={tw("flex-1")}>
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
        data={assets}
        onEndReached={() => loadMore(6)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Media item={item} current={index === currentIndex} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
