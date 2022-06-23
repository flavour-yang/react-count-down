import typescript from 'rollup-plugin-typescript2'

export default {
	input: 'src/index.tsx', // 入口文件
	output: {
		name: 'CountDown', // umd 模式必须要有 name  此属性作为全局变量访问打包结果
		file: `dist/index.js`,
		format: 'umd',
		sourcemap: true
	},
	plugins: [
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					declaration: false // 输出时去除类型文件
				}
			}
		})
	]
}
