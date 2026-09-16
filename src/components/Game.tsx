import { Coordinate, Direction } from "@/types/types";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Food } from "./Food";
import Snake from "./Snake";

const SNAKE_INITIAL = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 32, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 100;
const SCORE_INCREMENT = 10;

const Game = () => {
  const insets = useSafeAreaInsets();

  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setPaused] = useState(false);

  const handleGesture = (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => {
    if (
      Math.abs(event.nativeEvent.translationX) >
      Math.abs(event.nativeEvent.translationY)
    ) {
      if (event.nativeEvent.translationX > 0) {
        console.log("Right");
        setDirection(Direction.Right);
      } else {
        console.log("Left");
        setDirection(Direction.Left);
      }
    } else {
      if (event.nativeEvent.translationY > 0) {
        console.log("Down");
        setDirection(Direction.Down);
      } else {
        console.log("Up");
        setDirection(Direction.Up);
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

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      !isPaused && moveSnake();
    }, MOVE_INTERVAL);

    return () => clearInterval(interval);
  }, [direction, isPaused, isGameOver]);

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View
        className="bg-white flex-1 px-6 items-center"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Text>Game Screen</Text>
        <Text>{score}</Text>
        <Pressable
          onPress={() => {
            setSnake(SNAKE_INITIAL);
            setDirection(Direction.Right);
            setFood(FOOD_INITIAL_POSITION);
            setScore(0);
            setGameOver(false);
          }}
        >
          <Text>Restart</Text>
        </Pressable>
        <View
          className="border"
          style={{
            width: (GAME_BOUNDS.xMax + 1) * 10 + 2, // including the 0th index, so we add 1
            height: (GAME_BOUNDS.yMax + 1) * 10 + 2,
          }}
        >
          <Snake snake={snake} />
          <Food food={food} />
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default Game;
