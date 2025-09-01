import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
 { ignores: ["**/dist/**", "**/*.generated.*"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  // React-specific rules only for web and react-ui
  {
    files: ["apps/web/**/*.{ts,tsx,js,jsx}", "packages/react-ui/**/*.{ts,tsx,js,jsx}"],
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn"
    }
  },

  // TS rules for all packages/apps
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: { undefined: "Use `null` or a strict type instead of `undefined`." }
        }
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_", ignoreRestSiblings: true }
      ]
    }
  }
]);
