import C from "./canvas";
import { CELL, CellKey, CELL_IMAGES } from "./constant";

type CellProps = {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width?: number;
  height?: number;
  isBoundary?: boolean;
  isCoin?: boolean;
  cellType: CellKey;
};

class Cell {
  position: CellProps["position"];
  width: CellProps["width"];
  height: CellProps["height"];
  image: CellProps["image"];
  isBoundary: CellProps["isBoundary"];
  isCoin: CellProps["isCoin"];
  cellType: CellProps["cellType"];

  constructor(props: CellProps) {
    const { position, width, height, image, cellType } = props;
    this.cellType = cellType;
    this.position = position;
    this.width = width || CELL.WIDTH;
    this.height = height || CELL.HEIGHT;
    this.image = image;
    if (image === CELL_IMAGES["1"]) {
      this.isCoin = true;
    } else {
      this.isCoin = false;
    }
    if (image === CELL_IMAGES["1"] || image === CELL_IMAGES["0"]) {
      this.isBoundary = false;
    } else {
      this.isBoundary = true;
    }
  }

  draw() {
    if (this.image === null) return;
    if (this.image === CELL_IMAGES["1"]) {
      C.drawImage(
        this.image,
        0,
        0,
        16,
        16,
        this.position.x,
        this.position.y,
        40,
        40
      );
      return;
    }
    C.drawImage(this.image, this.position.x, this.position.y);
  }
  removeCoin() {
    if (!this.isCoin) {
      throw new Error("it's not a coin");
    }

    this.isCoin = false;
    this.image = CELL_IMAGES["0"];
    this.cellType = "0";
  }
}

export default Cell;
