import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", ".next-build/**", "node_modules/**", "out/**", "dist/**", "next-env.d.ts"],
  },
];

export default config;
