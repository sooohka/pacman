import C from "./canvas";
import { CELL, CellKey, MAP, PLAYER } from "./constant";
import {
  cellsToMap,
  checkNextMove,
  countCoins,
  drawMap,
  isColliding,
  isTouching,
  setMap,
} from "./gameUtil";
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

let myMap: CellKey[][] = map[1];
const totalCoin = countCoins(myMap);

function animate() {
  const num = requestAnimationFrame(animate);

  const cells = setMap(myMap);
  C.clearRect(0, 0, window.innerWidth, window.outerHeight);
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
  cells.forEach((c) => {
    if (c.isBoundary && isColliding(c, player)) {
      player.setVelocity({ x: 0, y: 0 });
    } else if (c.isCoin && isTouching(c, player)) {
      player.eat();
      c.removeCoin();
    }
  });
  player.move();

  myMap = cellsToMap(cells, MAP.WIDTH);
  drawMap(myMap, player);
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
