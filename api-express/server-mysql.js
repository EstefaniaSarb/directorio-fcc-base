// API REST con Express y MySQL (mismo contrato que json-server).
// Ejecutar:  npm run start:mysql
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

// Lee el archivo .env si existe (Node.js 20.12 o superior)
try {
  process.loadEnvFile();
} catch {
  // sin .env se usan los valores por defecto
}

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'directorio_fcc',
  charset: 'utf8mb4',
});

// El id se devuelve como texto para respetar el modelo de Angular
const COLUMNAS = 'CAST(id AS CHAR) AS id, nombre, correo, area';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// GET /docentes → lista completa
app.get('/docentes', async (req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT ${COLUMNAS} FROM docentes ORDER BY id`,
    );
    res.json(filas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al consultar la base de datos' });
  }
});

// POST /docentes → inserta y responde 201 con el registro creado
app.post('/docentes', async (req, res) => {
  const { nombre, correo, area } = req.body ?? {};
  if (!nombre || !correo || !area) {
    return res
      .status(400)
      .json({ mensaje: 'nombre, correo y area son obligatorios' });
  }
  try {
    const [resultado] = await pool.execute(
      'INSERT INTO docentes (nombre, correo, area) VALUES (?, ?, ?)',
      [nombre, correo, area],
    );
    res
      .status(201)
      .json({ id: String(resultado.insertId), nombre, correo, area });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al guardar en la base de datos' });
  }
});

// DELETE /docentes/:id → elimina y responde 204
app.delete('/docentes/:id', async (req, res) => {
  try {
    const [resultado] = await pool.execute(
      'DELETE FROM docentes WHERE id = ?',
      [req.params.id],
    );
    return resultado.affectedRows > 0
      ? res.status(204).end()
      : res.status(404).json({ mensaje: 'No encontrado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al eliminar en la base de datos' });
  }
});

app.listen(3000, () =>
  console.log('API Express + MySQL en http://localhost:3000/docentes'),
);
