import { Feather } from "@react-native-vector-icons/feather";
import { RefObject } from "react";
import { Image, Modal, Text, View } from "react-native";
import Share from "react-native-share";
import { captureRef } from "react-native-view-shot";
import Button from "./Button";

export default function GameOverModel({
  isGameOver,
  setGameOver,
  score,
  resetGame,
  screenRef,
}: {
  isGameOver: boolean;
  score: number;
  setGameOver: (value: boolean) => void;
  resetGame: () => void;
  screenRef: RefObject<View | null>;
}) {
  const shareGameResult = async () => {
    if (!screenRef.current) return;

    try {
      const uri = await captureRef(screenRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      await Share.open({
        title: "Share your Snake score",
        message: `🐍 I scored ${score} points in Snake and Food Game! Can you beat my score? 🎮`,
        url: uri,
        type: "image/png",
      });
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  return (
    <Modal
      visible={isGameOver}
      transparent
      animationType="fade"
      onRequestClose={() => setGameOver(false)}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <View className="w-full max-w-sm bg-white border-4 border-black p-6 items-center">
          <Image
            source={require("@/assets/images/gameover.png")}
            className="h-32"
            resizeMode="contain"
          />

          <View className="bg-zinc-100 mt-3 p-4 w-full items-center border-2 border-zinc-400">
            <Text className=" font-[PatrickHand] text-2xl text-zinc-600">
              Score
            </Text>

            <Text className=" font-[PatrickHand] text-5xl">{score}</Text>
          </View>

          <View className="flex-row gap-2 mt-5">
            <Button onPress={shareGameResult} variant="success">
              <Feather name="share-2" size={28} color="#171717" />
            </Button>
            <Button onPress={resetGame}>
              <Feather name="refresh-ccw" size={28} color="#171717" />
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
