import { useEffect, useState } from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AssetInfo } from "../types/cameraRoll";
import { RNVideo } from "./RNVideo";

type Props = {
  item: AssetInfo;
  current: boolean;
};

export const Media = ({ item, current }: Props) => {
  const tw = useTailwind();
  const { width, height } = useWindowDimensions();
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    if (!current) {
      setPaused(true);
    }
  }, [current]);
  return (
    <View style={[{ width, height }, tw("flex-1 items-center justify-center")]}>
      {item.mediaType === "photo" ? (
        <Image
          style={{ width, height, resizeMode: "contain" }}
          source={{ uri: item.uri }}
        />
      ) : item.mediaType === "video" ? (
        <RNVideo
          paused={paused}
          setPaused={setPaused}
          uri={item.localUri || item.uri}
        />
      ) : (
        <Text>Error: [{item.mediaType}] unknown media type</Text>
      )}
    </View>
  );
};
