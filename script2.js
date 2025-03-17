// Background scrolling speed
let move_speed = 3;
  
// Gravity constant value
let gravity = 0.5;
  
// Getting reference to the bird element
let bird = document.querySelector('.bird');
  
// Getting bird element properties
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
  
// Getting reference to the score and message elements
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
  
// Setting initial game state to start
let game_state = 'Start';

// Global vertical velocity for the bird
let bird_dy = 0;
  
// Global keydown listener for both starting/restarting and flapping
document.addEventListener('keydown', (e) => {
  // Start (or restart) the game if Enter is pressed and game is not currently playing
  if (e.key === 'Enter' && game_state !== 'Play') {
    // Remove any existing pipes
    document.querySelectorAll('.pipe_sprite').forEach((el) => {
      el.remove();
    });
    // Reset bird's position and vertical velocity
    bird.style.top = '40vh';
    bird_dy = 0;
    // Reset game state, score, and message then start the game loop
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    play();
  }
  // When the game is playing, let the bird flap with ArrowUp or Space
  if ((e.key === 'ArrowUp' || e.key === ' ') && game_state === 'Play') {
    bird_dy = -7.6;
  }
});
  
function play() {
  // Reset pipe separation counter and define the gap between pipes
  let pipe_seperation = 0;
  let pipe_gap = 35;
  
  // Function to move pipes and check for collisions
  function move() {
    if (game_state !== 'Play') return;
    
    let pipes = document.querySelectorAll('.pipe_sprite');
    pipes.forEach((pipe) => {
      let pipe_props = pipe.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();
      
      // Remove pipe if it has moved off screen
      if (pipe_props.right <= 0) {
        pipe.remove();
      } else {
        // Collision detection between bird and pipe
        if (
          bird_props.left < pipe_props.left + pipe_props.width &&
          bird_props.left + bird_props.width > pipe_props.left &&
          bird_props.top < pipe_props.top + pipe_props.height &&
          bird_props.top + bird_props.height > pipe_props.top
        ) {
          game_state = 'End';
          message.innerHTML = 'Press Enter To Restart';
          message.style.left = '28vw';
          return;
        } else {
          // Increase score if the bird has just passed the pipe
          if (
            pipe_props.right < bird_props.left &&
            pipe_props.right + move_speed >= bird_props.left &&
            pipe.increase_score == '1'
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            pipe.increase_score = '0';
          }
          // Move the pipe to the left
          pipe.style.left = (pipe_props.left - move_speed) + 'px';
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
  
  // Function to apply gravity to the bird
  function apply_gravity() {
    if (game_state !== 'Play') return;
    
    // Update bird's vertical speed with gravity
    bird_dy += gravity;
    // Update bird's position (using pixel values from getBoundingClientRect)
    bird.style.top = (bird.getBoundingClientRect().top + bird_dy) + 'px';
    bird_props = bird.getBoundingClientRect();
    
    // Collision detection with the top or bottom of the background
    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = 'End';
      message.innerHTML = 'Press Enter To Restart';
      message.style.left = '28vw';
      return;
    }
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);
  
  // Function to create pipes at intervals
  function create_pipe() {
    if (game_state !== 'Play') return;
    
    if (pipe_seperation > 115) {
      pipe_seperation = 0;
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      
      // Create the top (inverted) pipe
      let pipe_sprite_inv = document.createElement('div');
      pipe_sprite_inv.className = 'pipe_sprite';
      pipe_sprite_inv.style.top = (pipe_posi - 70) + 'vh';
      pipe_sprite_inv.style.left = '100vw';
      document.body.appendChild(pipe_sprite_inv);
      
      // Create the bottom pipe
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = (pipe_posi + pipe_gap) + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = '1';
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
