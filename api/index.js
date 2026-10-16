// API de docentes como función de Vercel (producción).
// En desarrollo se usa json-server (npm run api) o la carpeta api-express.
// Los datos viven en memoria: se reinician cuando Vercel recicla la función.
// Para persistencia real se sustituye el arreglo por una base de datos.
const { randomUUID } = require('node:crypto');
const semilla = require('./db.json').docentes;

let docentes = semilla.map((d) => ({ ...d }));

function responder(res, estado, cuerpo) {
  res.statusCode = estado;
  if (cuerpo === undefined) return res.end();
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(cuerpo));
}

async function leerCuerpo(req) {
  // Vercel entrega el cuerpo ya interpretado en req.body
  if (req.body && typeof req.body === 'object') return req.body;
  let texto = '';
  for await (const parte of req) texto += parte;
  try {
    return texto ? JSON.parse(texto) : {};
  } catch {
    return {};
  }
}

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // Rutas admitidas: /api/docentes y /api/docentes/:id
  const partes = url.pathname
    .replace(/^\/api\/?/, '')
    .split('/')
    .filter(Boolean);
  const id = url.searchParams.get('id') ?? partes[1];

  if (partes.length && partes[0] !== 'docentes') {
    return responder(res, 404, { mensaje: 'Ruta no encontrada' });
  }

  if (req.method === 'GET' && !id) return responder(res, 200, docentes);

  if (req.method === 'GET' && id) {
    const docente = docentes.find((d) => d.id === id);
    return docente
      ? responder(res, 200, docente)
      : responder(res, 404, { mensaje: 'No encontrado' });
  }

  if (req.method === 'POST' && !id) {
    const { nombre, correo, area } = await leerCuerpo(req);
    if (!nombre || !correo || !area) {
      return responder(res, 400, {
        mensaje: 'nombre, correo y area son obligatorios',
      });
    }
    const nuevo = { id: randomUUID(), nombre, correo, area };
    docentes.push(nuevo);
    return responder(res, 201, nuevo);
  }

  if (req.method === 'DELETE' && id) {
    const antes = docentes.length;
    docentes = docentes.filter((d) => d.id !== id);
    return docentes.length < antes
      ? responder(res, 204)
      : responder(res, 404, { mensaje: 'No encontrado' });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return responder(res, 405, { mensaje: 'Método no permitido' });
};
