import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type TableItem = {
  title: string;
  artist: string;
  level: number;
  md5: string;
  sha256: string;
  mode: "beat-5k" | "beat-10k";
};

const Charts = (await getCollection("charts")).reduce<TableItem[]>(
  (acc, cur) => {
    const newItem: TableItem = {
      title: cur.data.title,
      artist: cur.data.artist,
      level: cur.data.level,
      md5: cur.data.md5,
      sha256: cur.data.sha256,
      mode: cur.data.player === "single" ? "beat-5k" : "beat-10k",
    };

    acc.push(newItem);

    return acc;
  },
  [],
);

export const GET = (({ params, request }) => {
  return new Response(JSON.stringify(Charts));
}) satisfies APIRoute;
