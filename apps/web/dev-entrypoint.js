const fs = require("fs");
const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env.local")});


const env = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};

const output = `window.env = ${JSON.stringify(env, null, 2)};\n`;

const outputPath = path.join(__dirname, "./public/env.js");
fs.writeFileSync(outputPath, output);

console.log("✅ public/env.js written for local dev");