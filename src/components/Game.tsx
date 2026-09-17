import { Coordinate, Direction } from "@/types/types";
import { Feather } from "@react-native-vector-icons/feather";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";
import { Food } from "./Food";
import GameOverModel from "./GameOverModel";
import Snake from "./Snake";

const SNAKE_INITIAL = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 32, yMin: 0, yMax: 50 };
const MOVE_INTERVAL = 100;
const SCORE_INCREMENT = 10;

const Game = () => {
  const insets = useSafeAreaInsets();
  const screenRef = useRef<View>(null);

  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setPaused] = useState(false);

  const handleSwipe = (translationX: number, translationY: number) => {
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // Swipe right
        setDirection((prev) =>
          prev === Direction.Left ? Direction.Left : Direction.Right,
        );
      } else {
        // Swipe left
        setDirection((prev) =>
          prev === Direction.Right ? Direction.Right : Direction.Left,
        );
      }
    } else {
      if (translationY > 0) {
        // Swipe down
        setDirection((prev) =>
          prev === Direction.Up ? Direction.Up : Direction.Down,
        );
      } else {
        // Swipe up
        setDirection((prev) =>
          prev === Direction.Down ? Direction.Down : Direction.Up,
        );
      }
    }
  };

  const checkCollision = (head: Coordinate) => {
    if (
      head.x < GAME_BOUNDS.xMin ||
      head.x > GAME_BOUNDS.xMax ||
      head.y < GAME_BOUNDS.yMin ||
      head.y > GAME_BOUNDS.yMax
    ) {
      setGameOver(true);
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
        return true;
      }
    }

    return false;
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case Direction.Right:
          head.x += 1;
          break;
        case Direction.Left:
          head.x -= 1;
          break;
        case Direction.Up:
          head.y -= 1;
          break;
        case Direction.Down:
          head.y += 1;
          break;
      }

      if (checkCollision(head)) {
        return newSnake;
      }

      if (head.x === food.x && head.y === food.y) {
        setScore((prevScore) => prevScore + SCORE_INCREMENT);
        setFood({
          x: Math.floor(Math.random() * (GAME_BOUNDS.xMax + 1)),
          y: Math.floor(Math.random() * (GAME_BOUNDS.yMax + 1)),
        });
      } else {
        newSnake.pop();
      }

      newSnake.unshift(head);

      return newSnake;
    });
  };

  const resetGame = () => {
    setSnake(SNAKE_INITIAL);
    setDirection(Direction.Right);
    setFood(FOOD_INITIAL_POSITION);
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  const panGesture = Gesture.Pan().onEnd((event) => {
    runOnJS(handleSwipe)(event.translationX, event.translationY);
  });

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      !isPaused && moveSnake();
    }, MOVE_INTERVAL);

    return () => clearInterval(interval);
  }, [direction, isPaused, isGameOver]);

  return (
    <GestureDetector gesture={panGesture}>
      <View
        className="bg-white flex-1 px-6"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        ref={screenRef}
      >
        <Text className="text-4xl mt-5 font-[PatrickHand]">
          Snake and Food Game
        </Text>
        <Text className="text-2xl font-[PatrickHand]">Score: {score}</Text>

        <View className="flex items-center mt-5">
          <View
            className="bg-zinc-100 border-2 border-zinc-300"
            style={{
              width: (GAME_BOUNDS.xMax + 1) * 10 + 2, // including the 0th index, so we add 1
              height: (GAME_BOUNDS.yMax + 1) * 10 + 2,
            }}
          >
            <Snake snake={snake} />
            <Food food={food} />
          </View>
        </View>

        <View className="flex-row gap-4 mt-5">
          <Button onPress={() => resetGame()}>
            <Feather name="refresh-ccw" size={28} color="#171717" />
          </Button>

          <Button onPress={() => setPaused((prev) => !prev)}>
            <Feather
              name={isPaused ? "play" : "pause"}
              size={28}
              color="#171717"
            />
          </Button>
        </View>

        <GameOverModel
          isGameOver={isGameOver}
          setGameOver={setGameOver}
          resetGame={resetGame}
          score={score}
          screenRef={screenRef}
        />
      </View>
    </GestureDetector>
  );
};

export default Game;
