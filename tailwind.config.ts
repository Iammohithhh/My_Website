import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FCFBF8",
          dim: "#F4F2EC",
        },
        ink: {
          DEFAULT: "#1B1B1B",
          muted: "#55534E",
          faint: "#8A877F",
        },
        line: "#E5E1D8",
        accent: {
          DEFAULT: "#0F6E68",
          dark: "#0A514C",
          pale: "#E3F0ED",
        },
        iris: {
          DEFAULT: "#4F46B5",
          pale: "#EAE8F8",
        },
        ochre: {
          DEFAULT: "#9A5A0C",
          pale: "#F8EEDF",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 27, 27, 0.04), 0 8px 24px -12px rgba(27, 27, 27, 0.14)",
        lift: "0 2px 4px rgba(27, 27, 27, 0.05), 0 16px 32px -12px rgba(27, 27, 27, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        page: "64rem",
        prose: "42rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1B1B1B",
            "--tw-prose-headings": "#1B1B1B",
            "--tw-prose-links": "#0F6E68",
            "--tw-prose-bold": "#1B1B1B",
            "--tw-prose-quotes": "#55534E",
            "--tw-prose-captions": "#55534E",
            "--tw-prose-code": "#1B1B1B",
            "--tw-prose-hr": "#E5E1D8",
            "--tw-prose-th-borders": "#E5E1D8",
            "--tw-prose-td-borders": "#E5E1D8",
            "--tw-prose-pre-bg": "#F4F2EC",
            "--tw-prose-pre-code": "#1B1B1B",
            a: { textUnderlineOffset: "3px" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            figcaption: { textAlign: "center" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
