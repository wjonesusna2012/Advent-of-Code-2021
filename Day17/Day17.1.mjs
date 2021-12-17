const xMa = 182;
const xMi = 155;
const yMa = -117;
const yMi = -67;
// const xMa = 30;
// const xMi = 20;
// const yMa = -10;
// const yMi = -5;
let count = 0;
const lands = (x, y, xPos, yPos, xMin, xMax, yMin, yMax) => {
  if (xPos > xMax || yPos < yMax) return false;
  if (xPos >= xMin && xPos <= xMax && yPos <= yMin && yPos >= yMax) return true;
  return lands(x > 0 ? x - 1 : 0, y - 1, xPos + x, yPos + y, xMin, xMax, yMin, yMax);
};
for(let x = 0; x <= xMa; x++) {
  for(let y = yMa; y < Math.abs(yMa); y++) {
    if(lands(x, y, 0, 0, xMi, xMa, yMi, yMa)) count++;
  }
}

console.log(count);

