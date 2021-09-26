#!/usr/bin/env node
const fs = require("fs");

(function () {
  if (process.argv.length <= 2) {
    console.log("no input");
    return;
  }

  const f = fs.readFileSync(process.argv[2], { encoding: "utf-8" });
  const trimmed = f.trim();
  const lines = trimmed.split(/\n/);
  const components = [];
  for (const line of lines) {
    const tLine = line.trim();
    if (tLine.length <= 0) continue;

    const cols = tLine.split(/\s+/m);
    if (cols[1]) {
      components.push(cols[1]);
    }
  }
  console.log(components.join(","));
})();
