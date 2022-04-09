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
import redGhost from "./assets/redGhost.png";
import yellowGhost from "./assets/yellowGhost.png";
import blueGhost from "./assets/blueGhost.png";
import orangeGhost from "./assets/orangeGhost.png";
import greenGhost from "./assets/greenGhost.png";
import pacman from "./assets/PacMan.png";

type CellKey = keyof typeof CELL_IMAGE_SRC;

type GhostKey = keyof typeof GHOST_IMAGE_SRC;
const scoreEl = document.querySelector("#score");

const MAP = {
  WIDTH: 11,
  HEIGHT: 13,
};

const CELL = {
  WIDTH: 40,
  HEIGHT: 40,
  IMAGE_SIZE: 16,
};

const CANVAS = {
  WIDTH: MAP.WIDTH * CELL.WIDTH,
  HEIGHT: MAP.HEIGHT * CELL.HEIGHT,
};
const GHOST = {
  WIDTH: 40,
  HEIGHT: 40,
  IMAGE_SIZE: 16,
  SPEED: 3,
};

const GHOST_IMAGE_SRC = {
  red: redGhost,
  orange: orangeGhost,
  yellow: yellowGhost,
  green: greenGhost,
  blue: blueGhost,
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

function createPlayerImage() {
  const image = new Image();
  image.src = pacman;
  return image;
}

function createGhostImage(src: GhostKey) {
  const image = new Image();
  image.src = GHOST_IMAGE_SRC[src];
  return image;
}

function createCellImage(src: CellKey) {
  const image = new Image();
  image.src = CELL_IMAGE_SRC[src];
  return image;
}

const GHOST_IMAGES: typeof GHOST_IMAGE_SRC = {
  red: createGhostImage("red"),
  orange: createGhostImage("orange"),
  yellow: createGhostImage("yellow"),
  green: createGhostImage("green"),
  blue: createGhostImage("blue"),
};

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
const PLAYER = {
  WIDTH: 40,
  HEIGHT: 40,
  SPEED: 5,
  IMAGE_SIZE: 16,
  IMAGE: createPlayerImage(),
};

export {
  scoreEl,
  MAP,
  CELL,
  GHOST,
  PLAYER,
  CANVAS,
  CellKey,
  GhostKey,
  GHOST_IMAGE_SRC,
  CELL_IMAGE_SRC,
  GHOST_IMAGES,
  CELL_IMAGES,
};
export default null;
