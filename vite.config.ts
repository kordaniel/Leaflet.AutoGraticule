/// <reference types="vitest" />
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dtsPlugin from 'vite-plugin-dts';
import { isAbsolute } from 'node:path';

export default defineConfig({
	plugins: [
		cssInjectedByJsPlugin(),
		dtsPlugin({ rollupTypes: true })
	],
	build: {
		sourcemap: true,
		minify: false,
		lib: {
			entry: './src/L.AutoGraticule.ts',
			name: 'L.AutoGraticule',
			fileName: () => "L.AutoGraticule.js",
			formats: ["es"]
		},
		rollupOptions: {
			external: (id) => !id.startsWith("./") && !id.startsWith("../") && /* resolved internal modules */ !isAbsolute(id)
		}
	},
	resolve: {
		alias: {
			'leaflet-auto-graticule': './src/L.AutoGraticule.ts'
		}
	},
	test: {
		environment: 'jsdom'
	}
});
