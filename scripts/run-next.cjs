const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const rootDir = fs.realpathSync.native(path.resolve(__dirname, ".."));
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const nextArgs = process.argv.slice(2);
const command = nextArgs[0];
const appDirArg = nextArgs[1];
const appDir = appDirArg ? path.resolve(rootDir, appDirArg) : rootDir;
const distDirName = command === "dev" ? ".next-dev" : ".next";
const distDirPath = path.join(appDir, distDirName);

if (command === "dev") {
  fs.rmSync(distDirPath, { recursive: true, force: true });
}

process.chdir(rootDir);

const child = spawn(process.execPath, ["--max-old-space-size=4096", nextBin, ...nextArgs], {
  cwd: rootDir,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDirName,
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
