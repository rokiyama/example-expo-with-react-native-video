// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { AssetInfo } from "../types/cameraRoll";
import { useTailwind } from "tailwind-rn";

type Props = {
  item: AssetInfo;
};

export const Media = ({ item }: Props) => {
  const tw = useTailwind();
  const { width, height } = useWindowDimensions();
  // const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const video = useRef(null);
  return (
    <View style={[{ width, height }, tw("flex-1 items-center justify-center")]}>
      {item.mediaType === "photo" ? (
        <Image
          style={{ width, height, resizeMode: "contain" }}
          source={{ uri: item.uri }}
        />
      ) : item.mediaType === "video" ? (
        <>
          <Text>video type is not yet implemented</Text>
          {/* <Video
            ref={video}
            style={{ ...styles.video, width, height }}
            source={{ uri: item.localUri ? item.localUri : item.uri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text>{status && status.isLoaded}</Text> */}
        </>
      ) : (
        <Text>Error: [{item.mediaType}] unknown media type</Text>
      )}
    </View>
  );
};
