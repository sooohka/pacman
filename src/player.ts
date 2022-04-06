import C from "./canvas";
import { PLAYER } from "./constant";

type PlayerProps = {
  position: { x: number; y: number };
  velocity?: { x: number; y: number };
  radius?: number;
};

class Player {
  position: PlayerProps["position"];
  velocity: PlayerProps["velocity"];
  radius: PlayerProps["radius"];

  constructor(props: PlayerProps) {
    const { position, radius, velocity } = props;
    this.position = position;
    this.radius = radius || PLAYER.RADIUS;
    this.velocity = velocity || { x: 0, y: 0 };
  }

  setVelocity(velocity: Partial<PlayerProps["velocity"]>) {
    if (velocity.x !== undefined) this.velocity.x = velocity.x;
    if (velocity.y !== undefined) this.velocity.y = velocity.y;
  }

  draw() {
    C.beginPath();
    C.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    C.fillStyle = "yellow";
    C.fill();
    C.closePath();
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Player;
