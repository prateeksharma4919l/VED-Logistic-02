const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const rootDir = fs.realpathSync.native(path.resolve(__dirname, ".."));
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const nextArgs = process.argv.slice(2);
const command = nextArgs[0];
const appDirArg = nextArgs[1];
const appDir = appDirArg ? path.resolve(rootDir, appDirArg) : rootDir;
const forwardedArgs = appDirArg ? [command, ...nextArgs.slice(2)] : nextArgs;
const distDirName = command === "dev" ? ".next" : ".next-prod";
const distDirPath = path.join(appDir, distDirName);

if (command === "dev" || command === "build") {
  fs.rmSync(distDirPath, { recursive: true, force: true });
}

process.chdir(appDir);

const env = {
  ...process.env,
};

if (command !== "dev") {
  env.NEXT_DIST_DIR = distDirName;
} else {
  delete env.NEXT_DIST_DIR;
}

const child = spawn(process.execPath, ["--max-old-space-size=4096", nextBin, ...forwardedArgs], {
  cwd: appDir,
  stdio: "inherit",
  env,
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
