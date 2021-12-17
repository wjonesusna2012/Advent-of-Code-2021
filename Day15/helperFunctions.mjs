export const readPathFromLines = lines => {
  const matrix = [];
  lines.forEach(line => {
    matrix.push(line.split('').map(e => {
      return {
        value: parseInt(e, 10),
        distance: Infinity,
        color: 0,
        pi: null,
      };
    }));
  });
  return matrix;
};