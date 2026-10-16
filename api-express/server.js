// API REST con Express (alternativa a json-server).
// Ejecutar:  cd api-express && npm install && npm start
// La versión con base de datos del módulo 2 está en server-mysql.js.
import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' })); // permite el frontend Angular
app.use(express.json());

let docentes = [
  {
    id: '1',
    nombre: 'Ana López',
    correo: 'ana.lopez@correo.buap.mx',
    area: 'Inteligencia Artificial',
  },
  {
    id: '2',
    nombre: 'Luis Pérez',
    correo: 'luis.perez@correo.buap.mx',
    area: 'Ingeniería de Software',
  },
  {
    id: '3',
    nombre: 'María Torres',
    correo: 'maria.torres@correo.buap.mx',
    area: 'Ciencia de Datos',
  },
  {
    id: '4',
    nombre: 'Jorge Ramírez',
    correo: 'jorge.ramirez@correo.buap.mx',
    area: 'Redes y Seguridad',
  },
];

// GET /docentes  → lista completa
app.get('/docentes', (req, res) => res.json(docentes));

// POST /docentes → crea un registro y responde 201 con el recurso
app.post('/docentes', (req, res) => {
  const { nombre, correo, area } = req.body ?? {};
  if (!nombre || !correo || !area) {
    return res
      .status(400)
      .json({ mensaje: 'nombre, correo y area son obligatorios' });
  }
  const nuevo = { id: randomUUID(), nombre, correo, area };
  docentes.push(nuevo);
  res.status(201).json(nuevo);
});

// DELETE /docentes/:id → elimina y responde 204
app.delete('/docentes/:id', (req, res) => {
  const antes = docentes.length;
  docentes = docentes.filter((d) => d.id !== req.params.id);
  return docentes.length < antes
    ? res.status(204).end()
    : res.status(404).json({ mensaje: 'No encontrado' });
});

app.listen(3000, () =>
  console.log('API Express en http://localhost:3000/docentes'),
);
