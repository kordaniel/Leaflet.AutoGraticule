import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		cssInjectedByJsPlugin(),
		dtsPlugin()
	],
	build: {
		sourcemap: true,
		minify: false,
		lib: {
			entry: './src/L.AutoGraticule.ts',
			name: 'L.AutoGraticule',
			fileName: (format) => `L.AutoGraticule.${format === 'umd' ? 'js' : 'mjs'}`
		},
		rollupOptions: {
			output: {
				globals: {
					'leaflet': 'L'
				}
			},
			external: ['leaflet']
		}
	},
	resolve: {
		alias: {
			'leaflet-auto-graticule': './src/L.AutoGraticule.ts'
		}
	}
});
