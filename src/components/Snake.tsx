import { Coordinate } from "@/types/types";
import { View } from "react-native";

export default function Snake({ snake }: { snake: Coordinate[] }) {
  return (
    <View>
      {snake.map((segment, index) => (
        <View
          key={index}
          className="bg-sky-500 absolute"
          style={{
            width: 10,
            height: 10,
            left: segment.x * 10,
            top: segment.y * 10,
            position: "absolute",
            borderRadius: 5,
          }}
        />
      ))}
    </View>
  );
}
