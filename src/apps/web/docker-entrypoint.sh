#!/bin/sh
set -e

# Inject runtime environment into env.js
cat <<EOF > /app/public/env.js
window.env = {
  SUPABASE_URL: "${SUPABASE_URL}",
  SUPABASE_ANON_KEY: "${SUPABASE_ANON_KEY}"
};
EOF

exec "$@"