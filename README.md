# Orkesta To Do - Sistema Operativo Personal

Aplicación de gestión de tareas hiper-personalizada estilo "Personal OS". Construida con Next.js, Prisma y Tailwind.

## Características

- **Inbox & Procesamiento Rápido**: Captura ideas y tareas con un wizard guiado.
- **Kanban por Proyecto**: Gestión visual con límites WIP.
- **Revisiones Guiadas**: Flujos para revisión Diaria y Semanal.
- **Gamificación**: Métricas, objetivos diarios y feedback visual.
- **Dashboard Ejecutivo**: Vista de alto nivel del estado del sistema.
- **Audio Capture**: Captura por voz (Web Speech API).

## Tecnologías

- Next.js 14+ (App Router)
- Tailwind CSS + Framer Motion
- Prisma ORM (SQLite en Dev / Postgres en Prod)
- Lucide Icons
- dnd-kit (Drag & Drop)

## Configuración Local

1.  **Clonar el repositorio y entrar:**
    ```bash
    git clone https://github.com/Orkestaia/Orkesta_TO_DO.git
    cd Orkesta_TO_DO
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Base de Datos (SQLite):**
    ```bash
    # Crea la BD y ejecuta migraciones
    npx prisma migrate dev --name init
    
    # (Opcional) Poblar con datos iniciales (Seed)
    npx tsx prisma/seed.ts
    ```

4.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1.  **GitHub:**
    - Asegúrate de que el código está en tu repositorio GitHub (`Orkesta_TO_DO`).
    
    ```bash
    git add .
    git commit -m "Initial commit: Orkesta MVP"
    git branch -M main
    git remote add origin https://github.com/Orkestaia/Orkesta_TO_DO.git
    git push -u origin main
    ```

2.  **Vercel:**
    - Entra a [vercel.com/new](https://vercel.com/new).
    - Importa el repositorio `Orkesta_TO_DO`.
    - **Configuración del Proyecto:**
        - **Framework Preset:** Next.js
        - **Root Directory:** `./`
        - **Build Command:** `next build` (default)
        - **Install Command:** `npm install` (default)

3.  **Base de Datos (Producción):**
    - Vercel no soporta SQLite persistente (los archivos se borran en cada deploy).
    - **Opción A (Recomendada):** Usa **Vercel Postgres** o **Supabase**.
        1. Crea un Storage en Vercel (Postgres).
        2. Vercel añadirá automáticamente las variables `POSTGRES_PRISMA_URL` etc.
        3. En `prisma/schema.prisma`, cambia el provider a `postgresql` para producción o usa variables de entorno dinámicas (aunque Prisma requiere re-generar el cliente).
        - *Nota:* Para este MVP con SQLite, **solo funcionará persistencia local**.
        - **Para desplegar con Postgres:**
            - Modifica `prisma/schema.prisma`:
              ```prisma
              datasource db {
                provider = "postgresql"
                url      = env("POSTGRES_PRISMA_URL")
              }
              ```
            - Ejecuta `npx prisma generate` antes del deploy.

## Estructura de Proyectos (Seed)

El sistema genera automáticamente:
- **01_EMPRESA**: Visión, Marketing, etc.
- **02_CLIENTES**: Quick RX, WFP, etc.
- **03_PERSONAL**: Salud, Hogar.
- **04_ADMIN**: Finanzas.
- **05_INBOX**: Captura.

## Personalización

- Ve a `/settings` para cambiar colores (Primary/Accent) y activar modo oscuro.
- Los colores se guardan en BD y CSS Variables.

---
**Orkesta Automation** - Internal Tool
