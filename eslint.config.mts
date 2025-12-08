import { defineConfig } from "eslint/config";

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
export default defineConfig([
    {
        ignores: ["node_modules", ".next", ".git", ".env*", "src/generated/prisma/**/*"],
    },
    ...nextCoreWebVitals,
    ...nextTypescript,

    {
        files: ["**/*.{js,jsx,ts,tsx}"],

        settings: {
            tailwindcss: {
                callees: ["cn", "clsx", "cva"], // optional support for common className helpers
            },
        },
    },
]);
