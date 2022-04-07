import C from "./canvas";
import { BOUNDARY, MAPIMAGES, MapImages } from "./constant";

type BoundaryProps = {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width?: number;
  height?: number;
};

class Boundary {
  position: BoundaryProps["position"];
  width: BoundaryProps["width"];
  height: BoundaryProps["height"];
  image: BoundaryProps["image"];

  constructor(props: BoundaryProps) {
    const { position, width, height, image } = props;
    this.position = position;
    this.width = width || BOUNDARY.WIDTH;
    this.height = height || BOUNDARY.HEIGHT;
    this.image = image;
  }

  draw() {
    C.drawImage(this.image, this.position.x, this.position.y);
    // C.fillStyle = "blue";
    // C.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

function getBoundaries(map: MapImages[][]) {
  const boundaries: Boundary[] = [];
  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === "1") {
        return;
      }
      const position = {
        y: BOUNDARY.HEIGHT * i,
        x: BOUNDARY.WIDTH * j,
      };
      const image = new Image();
      image.src = MAPIMAGES[cell];
      boundaries.push(new Boundary({ position, image }));
    });
  });
  return boundaries;
}

export { getBoundaries };
export default Boundary;
