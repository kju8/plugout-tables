import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const charts = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/chart" }),
  schema: z.object({
    player: z.enum(["single", "double"]),
    package: z.discriminatedUnion("series", [
      z.object({
        series: z.literal("plugout1"),
        phase: z.null().default(null),
      }),
      z.object({
        series: z.literal("plugout3"),
        phase: z.null().default(null),
      }),
      z.object({
        series: z.literal("plugout4"),
        phase: z.enum([
          "PHASE-01",
          "PHASE-02",
          "PHASE-03",
          "PHASE-04",
          "PHASE-05",
          "FINAL-PHASE 第一弾",
          "FINAL-PHASE 第二弾",
          "FINAL-PHASE 第三弾",
        ]),
      }),
      z.object({
        series: z.literal("plugout5"),
        phase: z.enum([
          "PHASE:FIRST",
          "PHASE:COMPLETE",
          "PHASE:SYNDROME",
          "PHASE:CORE",
          "PHASE:SEVENTH",
        ]),
      }),
    ]),

    songId: z.string(),
    level: z.number(),
    genre: z.string(),
    title: z.string(),
    artist: z.string(),

    md5: z.string(),
    sha256: z.string(),

    comment: z.string().optional(),

    bpm: z.union([z.number(), z.tuple([z.number(), z.number()])]),
    judge: z.enum(["easy", "normal", "hard", "veryhard"]).optional(),
    notes: z.number(),
    total: z.number().optional(),
    length: z.number(),
  }),
});

export const collections = { charts };
