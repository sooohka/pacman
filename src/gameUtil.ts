import Boundary from "./boundary";
import Player from "./player";

function isColliding(boundary: Boundary, player: Player) {
  const [bL, bR] = [boundary.position.x, boundary.position.x + boundary.width];
  const [bU, bD] = [boundary.position.y, boundary.position.y + boundary.height];
  const [pL, pR] = [
    player.position.x - player.radius + player.velocity.x,
    player.position.x + player.radius + player.velocity.x,
  ];
  const [pU, pD] = [
    player.position.y - player.radius + player.velocity.y,
    player.position.y + player.radius + player.velocity.y,
  ];
  if (pL <= bR && pU <= bD && pR >= bL && pD >= bU) return true;
  return false;
}

function checkNextMove(
  player: Player,
  boundaries: Boundary[],
  nextMove: Player["velocity"]
) {
  for (const boundary of boundaries) {
    const moPlayer = {
      ...player,
      velocity: nextMove,
    } as Player;
    if (isColliding(boundary, moPlayer)) {
      player.setVelocity({
        x: nextMove.x === 0 ? undefined : 0,
        y: nextMove.y === 0 ? undefined : 0,
      });
      break;
    } else {
      player.setVelocity({
        x: nextMove.x === 0 ? undefined : nextMove.x,
        y: nextMove.y === 0 ? undefined : nextMove.y,
      });
    }
  }
}

export { checkNextMove, isColliding };
