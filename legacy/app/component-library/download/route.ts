import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const cssPath = join(process.cwd(), "app/llamojha.css");
  const css = await readFile(cssPath, "utf8");

  return new NextResponse(css, {
    headers: {
      "content-type": "text/css; charset=utf-8",
      "content-disposition": "attachment; filename=llamojha.css"
    }
  });
}
