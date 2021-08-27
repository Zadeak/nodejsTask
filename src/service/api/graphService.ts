import { getAirportIdByCode } from "../../database/databasePersistence";
import { resolvePath } from "../../helperfunctions";
import { findPath } from "./graphAlgorithm";

export async function findShortestPath(depth: number, startingPoint: string, endpoint: string) {
  const start = await getAirportIdByCode(startingPoint);
  const stop = await getAirportIdByCode(endpoint);
  const path = await findPath(start, stop);
  return await resolvePath(path);
}
