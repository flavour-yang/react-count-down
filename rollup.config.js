import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
	input: 'src/index.tsx', // 入口文件
	output:[{ // 通用的合并模式
		name: 'CountDown', // umd 模式必须要有 name  此属性作为全局变量访问打包结果
		file: `dist/umd/index.js`,
		format: 'umd',
		sourcemap: true
	},{ 
		name: 'CountDown',
		file: `dist/esm/index.js`,
		format: 'esm',
		sourcemap: true
	},{
		file: `dist/cjs/index.js`,
		format: 'cjs',
		sourcemap: true,
		exports: 'named'
	}],
	external:["react"],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					declaration: false // 输出时去除类型文件
				}
			}
		})
	]
}
