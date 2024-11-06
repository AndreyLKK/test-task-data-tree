export default defineNuxtConfig({
  compatibilityDate: "2024-11-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  buildModules: ["nuxt-vue-select"],
});
