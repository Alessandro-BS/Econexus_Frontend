-- =====================================================
-- SISTEMA DE GESTIÓN DE SANEAMIENTO AMBIENTAL
-- Base de datos: MySQL 8.0 (MySQL Workbench)
-- Proyecto: Econexus - Herramientas de Desarrollo
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS saneamiento_ambiental
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE saneamiento_ambiental;

-- =====================================================
-- TABLA 1: usuarios
-- Empleados internos con acceso al sistema
-- =====================================================
CREATE TABLE usuarios (
    id                INT           AUTO_INCREMENT PRIMARY KEY,
    nombre_completo   VARCHAR(150)  NOT NULL,
    email             VARCHAR(100)  NOT NULL UNIQUE,
    telefono          VARCHAR(20)   NULL,
    password_hash     VARCHAR(255)  NOT NULL,
    rol               ENUM('ADMIN', 'SUPERVISOR', 'OPERADOR') NOT NULL,
    estado            ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    fecha_creacion    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 2: clientes
-- Empresas que contratan los servicios de saneamiento
-- =====================================================
CREATE TABLE clientes (
    id                  INT           AUTO_INCREMENT PRIMARY KEY,
    razon_social        VARCHAR(200)  NOT NULL,
    ruc                 VARCHAR(11)   NOT NULL UNIQUE,
    contacto_principal  VARCHAR(150)  NOT NULL,
    telefono            VARCHAR(20)   NOT NULL,
    email               VARCHAR(100)  NOT NULL,
    direccion           TEXT          NULL,
    estado              ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 3: tipos_servicio
-- Catálogo de tipos de servicio/residuo
-- =====================================================
CREATE TABLE tipos_servicio (
    id           INT           AUTO_INCREMENT PRIMARY KEY,
    nombre       VARCHAR(100)  NOT NULL UNIQUE,
    categoria    ENUM(
                    'SOLIDO_PELIGROSO',
                    'SOLIDO_NO_PELIGROSO',
                    'LIQUIDO',
                    'FUMIGACION',
                    'DESINFECCION',
                    'DESINSECTACION'
                 ) NOT NULL,
    descripcion  TEXT          NULL,
    estado       ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 4: proveedores
-- Empresas que suministran insumos (químicos, equipos)
-- FK: tipo_servicio_id → tipos_servicio(id)
-- =====================================================
CREATE TABLE proveedores (
    id                  INT           AUTO_INCREMENT PRIMARY KEY,
    razon_social        VARCHAR(200)  NOT NULL,
    ruc                 VARCHAR(11)   NOT NULL UNIQUE,
    contacto_principal  VARCHAR(150)  NOT NULL,
    telefono            VARCHAR(20)   NOT NULL,
    email               VARCHAR(100)  NOT NULL,
    direccion           TEXT          NULL,
    tipo_servicio_id    INT           NULL,
    estado              ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    fecha_registro      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_proveedores_tipo_servicio
        FOREIGN KEY (tipo_servicio_id) REFERENCES tipos_servicio(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 5: ordenes_servicio
-- Órdenes de servicio contratadas por los clientes
-- FK: cliente_id → clientes(id)
-- =====================================================
CREATE TABLE ordenes_servicio (
    id             INT            AUTO_INCREMENT PRIMARY KEY,
    numero_orden   VARCHAR(20)    NOT NULL UNIQUE,
    fecha_emision  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id     INT            NOT NULL,
    monto_total    DECIMAL(10,2)  NOT NULL,
    estado_pago    ENUM('PENDIENTE', 'PAGADO', 'ANULADO') NOT NULL DEFAULT 'PENDIENTE',
    factura_url    VARCHAR(500)   NULL,

    CONSTRAINT fk_ordenes_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 6: reportes
-- Reportes de cumplimiento post-servicio
-- FK: cliente_id → clientes(id)
-- FK: tipo_servicio_id → tipos_servicio(id)
-- =====================================================
CREATE TABLE reportes (
    id                   INT            AUTO_INCREMENT PRIMARY KEY,
    fecha_registro       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id           INT            NOT NULL,
    tipo_servicio_id     INT            NOT NULL,
    descripcion          TEXT           NULL,
    cantidad             DECIMAL(10,2)  NULL,
    unidad_medida        ENUM('KG', 'LITROS', 'M2', 'UNIDAD') NULL,
    estado_cumplimiento  ENUM('PENDIENTE', 'EN_PROCESO', 'CUMPLIDO', 'OBSERVADO') NOT NULL,

    CONSTRAINT fk_reportes_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_reportes_tipo_servicio
        FOREIGN KEY (tipo_servicio_id) REFERENCES tipos_servicio(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA 7: normativas
-- Marco legal aplicable (tabla independiente, sin FK)
-- =====================================================
CREATE TABLE normativas (
    id                INT           AUTO_INCREMENT PRIMARY KEY,
    codigo            VARCHAR(50)   NOT NULL UNIQUE,
    titulo            VARCHAR(255)  NOT NULL,
    descripcion       TEXT          NULL,
    fecha_publicacion DATE          NOT NULL,
    entidad_emisora   VARCHAR(100)  NOT NULL,
    url_documento     VARCHAR(500)  NULL,
    estado            ENUM('VIGENTE', 'DEROGADA') NOT NULL DEFAULT 'VIGENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;