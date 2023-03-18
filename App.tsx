import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/redux/store";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MediaScreen } from "./src/screens/MediaScreen";
import { RootStackParamList } from "./src/types/navigation";
import { Provider } from "react-redux";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Media" component={MediaScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
}
