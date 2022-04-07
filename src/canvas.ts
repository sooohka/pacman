import { CANVAS } from "./constant";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const C = canvas.getContext("2d");

function initCanvas() {
  canvas.width = CANVAS.WIDTH;
  canvas.height = CANVAS.HEIGHT;
}

initCanvas();

export default C;
