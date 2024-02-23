import esbuild from "esbuild";
import { builtinModules } from "module";
import path from "path";
import pkg from "./package.json";
interface Options {
  mode?: "development" | "production";
}

// 开始打包工作

function build(options: Options) {
  // 环境变量
  const mode = options.mode || "production";
  const __DEV__ = mode !== "production";

  // 输入目录
  const outdir = __DEV__
    ? path.join(__dirname, "build/dev")
    : path.join(__dirname, "build/rel");

  // 构建preload 脚本参数配置
  const preload = esbuild.build({
    entryPoints: ["./src/preload/index.ts"],
    outfile: path.join(outdir, "preload/index.js"),
    target: "esnext",
    bundle: true,
    platform: "node",
    sourcemap: true,
    format: "cjs",
    external: ["electron", ...Object.keys(pkg.dependencies)],
  });

  // 构建主进程代码
  const main = esbuild.build({
    entryPoints: ["./src/main/index.ts"],
    outfile: path.join(outdir, "main/index.min.js"),
    bundle: true,
    platform: "node",
    sourcemap: true,
    format: "cjs",
    define: {},
    external: [
      "electron",
      ...Object.keys(pkg.dependencies),
      ...Object.keys(builtinModules),
    ],
  });

  return Promise.all([main, preload]);
}

const isMain = require.main === module;

if (isMain) {
  const mode: any =
    process.env.NODE_ENV === "production" ? "production " : "development";
  build({ mode });
}
