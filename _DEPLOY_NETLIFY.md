# Netlify deploy instructions for Vite + React

# 1. Instala dependencias: npm install

# 2. Build: npm run build

# 3. Publica la carpeta dist/

# 4. En Netlify, configura el build command como: npm run build

# y el publish directory como: dist

# 5. Si usas rutas con React Router, activa el redirect para SPA:

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

##

## Variables de entorno para Supabase (Netlify)

##

# Ve a Site settings > Environment variables en Netlify y agrega:

# VITE_SUPABASE_URL=https://xnsxgexzlczqajyihyez.supabase.co

# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuc3hnZXh6bGN6cWFqeWloeWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODQwMzIsImV4cCI6MjA2NTI2MDAzMn0.iMfs2R5OrMcLFsCVdGEblsQR9isWIUarlqU4ywtjJso

# Usa los valores de tu proyecto Supabase si son diferentes.
