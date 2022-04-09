import C from "./canvas";
import { GHOST } from "./constant";

type GhostProps = {
  position: { x: number; y: number };
  image: HTMLImageElement;
  velocity?: { x: number; y: number };
  width?: number;
  height?: number;
  direction?: Dir;
};

class Ghost {
  position: GhostProps["position"];
  velocity: GhostProps["velocity"];
  image: GhostProps["image"];
  width: GhostProps["width"];
  height: GhostProps["height"];
  direction: GhostProps["direction"];
  cycle: number;

  constructor(props: GhostProps) {
    const { position, image } = props;
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.width = GHOST.WIDTH;
    this.height = GHOST.HEIGHT;
    this.image = image;
    this.direction = "stop";
    this.cycle = 0;
  }

  setDirection(key: GhostProps["direction"]) {
    this.direction = key;
    if (this.direction === "left") {
      this.setVelocity({ x: -GHOST.SPEED, y: 0 });
    } else if (this.direction === "right") {
      this.setVelocity({ x: GHOST.SPEED, y: 0 });
    } else if (this.direction === "up") {
      this.setVelocity({ x: 0, y: -GHOST.SPEED });
    } else if (this.direction === "down") {
      this.setVelocity({ x: 0, y: GHOST.SPEED });
    } else if (this.direction === "stop") {
      this.setVelocity({ x: 0, y: 0 });
    }
  }

  private setVelocity(velocity: Partial<GhostProps["velocity"]>) {
    if (velocity.x !== undefined) this.velocity.x = velocity.x;
    if (velocity.y !== undefined) this.velocity.y = velocity.y;
  }

  draw() {
    C.drawImage(
      this.image,
      GHOST.IMAGE_SIZE * this.cycle,
      0,
      GHOST.IMAGE_SIZE,
      GHOST.IMAGE_SIZE,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (this.cycle > 6) this.cycle = 0;
    else this.cycle += 1;
  }
  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Ghost;
