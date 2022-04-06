import { getBoundaries } from "./boundary";
import Player from "./player";

const map1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const map = {
  1: map1,
};

function drawMap(_map: number[][], player: Player) {
  getBoundaries(_map).forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
}

export { drawMap };
export default map;
