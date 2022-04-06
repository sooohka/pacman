const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const C = canvas.getContext("2d");

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

initCanvas();

export default C;
