import { Coordinate, Playground } from "@ngneers/data";
import { getDistance } from "./location.service";

export const PlaygroundSorter = {
    byName: (a: Playground, b: Playground) => a.name.localeCompare(b.name),
    byDistance: (location: Coordinate) => (a: Playground, b: Playground) => getDistance(a.position, location) - getDistance(b.position, location),
};