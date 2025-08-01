import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";



export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "manifest.xml", dest: "" },
        { src: "public/icons/**/*", dest: "icons" },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        commands: resolve(__dirname, "commands.html"),
      },
    },
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});