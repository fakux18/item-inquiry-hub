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

# VITE_SUPABASE_URL=https://prafijwpgcsblstfuyba.supabase.co

# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYWZpandwZ2NzYmxzdGZ1eWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNDI1NTcsImV4cCI6MjA2NjgxODU1N30.YkA6pvtSWEUuoZBwiX5RE6CkUkievfNVSS7Q8UYm4mI

# Usa los valores de tu proyecto Supabase si son diferentes.
