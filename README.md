<h1 align="center">Snake Game</h1>

<p align="center">
	A simple swipe-controlled Snake game built with Expo and React Native.
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Expo-57.0.23-000020?logo=expo&logoColor=white" alt="Expo 57.0.23" />
	<img src="https://img.shields.io/badge/React%20Native-0.86.3-61DAFB?logo=react&logoColor=black" alt="React Native 0.86.3" />
	<img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6.0.3" />
	<img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
</p>

## Screen

The game screen contains the current score, a restart action, and a bordered board with a blue snake and red food.

```text
┌──────────────────────────────┐
│           Game Screen        │
│             Score            │
│           [Restart]           │
│                              │
│        ┌──────────────┐      │
│        │              │      │
│        │  ● ● ●   ●   │      │  Blue: snake
│        │              │      │  Red: food
│        │              │      │
│        └──────────────┘      │
└──────────────────────────────┘
```

## Features

- Swipe in four directions to control the snake.
- The snake moves continuously at a 100 ms interval.
- Eating food increases the score by 10 points and places new food randomly.
- The game ends when the snake leaves the board.
- Restart returns the snake, food, direction, score, and game state to their defaults.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- An Expo-compatible device, simulator, or web browser

### Installation

```bash
pnpm install
```

### Run the project

```bash
# Start the Expo development server
pnpm start

# Open a platform directly
pnpm ios
pnpm android
pnpm web
```

## Controls

On a touch device, swipe across the board to change direction:

| Gesture     | Direction |
| ----------- | --------- |
| Swipe up    | Up        |
| Swipe down  | Down      |
| Swipe left  | Left      |
| Swipe right | Right     |

## Game Flow

```mermaid
flowchart TD
		A[Open app] --> B[Initialize snake, food, score, and direction]
		B --> C{Game over?}
		C -- No --> D{Paused?}
		D -- Yes --> C
		D -- No --> E[Move snake every 100 ms]
		E --> F{Hits board boundary?}
		F -- Yes --> G[End game]
		F -- No --> H{Eats food?}
		H -- Yes --> I[Add 10 points and spawn food]
		H -- No --> J[Remove tail segment]
		I --> C
		J --> C
		G --> K[Press Restart]
		K --> B
```

## Architecture

```mermaid
flowchart LR
		R[src/app/index.tsx] --> G[src/components/Game.tsx]
		G --> S[src/components/Snake.tsx]
		G --> F[src/components/Food.tsx]
		G --> T[src/types/types.ts]
		G --> GH[react-native-gesture-handler]
		G --> NW[NativeWind styles]
```

The `Game` component owns movement, collision detection, score, food placement, and restart state. `Snake` and `Food` are presentational components that render coordinates on the board.

## Project Structure

```text
src/
├── app/
│   ├── _layout.tsx       # Expo Router layout
│   └── index.tsx         # Application entry screen
├── components/
│   ├── Food.tsx          # Food renderer
│   ├── Game.tsx          # Game state and rules
│   └── Snake.tsx         # Snake renderer
└── types/
		└── types.ts          # Shared game types
```

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm start`   | Start the Expo development server |
| `pnpm ios`     | Run the app on iOS                |
| `pnpm android` | Run the app on Android            |
| `pnpm web`     | Run the app in a browser          |
| `pnpm lint`    | Run Expo linting                  |

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
