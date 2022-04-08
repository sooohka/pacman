import C from "./canvas";
import { PLAYER, scoreEl } from "./constant";

type PlayerProps = {
  position: { x: number; y: number };
  velocity?: { x: number; y: number };
  radius?: number;
  point?: number;
  direction?: Dir;
};

class Player {
  position: PlayerProps["position"];
  velocity: PlayerProps["velocity"];
  radius: PlayerProps["radius"];
  point: PlayerProps["point"];
  direction: PlayerProps["direction"];

  constructor(props: PlayerProps) {
    const { position, radius, velocity } = props;
    this.position = position;
    this.radius = radius || PLAYER.RADIUS;
    this.velocity = velocity || { x: 0, y: 0 };
    this.point = 0;
    this.direction = "stop";
  }

  setDirection(key: PlayerProps["direction"]) {
    this.direction = key;
    if (this.direction === "left") {
      this.setVelocity({ x: -PLAYER.SPEED, y: 0 });
    } else if (this.direction === "right") {
      this.setVelocity({ x: PLAYER.SPEED, y: 0 });
    } else if (this.direction === "up") {
      this.setVelocity({ x: 0, y: -PLAYER.SPEED });
    } else if (this.direction === "down") {
      this.setVelocity({ x: 0, y: PLAYER.SPEED });
    } else if (this.direction === "stop") {
      this.setVelocity({ x: 0, y: 0 });
    }
  }

  private setVelocity(velocity: Partial<PlayerProps["velocity"]>) {
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
  eat() {
    this.point += 1;
    scoreEl.textContent = (this.point * 100).toString();
    console.log(this.point);
  }
}

export default Player;
