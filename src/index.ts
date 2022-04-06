import { getBoundaries } from "./boundary";
import C from "./canvas";
import { BOUNDARY, PLAYER } from "./constant";
import { checkNextMove, isColliding } from "./gameUtil";
import keys, { pressKey } from "./key";
import map, { drawMap } from "./map";
import Player from "./player";
import "./styles/style.css";

const player = new Player({
  position: {
    x: BOUNDARY.WIDTH + BOUNDARY.WIDTH / 2,
    y: BOUNDARY.HEIGHT + BOUNDARY.HEIGHT / 2,
  },
});

function animate() {
  requestAnimationFrame(animate);
  const boundaries = getBoundaries(map[1]);
  C.clearRect(0, 0, window.innerWidth, window.outerHeight);
  if (keys.left.pressed) {
    checkNextMove(player, boundaries, { x: -PLAYER.SPEED, y: 0 });
  }
  if (keys.right.pressed) {
    checkNextMove(player, boundaries, { x: PLAYER.SPEED, y: 0 });
  }
  if (keys.up.pressed) {
    checkNextMove(player, boundaries, { x: 0, y: -PLAYER.SPEED });
  }
  if (keys.down.pressed) {
    checkNextMove(player, boundaries, { x: 0, y: PLAYER.SPEED });
  }
  boundaries.forEach((b) => {
    if (isColliding(b, player)) {
      player.setVelocity({ x: 0, y: 0 });
    }
  });
  player.move();
  drawMap(map[1], player);
}

animate();
window.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft": {
      pressKey("left");
      break;
    }
    case "ArrowRight": {
      pressKey("right");
      break;
    }
    case "ArrowUp": {
      pressKey("up");
      break;
    }
    case "ArrowDown": {
      pressKey("down");
      break;
    }
    default: {
      break;
    }
  }
});
