import type { APIRoute } from "astro";

export const GET = (({ params, request }) => {
  return new Response(
    JSON.stringify({
      name: "plugout series difficulty table",
      data_url: new URL(request.url).origin + "/data.json",
      symbol: "☆",
      level_order: [...Array(14).keys()].map((i) => i),
    }),
  );
}) satisfies APIRoute;
