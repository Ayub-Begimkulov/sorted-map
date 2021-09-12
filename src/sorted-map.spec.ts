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

  it("delete", () => {
    map.set(6, "asdfgh");
    map.set(1, "a");
    map.set(4, "asdf");
    map.set(2, "as");

    expect(map.getMin()).toBe(1);
    expect(map.getMax()).toBe(6);

    map.delete(1);
    map.delete(6);

    expect(map.getMin()).toBe(2);
    expect(map.getMax()).toBe(4);
  });
});
