# Sorted Map

A map that sorts its entries by key. The default sorting behavior could be overwritten by providing a custom `compare` function.

All of the operations (`get`,`set`,`has`,`delete`, etc.) have a `O(log n)` time complexity.

## Usage

```ts
import { SortedMap } from "sorted-map";

const sortedMap = new SortedMap((a, b) => a.length - b.length);

sortedMap.set("asdfgh", 5);
sortedMap.set("h", 6);
sortedMap.set("asdf", 6);
sortedMap.set("df", 6);

sortedMap.getMin(); // "h"
sortedMap.getMax(); // "asdfgh"

sortedMap.delete("h");
sortedMap.delete("asdfgh");

sortedMap.getMin(); // "df"
sortedMap.getMax(); // "asdf"
```
