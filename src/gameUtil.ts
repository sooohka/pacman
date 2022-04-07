import Cell from "./cell";
import { CELL, CELL_IMAGES, CellKey } from "./constant";
import Ghost from "./ghost";
import Player from "./player";

function isColliding(cell: Cell, target: Player | Ghost) {
  const [bL, bR] = [cell.position.x, cell.position.x + cell.width];
  const [bU, bD] = [cell.position.y, cell.position.y + cell.height];
  let tL;
  let tR;
  let tU;
  let tD;

  if (target instanceof Ghost) {
    tL = target.position.x + target.velocity.x;
    tR = target.position.x + target.width + target.velocity.x;
    tU = target.position.y + target.velocity.y;
    tD = target.position.y + target.height + target.velocity.y;
  } else {
    tL = target.position.x - target.radius + target.velocity.x;
    tR = target.position.x + target.radius + target.velocity.x;
    tU = target.position.y - target.radius + target.velocity.y;
    tD = target.position.y + target.radius + target.velocity.y;
  }
  if (tL < bR && tU < bD && tR > bL && tD > bU) return true;
  return false;
}

// TODO:다시구현
function isTouching(cell: Cell, player: Player) {
  const [cx, cy] = [
    cell.position.x + cell.width / 2,
    cell.position.y + cell.height / 2,
  ];
  const [px, py] = [player.position.x, player.position.y];

  if (Math.abs(px - cx) < 5 && Math.abs(py - cy) < 5) return true;
  return false;
}

function checkNextMove(
  player: Player,
  cells: Cell[],
  nextMove: Player["velocity"]
) {
  for (const cell of cells) {
    const moPlayer = {
      ...player,
      velocity: nextMove,
    } as Player;
    if (cell.isBoundary && isColliding(cell, moPlayer)) {
      player.setVelocity({
        x: nextMove.x === 0 ? undefined : 0,
        y: nextMove.y === 0 ? undefined : 0,
      });
      break;
    } else {
      player.setVelocity({
        x: nextMove.x === 0 ? undefined : nextMove.x,
        y: nextMove.y === 0 ? undefined : nextMove.y,
      });
    }
  }
}

function checkGhostNextMove(
  ghost: Ghost,
  cells: Cell[],
  nextMove: Ghost["velocity"]
) {
  for (const cell of cells) {
    const moGhost = {
      ...ghost,
      velocity: nextMove,
    } as Ghost;
    if (cell.isBoundary && isColliding(cell, moGhost)) {
      console.log("hi");

      ghost.setVelocity({
        x: nextMove.x === 0 ? undefined : 0,
        y: nextMove.y === 0 ? undefined : 0,
      });
      break;
    } else {
      ghost.setVelocity({
        x: nextMove.x === 0 ? undefined : nextMove.x,
        y: nextMove.y === 0 ? undefined : nextMove.y,
      });
    }
  }
}

function setMap(map: CellKey[][]) {
  const cells: Cell[] = [];
  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      const position = {
        y: CELL.HEIGHT * i,
        x: CELL.WIDTH * j,
      };
      const image = CELL_IMAGES[cell];
      cells.push(new Cell({ position, image, cellType: cell }));
    });
  });
  return cells;
}

function drawMap(_map: CellKey[][], player: Player, ghosts: Ghost[]) {
  setMap(_map).forEach((cell) => {
    cell.draw();
  });
  ghosts.forEach((ghost) => {
    ghost.draw();
  });
  player.draw();
}

function cellsToMap(cells: Cell[], mapW: number) {
  const map: CellKey[][] = [];
  cells.forEach((cell, i) => {
    const col = Math.floor(i / mapW);

    if (i % mapW === 0) {
      const arr = [cell.cellType];
      map.push(arr);
    } else {
      map[col].push(cell.cellType);
    }
  });
  return map;
}

function countCoins(map: CellKey[][]) {
  let count = 0;
  map.forEach((col) => {
    col.forEach((row) => {
      if (row === "1") count += 1;
    });
  });
  return count;
}

function generateGhostNextMove() {
  const val = [
    "left" as const,
    "right" as const,
    "up" as const,
    "down" as const,
  ];
  const ran = Math.floor(Math.random() * 4);
  return val[ran];
}

export {
  checkGhostNextMove,
  generateGhostNextMove,
  cellsToMap,
  countCoins,
  isTouching,
  checkNextMove,
  isColliding,
  setMap,
  drawMap,
};
