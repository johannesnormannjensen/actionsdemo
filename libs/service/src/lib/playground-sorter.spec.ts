import { Coordinate, Playground } from "@ngneers/data";
import { PlaygroundSorter } from "./playground-sorter";

describe("PlaygroundSorter", () => {
    const playground1: Playground = { id: "1", name: "Playground A", position: { lat: 55.6767238736979, lng: 12.589685450548627 } };
    const playground2: Playground = { id: "2", name: "Playground B", position: { lat: 55.669599877562, lng: 12.588571683898572 } };
    const playground3: Playground = { id: "3", name: "Playground C", position: { lat: 55.690462674122244, lng: 12.579092466356643 } };
    const location: Coordinate = { lat: 0, lng: 0 };

    describe("byName", () => {
        it("should sort playgrounds by name", () => {
            const sortedPlaygrounds = [playground3, playground1, playground2].sort(PlaygroundSorter.byName);
            expect(sortedPlaygrounds).toEqual([playground1, playground2, playground3]);
        });
    });

    describe("byDistance", () => {
        it("should sort playgrounds by distance from a given location", () => {
            const sortedPlaygrounds = [playground3, playground1, playground2].sort(PlaygroundSorter.byDistance(location));
            expect(sortedPlaygrounds).toEqual([playground1, playground2, playground3]);
        });
    });
});
