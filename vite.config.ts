import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import {
	defineConfig,
	normalizePath,
	mergeConfig,
	UserConfig,
	loadEnv
} from 'vite'
import viteEslint from 'vite-plugin-eslint' // eslint
import autoprefixer from 'autoprefixer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// element-plus auto import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import prodConfig from './config/prod.config'
import devConfig from './config/dev.config'

const transformNormalizePath = (fn, ...val) => {
	return normalizePath(fn(...val))
}

// https://vitejs.dev/config/
export default defineConfig((props) => {
	const { mode } = props
	const isProd = mode === 'production'
	const root = process.cwd()
	const env = loadEnv(mode, root)

	const baseConfig: UserConfig = {
		root,
		mode,
		base: '',
		envDir: transformNormalizePath(resolve, __dirname, './config'), // .env 文件的位置
		resolve: {
			alias: {
				'@': transformNormalizePath(join, __dirname, './src')
			},
			// 导入时想要省略的扩展名列表
			extensions: [
				'.mjs',
				'.cjs',
				'.js',
				'.ts',
				'.jsx',
				'.tsx',
				'.json',
				'.vue'
			]
		},
		publicDir: transformNormalizePath(join, __dirname, './public'),
		server: {
			port: 8000
		},
		css: {
			postcss: {
				plugins: [
					autoprefixer({
						overrideBrowserslist: ['>1%', 'not dead'],
						grid: true
					})
				]
			}
		},
		optimizeDeps: {
			// 强制进行预构建
			include: ['vue', 'vue-router']
		},
		build: {
			target: 'es6',
			reportCompressedSize: false, // 禁用 gzip 压缩大小报告
			polyfillModulePreload: true,
		},
		preview: {
			port: 8040
		},
		plugins: [
			vue(),
			viteEslint(),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'

				/**
				 * 自定义插入位置
				 * @default: body-last
				 */
				// inject?: 'body-last' | 'body-first'

				/**
				 * custom dom id
				 * @default: __svg__icons__dom__
				 */
				// customDomId: '__svg__icons__dom__',
			}),
			AutoImport({
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass'
					})
				]
			}),
			Components({
				resolvers: [ElementPlusResolver()],
				dts: true
			})
		]
	}
	return mergeConfig(
		baseConfig,
		isProd ? prodConfig(props) : devConfig(props),
		false
	)
})
