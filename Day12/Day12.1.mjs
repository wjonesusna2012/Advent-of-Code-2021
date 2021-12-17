import fs from 'fs';
import { findPath, constructAdjacencyMatrixFromLines } from './helperFunctions.mjs';
const data = fs.readFileSync('./Day12.1.test.txt', 'utf-8');
const linesRead = data.split('\n');

const { nodes, edgeList } = constructAdjacencyMatrixFromLines(linesRead);
findPath('start', ['A'], edgeList);

// console.log(nodes, edgeList);