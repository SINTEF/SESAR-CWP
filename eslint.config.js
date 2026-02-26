import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default defineConfig([
	{
		linterOptions: {
			reportUnusedDisableDirectives: "warn"
		}
	},
	{
		ignores: [
			"dist/**",
			"coverage/**",
			"node_modules/**",
			"public/map-fonts/**",
			"src/proto/**",
			"src/model/ConfigurationTime.ts",
			"src/**/*.obs.js",
			"src/**/*.obs.d.ts",
			"src/utils/passwordStore.obs.js"
		]
	},
	js.configs.recommended,
  //unicorn.configs.recommended,
	...tseslint.configs.recommendedTypeCheckedOnly,
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		plugins: {
			unicorn,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-hooks/immutability": "off",
				"@typescript-eslint/unbound-method": "error",
      // broken
			"no-unused-vars": "off",
      // working version
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_"
				}
			],
      // broken
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {
						attributes: false
					}
				}
			],
			/*"react-refresh/only-export-components": "warn",
			"react-hooks/immutability": "off",
			"unicorn/better-regex": "error",
			"unicorn/no-array-callback-reference": "error",
			"unicorn/no-invalid-fetch-options": "error",
			"unicorn/no-new-buffer": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-empty-object-type": "error",
			"@typescript-eslint/unbound-method": "error",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {
						attributes: false
					}
				}
			],*/
			"no-console": "off"
		}
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": "off"
		}
	},
	{
		files: ["**/*.{ts,tsx,mts,cts}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ["**/*.{js,jsx,mjs,cjs}"],
		...tseslint.configs.disableTypeChecked
	}
]);
