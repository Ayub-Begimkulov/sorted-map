import { SortedMap } from ".";

describe("SortedMap", () => {
  let map: SortedMap<number, string>;

  beforeEach(() => {
    map = new SortedMap();
  });

  it("getMax", () => {
    map.set(6, "six");
    map.set(1, "one");
    map.set(4, "four");
    map.set(9, "nine");

    expect(map.getMax()).toBe(9);
  });

  it("getMin", () => {
    map.set(6, "six");
    map.set(4, "four");
    map.set(9, "nine");
    map.set(1, "one");

    expect(map.getMin()).toBe(1);
  });
});
