import { View } from "react-native";

export const Food = ({ food }: { food: { x: number; y: number } }) => {
  return (
    <View
      className="bg-red-500 absolute"
      style={{
        width: 10,
        height: 10,
        left: food.x * 10,
        top: food.y * 10,
        position: "absolute",
        borderRadius: 5,
      }}
    />
  );
};
