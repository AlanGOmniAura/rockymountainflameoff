import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#ff8c00", // Legacy orange
            },
            fontFamily: {
                body: ["var(--font-body)"],
                outfit: ["var(--font-outfit)"],
                russell: ["var(--font-russell)"],
            },
        },
    },
    plugins: [],
};
export default config;
