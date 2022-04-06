const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};

type Dir = "left" | "right" | "up" | "down";
function pressKey(dir: Dir) {
  Object.keys(keys).forEach((key) => {
    if (key === dir) keys[key].pressed = true;
    else keys[key as Dir].pressed = false;
  });
}

export { pressKey };

export default keys;
