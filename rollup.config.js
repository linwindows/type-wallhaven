import resolve from "@rollup/plugin-node-resolve"; // 依赖引用插件
import commonjs from "@rollup/plugin-commonjs"; // commonjs模块转换插件
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";

export default {
  input: "./index.js", // 打包
  output: {
    name: "type-wallhaven", // 输入的包名
    file: "./dist/type-wallhaven.js", // 打包输出地址, 这里的导出地址就是package内main的地址
    format: "umd", // 包类型
  },
  plugins: [
    // 使用的插件
    del({
        targets:["lib/**/*"]
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig:"./tsconfig.json"
    })
  ],
  ignore: [
    "node_modules/**", // 忽略目录
  ],
};
