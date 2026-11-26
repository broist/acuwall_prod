import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // App routerben a <a href="/#szekcio"> szándékos: a főoldal egy szakaszára
      // ugrik teljes betöltéssel. A szabály a régi pages/ routerhez készült.
      "@next/next/no-html-link-for-pages": "off",
      // A React 19-es eslint-plugin új, szigorúbb szabályai — a meglévő,
      // működő hookokat figyelmeztetésként jelzik, nem hibaként.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "acuwall-website/**", "acuwall_v2-main/**", "test_reports/**", "next-env.d.ts"],
  },
];

export default config;
