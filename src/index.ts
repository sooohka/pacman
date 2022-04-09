import C from "./canvas";
import Cell from "./cell";
import { CANVAS, CELL, GHOST_IMAGES } from "./constant";
import {
  checkCells,
  checkEnd,
  checkGhostNextMove,
  checkPlayerNextMove,
  countCoins,
  drawMap,
  isColliding,
  mapToCell,
} from "./gameUtil";
import Ghost from "./ghost";
import Keys from "./key";
import map from "./map";
import Player from "./player";
import "./styles/style.css";

function animate(cells: Cell[], player: Player, ghosts: Ghost[], totalCoin: number) {
  for (const ghost of ghosts) {
    if (isColliding(player, ghost)) {
      alert("collides");
      return;
    }
  }
  const frameId = requestAnimationFrame(animate.bind(this, cells, player, ghosts, totalCoin));

  C.clearRect(0, 0, window.innerWidth, window.outerHeight);

  checkPlayerNextMove(player, cells);
  // check ghost's next move
  checkGhostNextMove(ghosts, cells);

  checkCells(cells, player, ghosts);

  // move
  ghosts.forEach((ghost) => {
    ghost.move();
  });
  player.move();

  drawMap(cells, player, ghosts);
  if (checkEnd(totalCoin, player)) {
    cancelAnimationFrame(frameId);
  }
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
  const keys = new Keys();

  switch (e.key) {
    case "ArrowLeft": {
      keys.pressKey("left");
      break;
    }
    case "ArrowRight": {
      keys.pressKey("right");
      break;
    }
    case "ArrowUp": {
      keys.pressKey("up");
      break;
    }
    case "ArrowDown": {
      keys.pressKey("down");
      break;
    }
    default: {
      break;
    }
  }
});

function init() {
  const cells = mapToCell(map[1]);
  const totalCoin = countCoins(cells);

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
        y: CANVAS.HEIGHT - CELL.HEIGHT * 2,
      },
      image: GHOST_IMAGES.red,
    }),
    new Ghost({
      position: {
        x: CANVAS.WIDTH - CELL.WIDTH * 2,
        y: CANVAS.HEIGHT - CELL.HEIGHT * 2,
      },
      image: GHOST_IMAGES.yellow,
    }),
    new Ghost({
      position: {
        x: CANVAS.WIDTH - CELL.WIDTH * 2,
        y: CANVAS.HEIGHT - CELL.HEIGHT * 2,
      },
      image: GHOST_IMAGES.orange,
    }),
  ];

  animate(cells, player, ghosts, totalCoin);
}

init();
