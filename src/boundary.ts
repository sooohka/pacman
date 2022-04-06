import C from "./canvas";
import { BOUNDARY } from "./constant";

type BoundaryProps = {
  position: { x: number; y: number };
  width?: number;
  height?: number;
};

class Boundary {
  position: BoundaryProps["position"];
  width: BoundaryProps["width"];
  height: BoundaryProps["height"];

  constructor(props: BoundaryProps) {
    const { position, width, height } = props;
    this.position = position;
    this.width = width || BOUNDARY.WIDTH;
    this.height = height || BOUNDARY.HEIGHT;
  }

  draw() {
    C.fillStyle = "blue";
    C.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

function getBoundaries(map: number[][]) {
  const boundaries: Boundary[] = [];
  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== 1) return;
      const position = {
        y: BOUNDARY.HEIGHT * i,
        x: BOUNDARY.WIDTH * j,
      };
      boundaries.push(new Boundary({ position }));
    });
  });
  return boundaries;
}

export { getBoundaries };
export default Boundary;
