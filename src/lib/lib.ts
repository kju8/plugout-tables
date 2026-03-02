import type { CollectionEntry } from "astro:content";

const Plugout4Phase = {
  "PHASE-01": 1,
  "PHASE-02": 2,
  "PHASE-03": 3,
  "PHASE-04": 4,
  "PHASE-05": 5,
  "FINAL-PHASE 第一弾": 6,
  "FINAL-PHASE 第二弾": 7,
  "FINAL-PHASE 第三弾": 8,
} as const;
const Plugout5Phase = {
  "PHASE:FIRST": 1,
  "PHASE:COMPLETE": 2,
  "PHASE:SYNDROME": 3,
  "PHASE:CORE": 4,
  "PHASE:SEVENTH": 5,
} as const;
const coll = new Intl.Collator();

type ChartMap = {
  package: CollectionEntry<"charts">["data"]["package"];
  single: CollectionEntry<"charts">[];
  double: CollectionEntry<"charts">[];
  marged: CollectionEntry<"charts">[];
};

export const ChartSort = (charts: CollectionEntry<"charts">[]) => {
  const map = charts.reduce((acc, cur) => {
    const arr = acc.get(cur.data.songId) ?? {
      package: cur.data.package,
      single: [],
      double: [],
      marged: [],
    };
    if (cur.data.player === "single") arr.single.push(cur);
    else arr.double.push(cur);
    acc.set(cur.data.songId, arr);
    return acc;
  }, new Map<string, ChartMap>());

  map.forEach((v) => {
    v.single = v.single.sort((a, b) => a.data.level - b.data.level);
    v.double = v.double.sort((a, b) => a.data.level - b.data.level);

    const marged = [];
    for (
      let index = 0;
      index < Math.max(v.single.length, v.double.length);
      index++
    ) {
      if (v.single[index]) marged.push(v.single[index]);
      if (v.double[index]) marged.push(v.double[index]);
    }
    v.marged = marged;
  });

  return [...map.entries()]
    .sort((a, b) => coll.compare(a[0], b[0]))
    .sort((a, b) =>
      a[1].package.series === "plugout4" && b[1].package.series === "plugout4"
        ? Plugout4Phase[a[1].package.phase] - Plugout4Phase[b[1].package.phase]
        : a[1].package.series === "plugout5" &&
            b[1].package.series === "plugout5"
          ? Plugout5Phase[a[1].package.phase] -
            Plugout5Phase[b[1].package.phase]
          : coll.compare(a[1].package.series, b[1].package.series),
    )
    .reduce<CollectionEntry<"charts">[]>(
      (acc, cur) => acc.concat(cur[1].marged),
      [],
    );
};
