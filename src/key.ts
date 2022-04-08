type ArrowKey = Exclude<Dir, "stop">;
class Keys {
  isPressed: { [key in ArrowKey]: boolean };
  static instance: Keys = null;

  constructor() {
    if (Keys.instance !== null) {
      // eslint-disable-next-line no-constructor-return
      return Keys.instance;
    }

    this.isPressed = { left: false, right: false, up: false, down: false };
    Keys.instance = this;
  }
  getIsPressed(key: ArrowKey) {
    return this.isPressed[key];
  }

  pressKey(key: ArrowKey) {
    this.isPressed = { left: false, right: false, up: false, down: false };
    this.isPressed[key] = true;
  }
}
export default Keys;
