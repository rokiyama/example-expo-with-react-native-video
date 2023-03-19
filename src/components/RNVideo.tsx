import { useRef } from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
// @ts-ignore
import Video from "react-native-video";

type Props = {
  uri: string;
  paused: boolean;
  setPaused: (paused: boolean) => void;
};

export const RNVideo = ({ uri, paused, setPaused }: Props) => {
  const tw = useTailwind();
  const video = useRef(null);
  const { width } = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setPaused(!paused);
        }}
        style={tw("items-center")}
      >
        <Video
          ref={video}
          source={{ uri }}
          style={[{ width }, tw("flex-1")]}
          rate={1}
          paused={paused}
          volume={1}
          muted={false}
          resizeMode="contain"
          repeat={true}
        />
        <Text style={tw("flex-none")}>paused={String(paused)}</Text>
      </TouchableOpacity>
    </>
  );
};
