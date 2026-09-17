import { Pressable, View } from "react-native";

export default function Button({
  onPress,
  variant = "primary",
  children,
}: {
  onPress: () => void;
  variant?: "primary" | "destructive" | "success";
  children: React.ReactNode;
}) {
  const backgroundColor = {
    primary: "#e4e4e7",
    destructive: "#FF4545",
    success: "#bfe45d",
  };

  const highlightColor = {
    primary: "#ffffff",
    destructive: "#FF6B6B",
    success: "#e7fcb2",
  };

  const shadowColor = {
    primary: "#9f9fa9",
    destructive: "#b91c1c",
    success: "#749816",
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 border-4 border-zinc-800 border-b-8 p-3 items-center justify-center active:translate-y-1 active:border-b-4 relative overflow-hidden"
      style={{
        backgroundColor: backgroundColor[variant],
      }}
    >
      {/* Inner white highlight: top-left */}
      <View
        pointerEvents="none"
        className="absolute top-0 left-0 right-0 bottom-0 border-t-2 border-l-2"
        style={{
          borderColor: highlightColor[variant],
        }}
      />

      {/* Inner gray shadow: bottom-right */}
      <View
        pointerEvents="none"
        className="absolute top-0 left-0 right-0 bottom-0 border-b-2 border-r-2"
        style={{
          borderColor: shadowColor[variant],
        }}
      />

      {children}
    </Pressable>
  );
}
