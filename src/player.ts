import C from "./canvas";
import { PLAYER, scoreEl } from "./constant";
import Keys from "./key";

type PlayerProps = {
  position: { x: number; y: number };
  velocity?: { x: number; y: number };
  radius?: number;
  point?: number;
  direction?: Dir;
  image?: HTMLImageElement;
  width?: number;
  height?: number;
};
function RadToDag(angle: number) {
  return (angle * Math.PI) / 180;
}

class Player {
  position: PlayerProps["position"];
  velocity: PlayerProps["velocity"];
  point: PlayerProps["point"];
  direction: PlayerProps["direction"];
  image: PlayerProps["image"];
  width: PlayerProps["width"];
  height: PlayerProps["height"];
  cycle: number;

  constructor(props: PlayerProps) {
    const { image, position, velocity, width, height } = props;
    this.position = position;
    this.velocity = velocity || { x: 0, y: 0 };
    this.point = 0;
    this.direction = "stop";
    this.image = image;
    this.width = width || PLAYER.WIDTH;
    this.height = height || PLAYER.HEIGHT;
    this.cycle = 0;
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
    C.save();
    C.translate(this.position.x + 20, this.position.y + 20);
    const keys = new Keys();
    if (keys.getIsPressed("right")) {
      C.rotate(RadToDag(0));
    } else if (keys.getIsPressed("down")) {
      C.rotate(RadToDag(90));
    } else if (keys.getIsPressed("left")) {
      C.scale(-1, 1);
    } else if (keys.getIsPressed("up")) {
      C.rotate(RadToDag(270));
    }
    C.translate(-(this.position.x + 20), -(this.position.y + 20));
    C.drawImage(
      this.image,
      PLAYER.IMAGE_SIZE * this.cycle,
      0,
      PLAYER.IMAGE_SIZE,
      PLAYER.IMAGE_SIZE,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    C.restore();
    if (this.cycle > 6) this.cycle = 0;
    else this.cycle += 1;
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  eat() {
    this.point += 1;
    scoreEl.textContent = (this.point * 100).toString();
  }
}

export default Player;
