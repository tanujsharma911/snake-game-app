import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Game from "../components/Game";

export default function Index() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Game />
    </GestureHandlerRootView>
  );
}
