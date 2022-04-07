import Cell from "./cell";
import { CELL, CELL_IMAGES, CellKey } from "./constant";
import Player from "./player";

function isColliding(cell: Cell, player: Player) {
  const [bL, bR] = [cell.position.x, cell.position.x + cell.width];
  const [bU, bD] = [cell.position.y, cell.position.y + cell.height];
  const [pL, pR] = [
    player.position.x - player.radius + player.velocity.x,
    player.position.x + player.radius + player.velocity.x,
  ];
  const [pU, pD] = [
    player.position.y - player.radius + player.velocity.y,
    player.position.y + player.radius + player.velocity.y,
  ];
  if (pL < bR && pU < bD && pR > bL && pD > bU) return true;
  return false;
}

// TODO:다시구현
function isTouching(cell: Cell, player: Player) {
  const [bL, bR] = [cell.position.x, cell.position.x + cell.width];
  const [bU, bD] = [cell.position.y, cell.position.y + cell.height];
  const [pL, pR] = [
    player.position.x - player.radius + player.velocity.x,
    player.position.x + player.radius + player.velocity.x,
  ];
  const [pU, pD] = [
    player.position.y - player.radius + player.velocity.y,
    player.position.y + player.radius + player.velocity.y,
  ];
  if (pL < bR && pU < bD && pR > bL && pD > bU) return true;
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

function drawMap(_map: CellKey[][], player: Player) {
  setMap(_map).forEach((cell) => {
    cell.draw();
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

export {
  cellsToMap,
  countCoins,
  isTouching,
  checkNextMove,
  isColliding,
  setMap,
  drawMap,
};
