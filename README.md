# Flappy Bird Clone

This project is a JavaScript-based clone of the popular mobile game "Flappy Bird." It uses vanilla JavaScript and the browser's DOM to create a simple yet engaging game where you control a bird that must avoid oncoming pipes by flapping to overcome gravity.

## Features

- **Dynamic Pipe Generation:**  
  Pipes are created at regular intervals with randomized vertical positions and move from right to left. Once off-screen, pipes are removed to save memory.

- **Bird Movement and Gravity:**  
  The bird is constantly pulled down by gravity. You can make it flap upward by pressing the **ArrowUp** key or the **Space** bar.

- **Collision Detection:**  
  The game checks for collisions between the bird and the pipes, as well as the top and bottom boundaries of the game area. A collision results in a game over.

- **Scoring System:**  
  The score increases each time the bird successfully passes a pipe.

- **Restart Functionality:**  
  After a collision, the game ends and displays a "Press Enter To Restart" message. Pressing **Enter** will clear the pipes, reset the bird's position and score, and start a new game.

- **Responsive Controls:**  
  A single global keydown listener manages both game start/restart (with **Enter**) and bird flapping (with **ArrowUp** or **Space**).

## How to Play

1. **Start the Game:**  
   - Press the **Enter** key to start the game.  
   - If the game has ended, press **Enter** to restart.

2. **Control the Bird:**  
   - Press **ArrowUp** or **Space** to make the bird flap upward.

3. **Objective:**  
   - Navigate the bird through the gaps between the pipes without colliding with them or the boundaries of the game area.
   - Each successful pass increases your score.

4. **Game Over:**  
   - The game ends if the bird collides with a pipe or goes off the screen.
   - A message will prompt you to press **Enter** to restart.

