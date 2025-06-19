# 🚀 REST API con Supabase

Una API RESTful construida con Node.js que utiliza ➕ **Supabase** como backend (base de datos Postgres + autenticación + storage). Ideal para gestionar recursos con rutas CRUD y autenticación integral.

## 📦 Características

- Endpoints **CRUD** para la entidad `books`.
- Validación de datos con [Zod](https://github.com/colinhacks/zod).

---

## ⚙️ Requisitos

- Node.js (≥ 18.x recomendado)
- Cuenta y proyecto en Supabase
- Variables de entorno:

  - `DATABASE_URL`

---

## 🛠️ Instalación y configuración

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/nahueldevv/rest-api-with-supabase.git
   cd rest-api-with-supabase

   ```

2. Instalá dependencias:

   ```bash
   npm install
   ```

3. Creá un archivo .env en la raíz y agregá:

   ```bash
   SUPABASE_URL=<tu-url-de-supabase>
   ```

4. Ejecuta

   ```bash
   npm run dev:pgsql
   ```
