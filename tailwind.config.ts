import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "#814AC8", // Fallback or use Css var if we set it up as valid rgb
                    // Actually, let's just use the Hex requested as default, and allow override via style attribute or Context
                    // But user wants "Settings" to change it. So CSS variables are best.
                    // Let's assume we update the style tag on <body> for dynamic colors.
                },
                accent: {
                    DEFAULT: "#23475B",
                },
                muted: {
                    DEFAULT: "rgb(var(--muted) / <alpha-value>)",
                    foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
                },
                border: "rgb(var(--border) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};
export default config;
