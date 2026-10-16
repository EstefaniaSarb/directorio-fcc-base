-- Base de datos del Directorio FCC (MySQL 8 o MariaDB/XAMPP)
-- Ejecutar:  mysql -u root -p < sql/docentes.sql
SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS directorio_fcc
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE directorio_fcc;

CREATE TABLE IF NOT EXISTS docentes (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  area   VARCHAR(80)  NOT NULL
);

INSERT IGNORE INTO docentes (nombre, correo, area) VALUES
  ('Ana López',     'ana.lopez@correo.buap.mx',     'Inteligencia Artificial'),
  ('Luis Pérez',    'luis.perez@correo.buap.mx',    'Ingeniería de Software'),
  ('María Torres',  'maria.torres@correo.buap.mx',  'Ciencia de Datos'),
  ('Jorge Ramírez', 'jorge.ramirez@correo.buap.mx', 'Redes y Seguridad');
