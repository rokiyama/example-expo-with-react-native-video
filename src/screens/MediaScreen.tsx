import { StyleSheet, Text, View } from "react-native";

export const MediaScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is MediaScreen</Text>
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
