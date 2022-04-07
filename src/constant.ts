import pipeCorner1 from "./assets/pipeCorner1.png";
import pipeCorner2 from "./assets/pipeCorner2.png";
import pipeCorner3 from "./assets/pipeCorner3.png";
import pipeCorner4 from "./assets/pipeCorner4.png";
import pipeHorizontal from "./assets/pipeHorizontal.png";
import pipeVertical from "./assets/pipeVertical.png";
import block from "./assets/block.png";
import capLeft from "./assets/capLeft.png";
import capRight from "./assets/capRight.png";
import capTop from "./assets/capTop.png";
import capBottom from "./assets/capBottom.png";
import pipeConnectorBottom from "./assets/pipeConnectorBottom.png";
import pipeConnectorLeft from "./assets/pipeConnectorLeft.png";
import pipeConnectorRight from "./assets/pipeConnectorRight.png";
import pipeConnectorTop from "./assets/pipeConnectorTop.png";
import pipecross from "./assets/pipecross.png";
import coin from "./assets/Coin.png";

const MAP = {
  WIDTH: 11,
  HEIGHT: 13,
};

const CANVAS = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};

const CELL = {
  WIDTH: 40,
  HEIGHT: 40,
};

const PLAYER = {
  RADIUS: 15,
  SPEED: 5,
};

const CELL_IMAGE_SRC = {
  "⌜": pipeCorner1,
  "⌝": pipeCorner2,
  "⌟": pipeCorner3,
  "⌞": pipeCorner4,
  "-": pipeHorizontal,
  "|": pipeVertical,
  ㅁ: block,
  "<": capLeft,
  ">": capRight,
  "^": capTop,
  v: capBottom,
  b: pipeConnectorBottom,
  t: pipeConnectorTop,
  l: pipeConnectorLeft,
  r: pipeConnectorRight,
  c: pipecross,
  "1": coin,
  "0": null as null,
};

function createCellImage(src: CellKey) {
  const image = new Image();
  image.src = CELL_IMAGE_SRC[src];
  return image;
}

const CELL_IMAGES: typeof CELL_IMAGE_SRC = {
  "⌜": createCellImage("⌜"),
  "⌝": createCellImage("⌝"),
  "⌟": createCellImage("⌟"),
  "⌞": createCellImage("⌞"),
  "-": createCellImage("-"),
  "|": createCellImage("|"),
  ㅁ: createCellImage("ㅁ"),
  "<": createCellImage("<"),
  ">": createCellImage(">"),
  "^": createCellImage("^"),
  v: createCellImage("v"),
  b: createCellImage("b"),
  t: createCellImage("t"),
  l: createCellImage("l"),
  r: createCellImage("r"),
  c: createCellImage("c"),
  "1": createCellImage("1"),
  "0": null,
};

type CellKey = keyof typeof CELL_IMAGE_SRC;

export { MAP, CELL, PLAYER, CANVAS, CellKey, CELL_IMAGE_SRC, CELL_IMAGES };
export default null;
