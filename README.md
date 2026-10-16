# Directorio FCC · Unidad 3 (Angular 20) · PROYECTO BASE

Versión con actividades pendientes. Buscar los comentarios `TODO` (Ctrl+Shift+F en VS Code) y resolverlos en orden: 2a, 2b, 3, 4.

SPA del Diplomado en Ciencias de la Computación (FCC, BUAP) que consume una API REST de docentes.

La guía paso a paso de la actividad es el documento `Guia_Paso_a_Paso_Directorio_FCC.docx`.

## Requisitos
- Node.js 20.19 o superior (recomendado 22 LTS)
- Angular CLI 20: `npm install -g @angular/cli@20`

## Ejecución
```bash
npm install
npm run api      # terminal 1: json-server en http://localhost:3000/docentes
npm start        # terminal 2: Angular en http://localhost:4200
```

### Alternativa: API con Express
```bash
cd api-express
npm install
npm start        # http://localhost:3000/docentes (datos en memoria)
```

### Backend con MySQL (módulo 2)
```bash
cd api-express
cp .env.example .env     # ajustar DB_PASSWORD (vacía con XAMPP)
mysql -u root -p < sql/docentes.sql
npm install
npm run start:mysql      # http://localhost:3000/docentes conectado a MySQL
```

## Despliegue gratuito en Vercel
El proyecto ya incluye lo necesario: `vercel.json`, la función `api/index.js` y `environment.ts` apuntando a `/api`.

1. Subir el proyecto a un repositorio de GitHub (sin la carpeta `node_modules`).
2. Entrar a https://vercel.com con la cuenta de GitHub (plan Hobby, gratuito).
3. **Add New › Project**, importar el repositorio y presionar **Deploy** sin cambiar la configuración.
4. Verificar `https://<proyecto>.vercel.app/api/docentes` (JSON) y `https://<proyecto>.vercel.app` (la aplicación).

Cada `git push` a la rama principal publica una nueva versión automáticamente.

> En Vercel la API guarda los datos en memoria: los registros agregados se pierden cuando la función se reinicia. Para persistencia se conecta una base de datos en la nube.

## Estructura
```
src/app/
├── core/models/docente.ts               modelo del dominio
├── shared/ui/esqueleto/                 estado de carga accesible
└── features/directorio/
    ├── data/docentes.service.ts         HttpClient: GET, POST, DELETE
    ├── data/docentes.store.ts           store con signals
    ├── data/preferencias.store.ts       favoritos persistentes (localStorage)
    ├── ui/tarjeta-docente/              componente presentacional
    ├── ui/formulario-docente/           formulario con botón de estados
    └── directorio-pagina.*              componente contenedor
```
