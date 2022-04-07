import { CELL, MAP } from "./constant";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const C = canvas.getContext("2d");

function initCanvas() {
  canvas.width = MAP.WIDTH * CELL.WIDTH;
  canvas.height = MAP.HEIGHT * CELL.HEIGHT;
}

initCanvas();

export default C;
