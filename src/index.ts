import C from "./canvas";
import Cell from "./cell";
import {
  CANVAS,
  CELL,
  CellKey,
  GHOST,
  GHOST_IMAGES,
  MAP,
  PLAYER,
} from "./constant";
import {
  cellsToMap,
  checkGhostNextMove,
  checkNextMove,
  countCoins,
  drawMap,
  generateGhostNextMove,
  isColliding,
  isTouching,
  setMap,
} from "./gameUtil";
import Ghost from "./ghost";
import keys, { pressKey } from "./key";
import map from "./map";
import Player from "./player";
import "./styles/style.css";

const player = new Player({
  position: {
    x: CELL.WIDTH + CELL.WIDTH / 2,
    y: CELL.HEIGHT + CELL.HEIGHT / 2,
  },
});

const ghosts = [
  new Ghost({
    position: {
      x: CANVAS.WIDTH - CELL.WIDTH * 2,
      y: CANVAS.HEIGHT - CELL.HEIGHT * 8,
    },
    image: GHOST_IMAGES.red,
  }),
  new Ghost({
    position: {
      x: CANVAS.WIDTH - CELL.WIDTH * 5,
      y: CANVAS.HEIGHT - CELL.HEIGHT * 5,
    },
    image: GHOST_IMAGES.yellow,
  }),
  new Ghost({
    position: {
      x: CANVAS.WIDTH - CELL.WIDTH * 8,
      y: CANVAS.HEIGHT - CELL.HEIGHT * 2,
    },
    image: GHOST_IMAGES.orange,
  }),
];

let myMap: CellKey[][] = map[1];
const totalCoin = countCoins(myMap);
let cells: Cell[];

function animate() {
  const num = requestAnimationFrame(animate);

  cells = setMap(myMap);
  C.clearRect(0, 0, window.innerWidth, window.outerHeight);
  // player
  if (keys.left.pressed) {
    checkNextMove(player, cells, { x: -PLAYER.SPEED, y: 0 });
  }
  if (keys.right.pressed) {
    checkNextMove(player, cells, { x: PLAYER.SPEED, y: 0 });
  }
  if (keys.up.pressed) {
    checkNextMove(player, cells, { x: 0, y: -PLAYER.SPEED });
  }
  if (keys.down.pressed) {
    checkNextMove(player, cells, { x: 0, y: PLAYER.SPEED });
  }
  // ghosts
  // right
  ghosts.forEach((ghost) => {
    if (ghost.nextMove === "right") {
      checkGhostNextMove(ghost, cells, { x: GHOST.SPEED, y: 0 });
    }
    // left
    if (ghost.nextMove === "left") {
      checkGhostNextMove(ghost, cells, { x: -GHOST.SPEED, y: 0 });
    }
    // up
    if (ghost.nextMove === "up") {
      checkGhostNextMove(ghost, cells, { x: 0, y: -GHOST.SPEED });
    }
    // down
    if (ghost.nextMove === "down") {
      checkGhostNextMove(ghost, cells, { x: 0, y: GHOST.SPEED });
    }
  });
  cells.forEach((c) => {
    ghosts.forEach((ghost) => {
      if (c.isBoundary && isColliding(c, ghost)) {
        ghost.setVelocity({ x: 0, y: 0 });
      }
    });

    if (c.isBoundary && isColliding(c, player)) {
      player.setVelocity({ x: 0, y: 0 });
    } else if (c.isCoin && isTouching(c, player)) {
      player.eat();
      c.removeCoin();
    }
  });

  ghosts.forEach((ghost) => {
    ghost.move();
  });

  player.move();
  myMap = cellsToMap(cells, MAP.WIDTH);
  drawMap(myMap, player, ghosts);

  if (player.point >= totalCoin) {
    alert("win");
    cancelAnimationFrame(num);
  }
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

setInterval(() => {
  ghosts.forEach((ghost) => {
    ghost.setNextMove(generateGhostNextMove());
  });
}, 700);
