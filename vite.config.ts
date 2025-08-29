import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	optimizeDeps: {
		include: ["@turf/jsts", "@turf/buffer"],
	},
	build: {
		chunkSizeWarningLimit: 11000,
		minify: true,
		sourcemap: true,
		commonjsOptions: {
			include: [/node_modules/],
			transformMixedEsModules: true,
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {},
			},
		},
		target: ["es2023"],
	},
});
