
export function clamp(number, max=1) {
  return number < 1
    ? 1
    : number > max
    ? max
    : number;
}
