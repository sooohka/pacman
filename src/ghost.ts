import C from "./canvas";
import { GHOST } from "./constant";

type GhostProps = {
  position: { x: number; y: number };
  velocity?: { x: number; y: number };
  nextMove?: "left" | "right" | "up" | "down";
  image: HTMLImageElement;
  width?: number;
  height?: number;
};

class Ghost {
  position: GhostProps["position"];
  velocity?: GhostProps["velocity"];
  image: GhostProps["image"];
  width: GhostProps["width"];
  height: GhostProps["height"];
  nextMove?: GhostProps["nextMove"];

  constructor(props: GhostProps) {
    const { position, image } = props;
    this.position = position;
    this.velocity = { x: GHOST.SPEED, y: 0 };
    this.width = GHOST.WIDTH;
    this.height = GHOST.HEIGHT;
    this.image = image;
    this.nextMove = null;
  }

  setVelocity(velocity: Partial<GhostProps["velocity"]>) {
    if (velocity.x !== undefined) this.velocity.x = velocity.x;
    if (velocity.y !== undefined) this.velocity.y = velocity.y;
  }

  draw() {
    C.drawImage(
      this.image,
      0,
      0,
      GHOST.IMAGE_SIZE,
      GHOST.IMAGE_SIZE,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  setNextMove(move: GhostProps["nextMove"]) {
    this.nextMove = move;
  }
  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Ghost;
