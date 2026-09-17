import { useEffect, useState } from "react";
import { Text, View } from "react-native";

function getFood() {
  const food = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🥑", "🥦", "🥕", "🌽"];

  const randomIndex = Math.floor(Math.random() * food.length);

  return food[randomIndex];
}

export const Food = ({ food }: { food: { x: number; y: number } }) => {
  const [currentFood, setCurrentFood] = useState(getFood());

  useEffect(() => {
    setCurrentFood(getFood());
  }, [food]);

  return (
    <View
      className="absolute"
      style={{
        width: 10,
        height: 10,
        left: food.x * 10,
        top: food.y * 10,
        position: "absolute",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Text className="text-base overflow-visible -right-0.5 h-[20px] w-[20px]">
        {currentFood}
      </Text>
    </View>
  );
};
