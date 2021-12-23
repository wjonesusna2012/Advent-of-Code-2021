// sum: combinations
const combinations = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};
const recursedMemoized = (turnPlayerScore, otherPlayerScore, turnPlayerPos, otherPlayerPos) => {
  if (turnPlayerScore >= 21) return [1, 0];
  if (otherPlayerScore >= 21) return [0, 1];
  let winsWithTurnPlayer = 0;
  let winsWithOtherPlayer = 0;

  for(const x in combinations) {
    
    const updatedPlayerPosition = (turnPlayerPos + parseInt(x)) % 10;
    const updatedPlayerScore = turnPlayerScore + updatedPlayerPosition + 1;

    const [otherPlayWinsNotScaled, turnPlayerWinsNotScaled] = recursedMemoized(otherPlayerScore, updatedPlayerScore, otherPlayerPos, updatedPlayerPosition);
    winsWithOtherPlayer += otherPlayWinsNotScaled * combinations[x]; 
    winsWithTurnPlayer += turnPlayerWinsNotScaled * combinations[x];
  }
  return [winsWithTurnPlayer, winsWithOtherPlayer];
}

console.log(recursedMemoized(0, 0, 9, 1));