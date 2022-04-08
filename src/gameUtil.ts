import Cell from "./cell";
import { CELL, CellKey, CELL_IMAGES } from "./constant";
import Ghost from "./ghost";
import Keys from "./key";
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
  if (tL < bR - 1 && tU < bD - 1 && tR > bL + 1 && tD > bU + 1) return true;
  return false;
}

function isTouching(cell: Cell, player: Player) {
  const cx = cell.position.x + cell.width / 2;
  const cy = cell.position.y + cell.height / 2;
  const px = player.position.x;
  const py = player.position.y;
  if (Math.abs(px - cx) < player.radius / 2 && Math.abs(py - cy) < player.radius / 2) {
    return true;
  }
  return false;
}

/**
 * 플레이어의 다음 위치를 체크하고
 * 만약 가능한 위치라면 velocity 다음 진행방향으로 세팅
 * 불가능하다면 전에 velocity 그대로 사용
 */
function checkPlayerNextMove(player: Player, cells: Cell[]) {
  const keys = new Keys();
  const newPlayer = new Player({ position: player.position });
  const prevDirection = player.direction;
  if (keys.getIsPressed("left")) newPlayer.setDirection("left");
  if (keys.getIsPressed("right")) newPlayer.setDirection("right");
  if (keys.getIsPressed("up")) newPlayer.setDirection("up");
  if (keys.getIsPressed("down")) newPlayer.setDirection("down");
  for (const cell of cells) {
    if (cell.isBoundary && isColliding(cell, newPlayer)) {
      player.setDirection(prevDirection);
      break;
    } else {
      player.setDirection(newPlayer.direction);
    }
  }
}

/**
 * 모든 고스트들에 대해 다음에 갈 수 있는 방향을 탐색(possible)
 * 다음에 갈 수 있는 방향 중 현재 방향과 반대되는 방향을 filter함
 * filter된 possible중 랜덤하게 다음 방향 결정
 */
function checkGhostNextMove(ghosts: Ghost[], cells: Cell[]) {
  ghosts.forEach((ghost) => {
    const newGhost = new Ghost({ image: ghost.image, position: ghost.position });
    let shouldFilter: Dir;
    if (ghost.direction === "left") shouldFilter = "right";
    else if (ghost.direction === "right") shouldFilter = "left";
    else if (ghost.direction === "up") shouldFilter = "down";
    else if (ghost.direction === "down") shouldFilter = "up";
    let possible = ["left", "right", "up", "down"].filter((v) => v !== shouldFilter);

    const collision: Dir[] = [];
    cells.forEach((cell) => {
      newGhost.setDirection("left");
      if (cell.isBoundary && isColliding(cell, newGhost)) {
        collision.push(newGhost.direction);
      }
      newGhost.setDirection("right");
      if (cell.isBoundary && isColliding(cell, newGhost)) {
        collision.push(newGhost.direction);
      }
      newGhost.setDirection("up");
      if (cell.isBoundary && isColliding(cell, newGhost)) {
        collision.push(newGhost.direction);
      }
      newGhost.setDirection("down");
      if (cell.isBoundary && isColliding(cell, newGhost)) {
        collision.push(newGhost.direction);
      }
    });
    possible = possible.filter((p) => {
      for (const c of collision) {
        if (c === p) return false;
      }
      return true;
    });

    ghost.setDirection(possible[Math.floor(Math.random() * possible.length)] as Dir);
  });
}

function mapToCell(map: CellKey[][]) {
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

function drawMap(cells: Cell[], player: Player, ghosts: Ghost[]) {
  cells.forEach((cell) => {
    cell.draw();
  });
  ghosts.forEach((ghost) => {
    ghost.draw();
  });
  player.draw();
}

function countCoins(cells: Cell[]) {
  let count = 0;
  cells.forEach((cell) => {
    if (cell.cellType === "1") count += 1;
  });

  return count;
}

function checkCells(cells: Cell[], player: Player, ghosts: Ghost[]) {
  cells.forEach((c) => {
    ghosts.forEach((ghost) => {
      if (c.isBoundary && isColliding(c, ghost)) {
        // ghost.setVelocity({ x: 0, y: 0 });
        ghost.setDirection("stop");
      }
    });

    if (c.isBoundary && isColliding(c, player)) {
      // player.setVelocity({ x: 0, y: 0 });
      player.setDirection("stop");
    } else if (c.isCoin && isTouching(c, player)) {
      player.eat();
      c.removeCoin();
    }
  });
}

function checkEnd(totalCoin: number, player: Player) {
  if (player.point >= totalCoin) {
    alert("win");
    return true;
  }
  return false;
}

function generateGhostNextMove() {
  const val = ["left" as const, "right" as const, "up" as const, "down" as const];
  const ran = Math.floor(Math.random() * 4);
  return val[ran];
}

export { checkCells, generateGhostNextMove, countCoins, isTouching, checkPlayerNextMove, checkGhostNextMove, isColliding, mapToCell, drawMap, checkEnd };
