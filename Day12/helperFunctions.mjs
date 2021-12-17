export const constructAdjacencyMatrixFromLines = lines => {
  const nodes = new Set();
  const edgeList = {};
  lines.forEach(line => {
    const [firstNode, secondNode] = line.split('-');
    nodes.add(firstNode); 
    nodes.add(secondNode);
    if (edgeList[firstNode]) {
      edgeList[firstNode].push(secondNode);
    } else {
      edgeList[firstNode] = [secondNode];
    }
    if (edgeList[secondNode]) {
      edgeList[secondNode].push(firstNode);
    } else {
      edgeList[secondNode] = [firstNode];
    }
  });
  return { nodes: [...nodes], edgeList };
};

export const findPath = (currentNode, pathSoFar, edgeList) => {
  const pathsFromHere = [...edgeList[currentNode]].filter(n => {
    if(pathSoFar.includes(n)) {
      return n.toUpperCase() === n;
    }
    return true;
  });
  console.log(pathsFromHere); 
};
