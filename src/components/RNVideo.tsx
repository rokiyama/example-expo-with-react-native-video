import { useRef } from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
// @ts-ignore
import Video from "react-native-video";

type Props = {
  uri: string;
  rate: number;
  setRate: (number) => void;
};

export const RNVideo = ({ uri, rate, setRate }: Props) => {
  const tw = useTailwind();
  const video = useRef(null);
  const { width } = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setRate(rate === 0 ? 1 : 0);
        }}
        style={tw("items-center")}
      >
        <Video
          ref={video}
          source={{ uri }}
          style={[{ width }, tw("flex-1")]}
          rate={rate}
          paused={false}
          volume={1}
          muted={false}
          resizeMode="contain"
          repeat={true}
        />
        <Text style={tw("flex-none")}>rate={rate}</Text>
      </TouchableOpacity>
    </>
  );
};
