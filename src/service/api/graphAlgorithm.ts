import Graph from "graphology";
import * as database from "../../database/databasePersistence";
import { calculateDistance, getCoorinates } from "../../helperfunctions";
import { dijkstra } from "graphology-shortest-path";
import { logger } from "../../logger";

export async function findPath(startingPoint: string, endpoint: string) {
  const graph = new Graph();
  const visited = new Set<string>();
  const createdGraph = await constructGrap([startingPoint], graph, visited);

  try {
    const path = dijkstra.bidirectional(createdGraph, startingPoint, endpoint, "weight");
    return { message: path, codes: [startingPoint, endpoint] };
  } catch (error) {
    return { message: ["no path"], codes: [startingPoint, endpoint] };
  }
}
export async function constructGrap(toVisitList: Array<string>, graph: Graph, visited: Set<String>, depth: number = 0): Promise<Graph> {
  if (depth === 5) return graph;
  let current = toVisitList;
  toVisitList = [];

  for (let tovisit of current) {
    const route = await database.getRoute(tovisit);
    try {
      var neig = route.DestinationAirportId;
    } catch (error) {
      visited.add(tovisit);
      continue;
    }
    for (let neighbor of neig) {
      graph.mergeEdge(tovisit, neighbor.key, { weight: neighbor.value });
      if (!visited.has(neighbor.key)) {
        toVisitList.push(neighbor.key);
      }
    }
    visited.add(tovisit);
  }
  depth++;
  return constructGrap(toVisitList, graph, visited, depth);
}
