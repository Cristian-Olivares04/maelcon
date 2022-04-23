/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_categorias
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_categorias` (
  `ID_CATEGORIA` int NOT NULL AUTO_INCREMENT,
  `CATEGORIA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_CATEGORIA`),
  UNIQUE KEY `CATEGORIA` (`CATEGORIA`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_clientes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_clientes` (
  `ID_CLIENTE` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL CLIENTE',
  `NOMBRE_CLIENTE` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL CLIENTE PARA REGISTRAR EN EL SISTEMA',
  `RTN` varchar(16) COLLATE utf8_unicode_ci NOT NULL COMMENT 'OBTENER EL RTN DEL CLIENTE',
  `DIRECCION_CLIENTE` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR DIRECCION COMPLETA DEL CLIENTE',
  `TELEFONO_CLIENTE` varchar(9) COLLATE utf8_unicode_ci NOT NULL COMMENT 'OBTENER TELEFONO DEL CLIENTE',
  PRIMARY KEY (`ID_CLIENTE`),
  UNIQUE KEY `RTN` (`RTN`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_compras
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_compras` (
  `ID_COMPRA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `ID_PAGO` int NOT NULL,
  `ID_PROVEEDOR` int NOT NULL,
  `OBSERVACION_COMPRA` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FECHA_COMPRA` datetime NOT NULL,
  `TOTAL_COMPRA` decimal(10, 2) NOT NULL,
  `ISV_COMPRA` decimal(10, 2) NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_COMPRA`),
  KEY `FK_COM_USUARIO` (`ID_USUARIO`),
  KEY `FK_COM_PAGO` (`ID_PAGO`),
  KEY `FK_COM_PROVEEDORES` (`ID_PROVEEDOR`),
  CONSTRAINT `tbl_compras_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_compras_ibfk_2` FOREIGN KEY (`ID_PAGO`) REFERENCES `tbl_metodos_pago` (`ID_PAGO`),
  CONSTRAINT `tbl_compras_ibfk_3` FOREIGN KEY (`ID_PROVEEDOR`) REFERENCES `tbl_proveedores` (`ID_PROVEEDOR`),
  CONSTRAINT `tbl_compras_chk_1` CHECK (
  (
    (`TOTAL_COMPRA` >= 0)
    and (`ISV_COMPRA` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_detalles_compra
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_detalles_compra` (
  `ID_DETALLE_COMPRA` int NOT NULL AUTO_INCREMENT,
  `ID_PRODUCTO` int NOT NULL,
  `ID_COMPRA` int NOT NULL,
  `DESCRIP_COMPRA` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `CANTIDAD_PRODUCTO` decimal(10, 2) NOT NULL,
  `SUB_TOTAL` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`ID_DETALLE_COMPRA`),
  UNIQUE KEY `ID_COMPRA` (`ID_COMPRA`, `ID_PRODUCTO`),
  KEY `FK_DETA_PRODUCTOS` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_compra_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_detalles_compra_ibfk_2` FOREIGN KEY (`ID_COMPRA`) REFERENCES `tbl_compras` (`ID_COMPRA`) ON DELETE CASCADE,
  CONSTRAINT `tbl_detalles_compra_chk_1` CHECK (
  (
    (`CANTIDAD_PRODUCTO` > 0)
    and (`SUB_TOTAL` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_detalles_venta
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_detalles_venta` (
  `ID_DETALLE_VENTA` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL DETALLE DE LA VENTA',
  `ID_PRODUCTO` int NOT NULL COMMENT 'ID DEL PRODUCTO',
  `ID_VENTA` int NOT NULL COMMENT 'ID DE LA VENTA',
  `MONTO_UNITARIO` decimal(10, 2) NOT NULL COMMENT 'DESCRIBIR EL PRECIO UNITARIO DE CADA ARTICULO',
  `CANTIDAD_PRODUCTO` decimal(10, 2) NOT NULL COMMENT 'DESCRIBIR CANTIDAD DEL PRODUCTO VENDIDO',
  `SUB_TOTAL` decimal(10, 2) NOT NULL COMMENT 'SUB TOTAL SIN IMPUESTO DE LA VENTA',
  `TOTAL` decimal(10, 2) NOT NULL COMMENT 'TOTAL MAS IMPUESTO DE LA VENTA',
  PRIMARY KEY (`ID_DETALLE_VENTA`),
  UNIQUE KEY `ID_VENTA` (`ID_VENTA`, `ID_PRODUCTO`),
  KEY `FK_DETA_PRODUCTO` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_venta_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_venta_ibfk_2` FOREIGN KEY (`ID_VENTA`) REFERENCES `tbl_ventas` (`ID_VENTA`),
  CONSTRAINT `tbl_detalles_venta_chk_1` CHECK (
  (
    (`SUB_TOTAL` >= 0)
    and (`TOTAL` >= 0)
    and (`CANTIDAD_PRODUCTO` >= 0)
    and (`MONTO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_informacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_informacion` (
  `ID_INFO` int NOT NULL AUTO_INCREMENT,
  `TITULO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TIPO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ENLACE` text COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_INFO`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_inventario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_inventario` (
  `ID_INVENTARIO` int NOT NULL AUTO_INCREMENT,
  `ID_PRODUCTO` int NOT NULL,
  `EXISTENCIA` decimal(10, 2) NOT NULL,
  `PRECIO_VENTA` decimal(10, 2) NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `METODO` tinyint(1) NOT NULL COMMENT ' 0 ES UNA COMPRA, 1 REPRESENTA UNA VENTA',
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_INVENTARIO`),
  KEY `FK_INVENPROD` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_inventario_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_inventario_chk_1` CHECK (
  (
    (`EXISTENCIA` >= 0)
    and (`PRECIO_VENTA` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_kardex
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_kardex` (
  `ID_KARDEX` int NOT NULL AUTO_INCREMENT,
  `ID_INVENTARIO` int NOT NULL,
  `FECHA_VENCI_PRODUCTO` datetime DEFAULT NULL COMMENT 'EN CASO DE QUE CADUQUE',
  `CANTIDAD` decimal(10, 2) NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `TOTAL` decimal(10, 2) NOT NULL,
  `TIPO_MOVIMIENTO` tinyint(1) NOT NULL,
  `FECHA_MOVIMIENTO` datetime NOT NULL,
  PRIMARY KEY (`ID_KARDEX`),
  KEY `FK_KAR_INVENTARIO` (`ID_INVENTARIO`),
  CONSTRAINT `tbl_kardex_ibfk_1` FOREIGN KEY (`ID_INVENTARIO`) REFERENCES `tbl_inventario` (`ID_INVENTARIO`),
  CONSTRAINT `tbl_kardex_chk_1` CHECK (
  (
    (`CANTIDAD` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
    and (`TOTAL` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_metodos_pago
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_metodos_pago` (
  `ID_PAGO` int NOT NULL AUTO_INCREMENT,
  `FORMA_PAGO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PAGO`),
  UNIQUE KEY `FORMA_PAGO` (`FORMA_PAGO`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_mp_puesto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_mp_puesto` (
  `ID_PUESTO` int NOT NULL AUTO_INCREMENT,
  `PUESTO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION_PUESTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PUESTO`),
  UNIQUE KEY `PUESTO` (`PUESTO`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_bitacora
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_bitacora` (
  `ID_BITACORA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `ID_OBJETO` int NOT NULL,
  `ACCION` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` text COLLATE utf8_unicode_ci NOT NULL,
  `INFORMACION_ANTERIOR` text COLLATE utf8_unicode_ci,
  `INFORMACION_ACTUAL` text COLLATE utf8_unicode_ci,
  `FECHA_BITACORA` datetime NOT NULL,
  PRIMARY KEY (`ID_BITACORA`),
  KEY `FK_BITA_USUA` (`ID_USUARIO`),
  KEY `FK_BITA_OBJE` (`ID_OBJETO`),
  CONSTRAINT `tbl_ms_bitacora_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_bitacora_ibfk_2` FOREIGN KEY (`ID_OBJETO`) REFERENCES `tbl_objetos` (`ID_OBJETO`)
) ENGINE = InnoDB AUTO_INCREMENT = 263 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_hist_contrasena
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_hist_contrasena` (
  `ID_HISTORIAL` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `CONTRASENA` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_HISTORIAL`),
  KEY `FK_HIST_CONTRA_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_hist_contrasena_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_parametros
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_parametros` (
  `ID_PARAMETRO` int NOT NULL AUTO_INCREMENT,
  `PARAMETRO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ID_USUARIO` int NOT NULL,
  `VALOR` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `FECHA_MODIFICACION` datetime NOT NULL,
  PRIMARY KEY (`ID_PARAMETRO`),
  UNIQUE KEY `PARAMETRO` (`PARAMETRO`),
  KEY `FK_PARA_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_parametros_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_preguntas_usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_preguntas_usuario` (
  `ID_PREGUNTAS_USR` int NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA PREGUNTA DEL USUARIO EN EL SISTEMA',
  `ID_USUARIO` int NOT NULL COMMENT 'ID DEL USUARIO ',
  `PREGUNTA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'PREGUNTAS DEL USUARIO',
  `RESPUESTA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA RESPUESTA DE LAS PREGUNTAS DELUSUARIO ',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DE LA PREGUNTA ',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO LAS PREGUNTAS',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO LA PREGUNTA',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO LAS PREGUNTAS',
  PRIMARY KEY (`ID_PREGUNTAS_USR`),
  KEY `FK_PREG_USUARIO` (`ID_USUARIO`),
  KEY `FK_CREADOR_MS_PREGUNTAS` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_MS_PREGUNTAS` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_2` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_3` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_roles` (
  `ID_ROL` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ROL` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ROL QUE DESEMPEÑA EL USUARIO',
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL USUARIO',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL USUARIO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL ROL',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL ROL DEL USUARIO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL ROL',
  PRIMARY KEY (`ID_ROL`),
  UNIQUE KEY `ROL` (`ROL`),
  KEY `FK_CREADOR_ROL` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_ROL` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_ms_roles_ibfk_1` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_roles_ibfk_2` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL USUARIO ',
  `ID_ROL` int NOT NULL COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ID_PERSONA` int NOT NULL,
  `USUARIO` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR EL USUARIO',
  `CONTRASENA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRASEÑA DEL USUARIO',
  `IMG_USUARIO` text COLLATE utf8_unicode_ci NOT NULL,
  `CORREO_ELECTRONICO` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CORREO ELECTRONICO DEL USUARIO',
  `FECHA_ULTIMA_CONEXION` datetime NOT NULL COMMENT 'FECHA EN QUE EL USUARIO SE CONECTO POR ULTIMA VEZ',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL USUARIO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL USUARIO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  USUARIO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL USUARIO',
  `PRIMER_INGRESO` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR EL PRIMER INGRESO DEL USUARIO',
  `FECHA_VENCIMIENTO` datetime NOT NULL COMMENT 'DESCRIBIR LA FECHA DE VENCIMIENTO PARA QUE EL USUARIO CAMBIE DE CONTRASEÑA SEGUN LO ESTABLECIDO EN PARAMETRO',
  `ESTADO` tinyint(1) NOT NULL COMMENT 'ESTADO 0 INACTIVO, 1 ACTIVO',
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `USUARIO` (`USUARIO`),
  UNIQUE KEY `CORREO_ELECTRONICO` (`CORREO_ELECTRONICO`),
  KEY `FK_PER_USUARIO` (`ID_PERSONA`),
  KEY `FK_CREADOR_ID_USUARIO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_USUARIO` (`MODIFICADO_POR`),
  KEY `FK_ROL_USUARIO` (`ID_ROL`),
  CONSTRAINT `tbl_ms_usuario_ibfk_1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `tbl_personas` (`ID_PERSONA`),
  CONSTRAINT `tbl_ms_usuario_ibfk_2` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_usuario_ibfk_3` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_usuario_ibfk_4` FOREIGN KEY (`ID_ROL`) REFERENCES `tbl_ms_roles` (`ID_ROL`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_objetos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_objetos` (
  `ID_OBJETO` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL OBJETO DEL USUARIO ',
  `OBJETOS` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION  DEL OBJETO',
  `TIPO_OBJETO` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION  DEL TIPO OBJETO',
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR SI ES UNA INSERCION;ACTUALIZACION;ELIMINACION;NUEVO',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL OBJETO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL OBJETO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  OBJETO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL OBJETO',
  PRIMARY KEY (`ID_OBJETO`),
  UNIQUE KEY `OBJETOS` (`OBJETOS`),
  KEY `FK_CREADOR_OBJETO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_OBJETO` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_objetos_ibfk_1` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_objetos_ibfk_2` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_permiso
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_permiso` (
  `ID_ROL` int NOT NULL COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ID_OBJETO` int NOT NULL COMMENT 'ID DEL OBJETO DEL USUARIO ',
  `PERMISO_INSERCION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_ELIMINACION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_ACTUALIZACION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_CONSULTAR` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `FECHA_CREACION` datetime NOT NULL COMMENT 'FECHA DE CREACION DEL PERMISO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL PERMISO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  PERMISO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL PERMISO',
  PRIMARY KEY (`ID_ROL`, `ID_OBJETO`),
  KEY `FK_PERM_OBJETOS` (`ID_OBJETO`),
  KEY `FK_CREADOR_PERMISO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_PERMISO` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_permiso_ibfk_1` FOREIGN KEY (`ID_ROL`) REFERENCES `tbl_ms_roles` (`ID_ROL`),
  CONSTRAINT `tbl_permiso_ibfk_2` FOREIGN KEY (`ID_OBJETO`) REFERENCES `tbl_objetos` (`ID_OBJETO`),
  CONSTRAINT `tbl_permiso_ibfk_3` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_permiso_ibfk_4` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_personas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_personas` (
  `ID_PERSONA` int NOT NULL AUTO_INCREMENT,
  `ID_PUESTO` int NOT NULL,
  `NOMBRE_PERSONA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDO_PERSONA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `GENERO` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `RTN` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FEC_REGIS_PERSONA` datetime NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  `SUELDO` decimal(10, 2) NOT NULL COMMENT 'EL SUELDO ES DEL PUESTO O PERSONA',
  PRIMARY KEY (`ID_PERSONA`),
  UNIQUE KEY `RTN` (`RTN`),
  KEY `FK_PER_PUESTO` (`ID_PUESTO`),
  CONSTRAINT `tbl_personas_ibfk_1` FOREIGN KEY (`ID_PUESTO`) REFERENCES `tbl_mp_puesto` (`ID_PUESTO`),
  CONSTRAINT `tbl_personas_chk_1` CHECK ((`SUELDO` >= 0))
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_productos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_productos` (
  `ID_PRODUCTO` int NOT NULL AUTO_INCREMENT,
  `ID_PROVEEDOR` int NOT NULL,
  `NOMBRE_PRODUCTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `MARCA_PRODUCTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION_PRODUCTO` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'MODELO, TAMAÑO, COLOR, ETC...',
  `ID_CATEGORIA` int NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  `IMG_PRODUCTO` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PRODUCTO`),
  UNIQUE KEY `ID_PROVEEDOR` (
  `ID_PROVEEDOR`,
  `NOMBRE_PRODUCTO`,
  `MARCA_PRODUCTO`
  ),
  KEY `FK_PROD_CATEGORIAS` (`ID_CATEGORIA`),
  CONSTRAINT `tbl_productos_ibfk_1` FOREIGN KEY (`ID_PROVEEDOR`) REFERENCES `tbl_proveedores` (`ID_PROVEEDOR`) ON DELETE CASCADE,
  CONSTRAINT `tbl_productos_ibfk_2` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `tbl_categorias` (`ID_CATEGORIA`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_proveedores
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_proveedores` (
  `ID_PROVEEDOR` int NOT NULL AUTO_INCREMENT,
  `RTN` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRE_PROVEEDOR` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO_PROVEEDOR` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CORREO_PROVEEDOR` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PROVEEDOR`),
  UNIQUE KEY `RTN` (`RTN`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ventas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ventas` (
  `ID_VENTA` int NOT NULL AUTO_INCREMENT COMMENT 'ID DE LAS VENTAS',
  `ID_PAGO` int NOT NULL COMMENT 'ID DEL PAGO DE LA VENTA',
  `ID_USUARIO` int NOT NULL COMMENT 'ID DEL USUARIO',
  `CANTIDAD_VENTA` int NOT NULL COMMENT 'DESCRIPCION DE LA CANTIDAD DE VENTAS (considerar la necesidad de este campo)',
  `FECHA_VENTA` datetime NOT NULL COMMENT 'FECHA REALIZADA LA VENTA',
  `ID_CLIENTE` int NOT NULL COMMENT 'ID DEL CLIENTE',
  `ISV` decimal(10, 2) NOT NULL COMMENT 'DESCRIPCION DEL IMPUESTO',
  `TOTAL_VENTA` decimal(10, 2) NOT NULL COMMENT 'DESCRIPCION DEL TOTAL DE LA VENTA',
  `DESCRIPCION_VENTA` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR  LOS ARTICULOS DE LA VENTA REALIZADA U OBSERVACIONES',
  `ESTADO` tinyint(1) NOT NULL COMMENT 'IDENTIFICA SI UNA VENTA YA FUE FINALIZADA',
  `COMISION_EMPLEADO` decimal(10, 2) NOT NULL COMMENT 'COMISION DEL EMPLEADO EN BASE A LA VENTA',
  PRIMARY KEY (`ID_VENTA`),
  KEY `FK_VENTA_PAGO` (`ID_PAGO`),
  KEY `FK_VENTA_USUARIO` (`ID_USUARIO`),
  KEY `FK_VENTA_CLIENTE` (`ID_CLIENTE`),
  CONSTRAINT `tbl_ventas_ibfk_1` FOREIGN KEY (`ID_PAGO`) REFERENCES `tbl_metodos_pago` (`ID_PAGO`),
  CONSTRAINT `tbl_ventas_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ventas_ibfk_3` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tbl_clientes` (`ID_CLIENTE`),
  CONSTRAINT `tbl_ventas_chk_1` CHECK (
  (
    (`CANTIDAD_VENTA` >= 0)
    and (`TOTAL_VENTA` >= 0)
    and (`ISV` >= 0)
    and (`COMISION_EMPLEADO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_categorias
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_categorias` (
  `ID_CATEGORIA` int NOT NULL AUTO_INCREMENT,
  `CATEGORIA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_CATEGORIA`),
  UNIQUE KEY `CATEGORIA` (`CATEGORIA`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_clientes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_clientes` (
  `ID_CLIENTE` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL CLIENTE',
  `NOMBRE_CLIENTE` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL CLIENTE PARA REGISTRAR EN EL SISTEMA',
  `RTN` varchar(16) COLLATE utf8_unicode_ci NOT NULL COMMENT 'OBTENER EL RTN DEL CLIENTE',
  `DIRECCION_CLIENTE` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR DIRECCION COMPLETA DEL CLIENTE',
  `TELEFONO_CLIENTE` varchar(9) COLLATE utf8_unicode_ci NOT NULL COMMENT 'OBTENER TELEFONO DEL CLIENTE',
  PRIMARY KEY (`ID_CLIENTE`),
  UNIQUE KEY `RTN` (`RTN`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_compras
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_compras` (
  `ID_COMPRA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `ID_PAGO` int NOT NULL,
  `ID_PROVEEDOR` int NOT NULL,
  `OBSERVACION_COMPRA` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FECHA_COMPRA` datetime NOT NULL,
  `TOTAL_COMPRA` decimal(10, 2) NOT NULL,
  `ISV_COMPRA` decimal(10, 2) NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_COMPRA`),
  KEY `FK_COM_USUARIO` (`ID_USUARIO`),
  KEY `FK_COM_PAGO` (`ID_PAGO`),
  KEY `FK_COM_PROVEEDORES` (`ID_PROVEEDOR`),
  CONSTRAINT `tbl_compras_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_compras_ibfk_2` FOREIGN KEY (`ID_PAGO`) REFERENCES `tbl_metodos_pago` (`ID_PAGO`),
  CONSTRAINT `tbl_compras_ibfk_3` FOREIGN KEY (`ID_PROVEEDOR`) REFERENCES `tbl_proveedores` (`ID_PROVEEDOR`),
  CONSTRAINT `tbl_compras_chk_1` CHECK (
  (
    (`TOTAL_COMPRA` >= 0)
    and (`ISV_COMPRA` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_detalles_compra
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_detalles_compra` (
  `ID_DETALLE_COMPRA` int NOT NULL AUTO_INCREMENT,
  `ID_PRODUCTO` int NOT NULL,
  `ID_COMPRA` int NOT NULL,
  `DESCRIP_COMPRA` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `CANTIDAD_PRODUCTO` decimal(10, 2) NOT NULL,
  `SUB_TOTAL` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`ID_DETALLE_COMPRA`),
  UNIQUE KEY `ID_COMPRA` (`ID_COMPRA`, `ID_PRODUCTO`),
  KEY `FK_DETA_PRODUCTOS` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_compra_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_detalles_compra_ibfk_2` FOREIGN KEY (`ID_COMPRA`) REFERENCES `tbl_compras` (`ID_COMPRA`) ON DELETE CASCADE,
  CONSTRAINT `tbl_detalles_compra_chk_1` CHECK (
  (
    (`CANTIDAD_PRODUCTO` > 0)
    and (`SUB_TOTAL` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_detalles_venta
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_detalles_venta` (
  `ID_DETALLE_VENTA` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL DETALLE DE LA VENTA',
  `ID_PRODUCTO` int NOT NULL COMMENT 'ID DEL PRODUCTO',
  `ID_VENTA` int NOT NULL COMMENT 'ID DE LA VENTA',
  `MONTO_UNITARIO` decimal(10, 2) NOT NULL COMMENT 'DESCRIBIR EL PRECIO UNITARIO DE CADA ARTICULO',
  `CANTIDAD_PRODUCTO` decimal(10, 2) NOT NULL COMMENT 'DESCRIBIR CANTIDAD DEL PRODUCTO VENDIDO',
  `SUB_TOTAL` decimal(10, 2) NOT NULL COMMENT 'SUB TOTAL SIN IMPUESTO DE LA VENTA',
  `TOTAL` decimal(10, 2) NOT NULL COMMENT 'TOTAL MAS IMPUESTO DE LA VENTA',
  PRIMARY KEY (`ID_DETALLE_VENTA`),
  UNIQUE KEY `ID_VENTA` (`ID_VENTA`, `ID_PRODUCTO`),
  KEY `FK_DETA_PRODUCTO` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_venta_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_detalles_venta_ibfk_2` FOREIGN KEY (`ID_VENTA`) REFERENCES `tbl_ventas` (`ID_VENTA`),
  CONSTRAINT `tbl_detalles_venta_chk_1` CHECK (
  (
    (`SUB_TOTAL` >= 0)
    and (`TOTAL` >= 0)
    and (`CANTIDAD_PRODUCTO` >= 0)
    and (`MONTO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_informacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_informacion` (
  `ID_INFO` int NOT NULL AUTO_INCREMENT,
  `TITULO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TIPO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ENLACE` text COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_INFO`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_inventario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_inventario` (
  `ID_INVENTARIO` int NOT NULL AUTO_INCREMENT,
  `ID_PRODUCTO` int NOT NULL,
  `EXISTENCIA` decimal(10, 2) NOT NULL,
  `PRECIO_VENTA` decimal(10, 2) NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `METODO` tinyint(1) NOT NULL COMMENT ' 0 ES UNA COMPRA, 1 REPRESENTA UNA VENTA',
  `ESTADO` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_INVENTARIO`),
  KEY `FK_INVENPROD` (`ID_PRODUCTO`),
  CONSTRAINT `tbl_inventario_ibfk_1` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tbl_productos` (`ID_PRODUCTO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_inventario_chk_1` CHECK (
  (
    (`EXISTENCIA` >= 0)
    and (`PRECIO_VENTA` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_kardex
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_kardex` (
  `ID_KARDEX` int NOT NULL AUTO_INCREMENT,
  `ID_INVENTARIO` int NOT NULL,
  `FECHA_VENCI_PRODUCTO` datetime DEFAULT NULL COMMENT 'EN CASO DE QUE CADUQUE',
  `CANTIDAD` decimal(10, 2) NOT NULL,
  `PRECIO_UNITARIO` decimal(10, 2) NOT NULL,
  `TOTAL` decimal(10, 2) NOT NULL,
  `TIPO_MOVIMIENTO` tinyint(1) NOT NULL,
  `FECHA_MOVIMIENTO` datetime NOT NULL,
  PRIMARY KEY (`ID_KARDEX`),
  KEY `FK_KAR_INVENTARIO` (`ID_INVENTARIO`),
  CONSTRAINT `tbl_kardex_ibfk_1` FOREIGN KEY (`ID_INVENTARIO`) REFERENCES `tbl_inventario` (`ID_INVENTARIO`),
  CONSTRAINT `tbl_kardex_chk_1` CHECK (
  (
    (`CANTIDAD` >= 0)
    and (`PRECIO_UNITARIO` >= 0)
    and (`TOTAL` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_metodos_pago
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_metodos_pago` (
  `ID_PAGO` int NOT NULL AUTO_INCREMENT,
  `FORMA_PAGO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PAGO`),
  UNIQUE KEY `FORMA_PAGO` (`FORMA_PAGO`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_mp_puesto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_mp_puesto` (
  `ID_PUESTO` int NOT NULL AUTO_INCREMENT,
  `PUESTO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION_PUESTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PUESTO`),
  UNIQUE KEY `PUESTO` (`PUESTO`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_bitacora
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_bitacora` (
  `ID_BITACORA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `ID_OBJETO` int NOT NULL,
  `ACCION` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` text COLLATE utf8_unicode_ci NOT NULL,
  `INFORMACION_ANTERIOR` text COLLATE utf8_unicode_ci,
  `INFORMACION_ACTUAL` text COLLATE utf8_unicode_ci,
  `FECHA_BITACORA` datetime NOT NULL,
  PRIMARY KEY (`ID_BITACORA`),
  KEY `FK_BITA_USUA` (`ID_USUARIO`),
  KEY `FK_BITA_OBJE` (`ID_OBJETO`),
  CONSTRAINT `tbl_ms_bitacora_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_bitacora_ibfk_2` FOREIGN KEY (`ID_OBJETO`) REFERENCES `tbl_objetos` (`ID_OBJETO`)
) ENGINE = InnoDB AUTO_INCREMENT = 263 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_hist_contrasena
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_hist_contrasena` (
  `ID_HISTORIAL` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `CONTRASENA` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_HISTORIAL`),
  KEY `FK_HIST_CONTRA_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_hist_contrasena_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_parametros
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_parametros` (
  `ID_PARAMETRO` int NOT NULL AUTO_INCREMENT,
  `PARAMETRO` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ID_USUARIO` int NOT NULL,
  `VALOR` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `FECHA_MODIFICACION` datetime NOT NULL,
  PRIMARY KEY (`ID_PARAMETRO`),
  UNIQUE KEY `PARAMETRO` (`PARAMETRO`),
  KEY `FK_PARA_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_parametros_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_preguntas_usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_preguntas_usuario` (
  `ID_PREGUNTAS_USR` int NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA PREGUNTA DEL USUARIO EN EL SISTEMA',
  `ID_USUARIO` int NOT NULL COMMENT 'ID DEL USUARIO ',
  `PREGUNTA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'PREGUNTAS DEL USUARIO',
  `RESPUESTA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA RESPUESTA DE LAS PREGUNTAS DELUSUARIO ',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DE LA PREGUNTA ',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO LAS PREGUNTAS',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO LA PREGUNTA',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO LAS PREGUNTAS',
  PRIMARY KEY (`ID_PREGUNTAS_USR`),
  KEY `FK_PREG_USUARIO` (`ID_USUARIO`),
  KEY `FK_CREADOR_MS_PREGUNTAS` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_MS_PREGUNTAS` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`) ON DELETE CASCADE,
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_2` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_preguntas_usuario_ibfk_3` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_roles` (
  `ID_ROL` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ROL` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ROL QUE DESEMPEÑA EL USUARIO',
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL USUARIO',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL USUARIO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL ROL',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL ROL DEL USUARIO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL ROL',
  PRIMARY KEY (`ID_ROL`),
  UNIQUE KEY `ROL` (`ROL`),
  KEY `FK_CREADOR_ROL` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_ROL` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_ms_roles_ibfk_1` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_roles_ibfk_2` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ms_usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ms_usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL USUARIO ',
  `ID_ROL` int NOT NULL COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ID_PERSONA` int NOT NULL,
  `USUARIO` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR EL USUARIO',
  `CONTRASENA` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRASEÑA DEL USUARIO',
  `IMG_USUARIO` text COLLATE utf8_unicode_ci NOT NULL,
  `CORREO_ELECTRONICO` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CORREO ELECTRONICO DEL USUARIO',
  `FECHA_ULTIMA_CONEXION` datetime NOT NULL COMMENT 'FECHA EN QUE EL USUARIO SE CONECTO POR ULTIMA VEZ',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL USUARIO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL USUARIO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  USUARIO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL USUARIO',
  `PRIMER_INGRESO` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR EL PRIMER INGRESO DEL USUARIO',
  `FECHA_VENCIMIENTO` datetime NOT NULL COMMENT 'DESCRIBIR LA FECHA DE VENCIMIENTO PARA QUE EL USUARIO CAMBIE DE CONTRASEÑA SEGUN LO ESTABLECIDO EN PARAMETRO',
  `ESTADO` tinyint(1) NOT NULL COMMENT 'ESTADO 0 INACTIVO, 1 ACTIVO',
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `USUARIO` (`USUARIO`),
  UNIQUE KEY `CORREO_ELECTRONICO` (`CORREO_ELECTRONICO`),
  KEY `FK_PER_USUARIO` (`ID_PERSONA`),
  KEY `FK_CREADOR_ID_USUARIO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_USUARIO` (`MODIFICADO_POR`),
  KEY `FK_ROL_USUARIO` (`ID_ROL`),
  CONSTRAINT `tbl_ms_usuario_ibfk_1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `tbl_personas` (`ID_PERSONA`),
  CONSTRAINT `tbl_ms_usuario_ibfk_2` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_usuario_ibfk_3` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ms_usuario_ibfk_4` FOREIGN KEY (`ID_ROL`) REFERENCES `tbl_ms_roles` (`ID_ROL`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_objetos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_objetos` (
  `ID_OBJETO` int NOT NULL AUTO_INCREMENT COMMENT 'ID DEL OBJETO DEL USUARIO ',
  `OBJETOS` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION  DEL OBJETO',
  `TIPO_OBJETO` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION  DEL TIPO OBJETO',
  `DESCRIPCION` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR SI ES UNA INSERCION;ACTUALIZACION;ELIMINACION;NUEVO',
  `FECHA_CREACION` datetime NOT NULL COMMENT ' FECHA DE CREACION DEL OBJETO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL OBJETO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  OBJETO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL OBJETO',
  PRIMARY KEY (`ID_OBJETO`),
  UNIQUE KEY `OBJETOS` (`OBJETOS`),
  KEY `FK_CREADOR_OBJETO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_OBJETO` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_objetos_ibfk_1` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_objetos_ibfk_2` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_permiso
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_permiso` (
  `ID_ROL` int NOT NULL COMMENT 'ID DEL ROL QUE DESEMPEÑA EL USUARIO',
  `ID_OBJETO` int NOT NULL COMMENT 'ID DEL OBJETO DEL USUARIO ',
  `PERMISO_INSERCION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_ELIMINACION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_ACTUALIZACION` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `PERMISO_CONSULTAR` tinyint(1) NOT NULL COMMENT 'DESCRIBIR EL PERMISO QUE DESEA ',
  `FECHA_CREACION` datetime NOT NULL COMMENT 'FECHA DE CREACION DEL PERMISO',
  `CREADO_POR` int NOT NULL COMMENT 'QUIEN CREO EL PERMISO',
  `FECHA_MODIFICACION` datetime NOT NULL COMMENT 'FECHA QUE SE MODIFICO EL  PERMISO',
  `MODIFICADO_POR` int NOT NULL COMMENT 'QUIEN MODIFICO EL PERMISO',
  PRIMARY KEY (`ID_ROL`, `ID_OBJETO`),
  KEY `FK_PERM_OBJETOS` (`ID_OBJETO`),
  KEY `FK_CREADOR_PERMISO` (`CREADO_POR`),
  KEY `FK_MODIFICADOR_PERMISO` (`MODIFICADO_POR`),
  CONSTRAINT `tbl_permiso_ibfk_1` FOREIGN KEY (`ID_ROL`) REFERENCES `tbl_ms_roles` (`ID_ROL`),
  CONSTRAINT `tbl_permiso_ibfk_2` FOREIGN KEY (`ID_OBJETO`) REFERENCES `tbl_objetos` (`ID_OBJETO`),
  CONSTRAINT `tbl_permiso_ibfk_3` FOREIGN KEY (`CREADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_permiso_ibfk_4` FOREIGN KEY (`MODIFICADO_POR`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_personas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_personas` (
  `ID_PERSONA` int NOT NULL AUTO_INCREMENT,
  `ID_PUESTO` int NOT NULL,
  `NOMBRE_PERSONA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDO_PERSONA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `GENERO` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `RTN` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FEC_REGIS_PERSONA` datetime NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  `SUELDO` decimal(10, 2) NOT NULL COMMENT 'EL SUELDO ES DEL PUESTO O PERSONA',
  PRIMARY KEY (`ID_PERSONA`),
  UNIQUE KEY `RTN` (`RTN`),
  KEY `FK_PER_PUESTO` (`ID_PUESTO`),
  CONSTRAINT `tbl_personas_ibfk_1` FOREIGN KEY (`ID_PUESTO`) REFERENCES `tbl_mp_puesto` (`ID_PUESTO`),
  CONSTRAINT `tbl_personas_chk_1` CHECK ((`SUELDO` >= 0))
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_productos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_productos` (
  `ID_PRODUCTO` int NOT NULL AUTO_INCREMENT,
  `ID_PROVEEDOR` int NOT NULL,
  `NOMBRE_PRODUCTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `MARCA_PRODUCTO` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION_PRODUCTO` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'MODELO, TAMAÑO, COLOR, ETC...',
  `ID_CATEGORIA` int NOT NULL,
  `ESTADO` tinyint(1) NOT NULL,
  `IMG_PRODUCTO` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PRODUCTO`),
  UNIQUE KEY `ID_PROVEEDOR` (
  `ID_PROVEEDOR`,
  `NOMBRE_PRODUCTO`,
  `MARCA_PRODUCTO`
  ),
  KEY `FK_PROD_CATEGORIAS` (`ID_CATEGORIA`),
  CONSTRAINT `tbl_productos_ibfk_1` FOREIGN KEY (`ID_PROVEEDOR`) REFERENCES `tbl_proveedores` (`ID_PROVEEDOR`) ON DELETE CASCADE,
  CONSTRAINT `tbl_productos_ibfk_2` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `tbl_categorias` (`ID_CATEGORIA`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_proveedores
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_proveedores` (
  `ID_PROVEEDOR` int NOT NULL AUTO_INCREMENT,
  `RTN` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRE_PROVEEDOR` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO_PROVEEDOR` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CORREO_PROVEEDOR` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_PROVEEDOR`),
  UNIQUE KEY `RTN` (`RTN`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_ventas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_ventas` (
  `ID_VENTA` int NOT NULL AUTO_INCREMENT COMMENT 'ID DE LAS VENTAS',
  `ID_PAGO` int NOT NULL COMMENT 'ID DEL PAGO DE LA VENTA',
  `ID_USUARIO` int NOT NULL COMMENT 'ID DEL USUARIO',
  `CANTIDAD_VENTA` int NOT NULL COMMENT 'DESCRIPCION DE LA CANTIDAD DE VENTAS (considerar la necesidad de este campo)',
  `FECHA_VENTA` datetime NOT NULL COMMENT 'FECHA REALIZADA LA VENTA',
  `ID_CLIENTE` int NOT NULL COMMENT 'ID DEL CLIENTE',
  `ISV` decimal(10, 2) NOT NULL COMMENT 'DESCRIPCION DEL IMPUESTO',
  `TOTAL_VENTA` decimal(10, 2) NOT NULL COMMENT 'DESCRIPCION DEL TOTAL DE LA VENTA',
  `DESCRIPCION_VENTA` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIBIR  LOS ARTICULOS DE LA VENTA REALIZADA U OBSERVACIONES',
  `ESTADO` tinyint(1) NOT NULL COMMENT 'IDENTIFICA SI UNA VENTA YA FUE FINALIZADA',
  `COMISION_EMPLEADO` decimal(10, 2) NOT NULL COMMENT 'COMISION DEL EMPLEADO EN BASE A LA VENTA',
  PRIMARY KEY (`ID_VENTA`),
  KEY `FK_VENTA_PAGO` (`ID_PAGO`),
  KEY `FK_VENTA_USUARIO` (`ID_USUARIO`),
  KEY `FK_VENTA_CLIENTE` (`ID_CLIENTE`),
  CONSTRAINT `tbl_ventas_ibfk_1` FOREIGN KEY (`ID_PAGO`) REFERENCES `tbl_metodos_pago` (`ID_PAGO`),
  CONSTRAINT `tbl_ventas_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tbl_ms_usuario` (`ID_USUARIO`),
  CONSTRAINT `tbl_ventas_ibfk_3` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tbl_clientes` (`ID_CLIENTE`),
  CONSTRAINT `tbl_ventas_chk_1` CHECK (
  (
    (`CANTIDAD_VENTA` >= 0)
    and (`TOTAL_VENTA` >= 0)
    and (`ISV` >= 0)
    and (`COMISION_EMPLEADO` >= 0)
  )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_categorias
# ------------------------------------------------------------

INSERT INTO
  `tbl_categorias` (`ID_CATEGORIA`, `CATEGORIA`, `DESCRIPCION`)
VALUES
  (1, 'Bombillos', 'variedad de focos y lamparas');
INSERT INTO
  `tbl_categorias` (`ID_CATEGORIA`, `CATEGORIA`, `DESCRIPCION`)
VALUES
  (2, 'Cables', 'Cables de variedad THWN y simples');
INSERT INTO
  `tbl_categorias` (`ID_CATEGORIA`, `CATEGORIA`, `DESCRIPCION`)
VALUES
  (
    3,
    'Hogar',
    'Variedad de tomas, piñas y protectores'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_clientes
# ------------------------------------------------------------

INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    1,
    'Juan Perez',
    '08017847756123',
    'Col. Palmira',
    '9984-5741'
  );
INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    2,
    'Maria Teresa',
    '08017843656473',
    'Col. Mira montes',
    '9984-5742'
  );
INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    3,
    'Jose Monguia',
    '08017845619741',
    'Col. Kennedy',
    '9984-5743'
  );
INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    4,
    'Fabricio Hernandez',
    '0801741456123',
    'Col. Palmira',
    '9984-5744'
  );
INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    5,
    'Kenneth Avila',
    '08017123650123',
    'Col. Cerro Grande',
    '9984-5745'
  );
INSERT INTO
  `tbl_clientes` (
    `ID_CLIENTE`,
    `NOMBRE_CLIENTE`,
    `RTN`,
    `DIRECCION_CLIENTE`,
    `TELEFONO_CLIENTE`
  )
VALUES
  (
    6,
    'Ester Lopez',
    '08017845677485',
    'Barrio la Hoya',
    '9984-5746'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_compras
# ------------------------------------------------------------

INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    'NINGUNA',
    '2022-04-17 10:39:03',
    2658.98,
    398.85,
    1
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    2,
    1,
    1,
    1,
    'NINGUNA',
    '2022-04-17 10:39:03',
    143.60,
    21.54,
    1
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    3,
    1,
    1,
    2,
    'NINGUNA',
    '2022-04-17 10:39:03',
    974.25,
    146.14,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    4,
    1,
    1,
    3,
    'NINGUNA',
    '2022-04-17 10:39:03',
    627.00,
    94.05,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    5,
    1,
    1,
    3,
    'NINGUNA',
    '2022-04-17 10:39:03',
    450.00,
    67.50,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    6,
    1,
    1,
    2,
    'NINGUNA',
    '2022-04-17 10:39:03',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    7,
    1,
    1,
    1,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    8,
    1,
    1,
    1,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    9,
    1,
    1,
    2,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    10,
    1,
    1,
    3,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    11,
    1,
    1,
    3,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );
INSERT INTO
  `tbl_compras` (
    `ID_COMPRA`,
    `ID_USUARIO`,
    `ID_PAGO`,
    `ID_PROVEEDOR`,
    `OBSERVACION_COMPRA`,
    `FECHA_COMPRA`,
    `TOTAL_COMPRA`,
    `ISV_COMPRA`,
    `ESTADO`
  )
VALUES
  (
    12,
    1,
    1,
    2,
    'NINGUNA',
    '2022-04-17 10:39:33',
    0.00,
    0.00,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_detalles_compra
# ------------------------------------------------------------

INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (1, 1, 1, 'NINGUNA', 19.23, 80.00, 1538.40);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (2, 2, 1, 'NINGUNA', 16.23, 46.00, 746.58);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (3, 3, 1, 'NINGUNA', 13.40, 10.00, 134.00);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (4, 4, 1, 'NINGUNA', 16.00, 15.00, 240.00);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (5, 2, 2, 'NINGUNA', 14.36, 10.00, 143.60);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (6, 3, 3, 'NINGUNA', 21.65, 45.00, 974.25);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (7, 4, 4, 'NINGUNA', 12.54, 50.00, 627.00);
INSERT INTO
  `tbl_detalles_compra` (
    `ID_DETALLE_COMPRA`,
    `ID_PRODUCTO`,
    `ID_COMPRA`,
    `DESCRIP_COMPRA`,
    `PRECIO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`
  )
VALUES
  (8, 5, 5, 'NINGUNA', 15.00, 30.00, 450.00);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_detalles_venta
# ------------------------------------------------------------

INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (1, 1, 1, 28.50, 1.00, 28.50, 32.78);
INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (2, 2, 1, 26.25, 1.00, 26.25, 30.19);
INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (3, 3, 1, 24.30, 1.00, 24.30, 27.95);
INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (4, 1, 2, 28.50, 1.00, 28.50, 32.78);
INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (5, 3, 3, 24.30, 1.00, 24.30, 27.95);
INSERT INTO
  `tbl_detalles_venta` (
    `ID_DETALLE_VENTA`,
    `ID_PRODUCTO`,
    `ID_VENTA`,
    `MONTO_UNITARIO`,
    `CANTIDAD_PRODUCTO`,
    `SUB_TOTAL`,
    `TOTAL`
  )
VALUES
  (6, 4, 4, 23.40, 1.00, 23.40, 26.91);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_informacion
# ------------------------------------------------------------

INSERT INTO
  `tbl_informacion` (
    `ID_INFO`,
    `TITULO`,
    `TIPO`,
    `ENLACE`,
    `FECHA_CREACION`,
    `ESTADO`
  )
VALUES
  (
    2,
    'PRUEBA API',
    'google.com',
    '1',
    '2022-04-18 19:00:20',
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_inventario
# ------------------------------------------------------------

INSERT INTO
  `tbl_inventario` (
    `ID_INVENTARIO`,
    `ID_PRODUCTO`,
    `EXISTENCIA`,
    `PRECIO_VENTA`,
    `PRECIO_UNITARIO`,
    `METODO`,
    `ESTADO`
  )
VALUES
  (1, 1, 78.00, 28.50, 19.23, 0, 1);
INSERT INTO
  `tbl_inventario` (
    `ID_INVENTARIO`,
    `ID_PRODUCTO`,
    `EXISTENCIA`,
    `PRECIO_VENTA`,
    `PRECIO_UNITARIO`,
    `METODO`,
    `ESTADO`
  )
VALUES
  (2, 2, 55.00, 26.25, 15.90, 0, 1);
INSERT INTO
  `tbl_inventario` (
    `ID_INVENTARIO`,
    `ID_PRODUCTO`,
    `EXISTENCIA`,
    `PRECIO_VENTA`,
    `PRECIO_UNITARIO`,
    `METODO`,
    `ESTADO`
  )
VALUES
  (3, 3, 9.00, 24.30, 13.40, 0, 1);
INSERT INTO
  `tbl_inventario` (
    `ID_INVENTARIO`,
    `ID_PRODUCTO`,
    `EXISTENCIA`,
    `PRECIO_VENTA`,
    `PRECIO_UNITARIO`,
    `METODO`,
    `ESTADO`
  )
VALUES
  (4, 4, 15.00, 23.40, 16.00, 0, 1);
INSERT INTO
  `tbl_inventario` (
    `ID_INVENTARIO`,
    `ID_PRODUCTO`,
    `EXISTENCIA`,
    `PRECIO_VENTA`,
    `PRECIO_UNITARIO`,
    `METODO`,
    `ESTADO`
  )
VALUES
  (5, 5, 0.00, 29.50, 0.00, 0, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_kardex
# ------------------------------------------------------------

INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    1,
    1,
    NULL,
    80.00,
    19.23,
    1538.40,
    0,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    2,
    2,
    NULL,
    46.00,
    16.23,
    746.58,
    0,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    3,
    3,
    NULL,
    10.00,
    13.40,
    134.00,
    0,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    4,
    4,
    NULL,
    15.00,
    16.00,
    240.00,
    0,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    8,
    2,
    NULL,
    10.00,
    14.36,
    143.60,
    0,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    9,
    1,
    NULL,
    1.00,
    19.23,
    19.23,
    1,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    10,
    2,
    NULL,
    1.00,
    15.90,
    15.90,
    1,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    11,
    3,
    NULL,
    1.00,
    13.40,
    13.40,
    1,
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_kardex` (
    `ID_KARDEX`,
    `ID_INVENTARIO`,
    `FECHA_VENCI_PRODUCTO`,
    `CANTIDAD`,
    `PRECIO_UNITARIO`,
    `TOTAL`,
    `TIPO_MOVIMIENTO`,
    `FECHA_MOVIMIENTO`
  )
VALUES
  (
    12,
    1,
    NULL,
    1.00,
    19.23,
    19.23,
    1,
    '2022-04-17 10:39:03'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_metodos_pago
# ------------------------------------------------------------

INSERT INTO
  `tbl_metodos_pago` (`ID_PAGO`, `FORMA_PAGO`, `DESCRIPCION`)
VALUES
  (1, 'Efectivo', 'Pago unitario');
INSERT INTO
  `tbl_metodos_pago` (`ID_PAGO`, `FORMA_PAGO`, `DESCRIPCION`)
VALUES
  (2, 'Credito', 'control de pagos segun acuerdo');
INSERT INTO
  `tbl_metodos_pago` (`ID_PAGO`, `FORMA_PAGO`, `DESCRIPCION`)
VALUES
  (3, 'Tarjeta de credito', 'Visa o MasterCard');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_mp_puesto
# ------------------------------------------------------------

INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    1,
    'Super Administrador',
    'Administrador de sistemas'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (2, 'Super DEAFAULT', 'DEFAULT');
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (3, 'Gerente general', 'Gerente general de tienda');
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    4,
    'Ejecutivo de ventas',
    'Encargado de concretar las ventas y cotizaciones con los clientes'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    5,
    'Ejecutivo de compra',
    'Analizis de las mejores ofertas de productos y compras del mismo'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    6,
    'Encargado de bodega',
    'Control general de la entrada y salida de material'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    7,
    'Atención al cliente',
    'Encargado de resolver dudas y reclamos de los clientes'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    8,
    'Mantenimiento',
    'Personal de reparación, aseo y vigilancia.'
  );
INSERT INTO
  `tbl_mp_puesto` (`ID_PUESTO`, `PUESTO`, `DESCRIPCION_PUESTO`)
VALUES
  (
    9,
    'Administrador',
    'Administrador de respaldo del sistema '
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_bitacora
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    1,
    1,
    1,
    'INSERT',
    'Se creo una nueva categoría de productos.',
    NULL,
    'Se creó la categoría de productos: Bombillos con la descripción: variedad de focos y lamparas',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    2,
    1,
    1,
    'INSERT',
    'Se creo una nueva categoría de productos.',
    NULL,
    'Se creó la categoría de productos: Cables con la descripción: Cables de variedad THWN y simples',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    3,
    1,
    1,
    'INSERT',
    'Se creo una nueva categoría de productos.',
    NULL,
    'Se creó la categoría de productos: Hogar con la descripción: Variedad de tomas, piñas y protectores',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    4,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Juan Perez; RTN: 08017847756123, CONTACTO: 9984-5741, Col. Palmira',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    5,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Maria Teresa; RTN: 08017843656473, CONTACTO: 9984-5742, Col. Mira montes',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    6,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Jose Monguia; RTN: 08017845619741, CONTACTO: 9984-5743, Col. Kennedy',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    7,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Fabricio Hernandez; RTN: 0801741456123, CONTACTO: 9984-5744, Col. Palmira',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    8,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Kenneth Avila; RTN: 08017123650123, CONTACTO: 9984-5745, Col. Cerro Grande',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    9,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo cliente.',
    NULL,
    'Se creó un nuevo cliente con los datos: Ester Lopez; RTN: 08017845677485, CONTACTO: 9984-5746, Barrio la Hoya',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    10,
    1,
    1,
    'INSERT',
    'Se han registrado un nuevo método de pago.',
    NULL,
    'Se creó un método de pago: Efectivo, descripción: Pago unitario',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    11,
    1,
    1,
    'INSERT',
    'Se han registrado un nuevo método de pago.',
    NULL,
    'Se creó un método de pago: Credito, descripción: control de pagos segun acuerdo',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    12,
    1,
    1,
    'INSERT',
    'Se han registrado un nuevo método de pago.',
    NULL,
    'Se creó un método de pago: Tarjeta de credito, descripción: Visa o MasterCard',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    13,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Gerente general, nuevo valor: Gerente general de tienda',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    14,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Ejecutivo de ventas, nuevo valor: Encargado de concretar las ventas y cotizaciones con los clientes',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    15,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Ejecutivo de compra, nuevo valor: Analizis de las mejores ofertas de productos y compras del mismo',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    16,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Encargado de bodega, nuevo valor: Control general de la entrada y salida de material',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    17,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Atención al cliente, nuevo valor: Encargado de resolver dudas y reclamos de los clientes',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    18,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Mantenimiento, nuevo valor: Personal de reparación, aseo y vigilancia.',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    19,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: Administracion; Control, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    20,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: Compras; Gestion, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    21,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: Ventas; Gestion, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    22,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: Inventario; Control, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    23,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: Usuarios; Administración, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    24,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: Admin, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    25,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: Analista de compras, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    26,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: Cajero, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    27,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: Gerente de inventario, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    28,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: Control de productos, con descripción: Ninguna, ID relacional: 0',
    '2022-04-17 10:39:02'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    29,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo proveedor.',
    NULL,
    'Se creó un nuevo proveedor con los datos: LUMEX; RTN: 0102147484451, CONTACTO: 9915-2020, lumex@correo.com',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    30,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo proveedor.',
    NULL,
    'Se creó un nuevo proveedor con los datos: START; RTN: 0102147478964, CONTACTO: 9915-2021, start@correo.com',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    31,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo proveedor.',
    NULL,
    'Se creó un nuevo proveedor con los datos: LINEAS; RTN: 0102174441578, CONTACTO: 9915-2022, lineas@correo.com',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    32,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo proveedor.',
    NULL,
    'Se creó un nuevo proveedor con los datos: MATER; RTN: 0801114578513, CONTACTO: 9915-2020, mater@correo.com',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    33,
    1,
    1,
    'INSERT',
    'Se ha registrado un nuevo proveedor.',
    NULL,
    'Se creó un nuevo proveedor con los datos: SERVLUX; RTN: 0102777458711, CONTACTO: 9915-2020, servlux@correo.com',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    34,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: DEFAULT, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    35,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: Administracion, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    36,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: Compras, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    37,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: Ventas, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    38,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: Inventario, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    39,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: SuperAdmin dentro del objeto: Usuarios, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    40,
    1,
    1,
    'INSERT',
    'Se ingreso un nuevo producto al catálogo.',
    NULL,
    'Se agrego el producto: Foco 1, LUX, del proveedor: LUMEX con la descripción: bajas potencias para zonas amplias',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    41,
    1,
    1,
    'INSERT',
    'Se creo una sección de inventario para un nuevo producto.',
    NULL,
    'Se agrego al inventario el producto: Foco 1, ID:1, con valor y existencia de: 0.00; 0.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    42,
    1,
    1,
    'INSERT',
    'Se ingreso un nuevo producto al catálogo.',
    NULL,
    'Se agrego el producto: Foco 2, TERX, del proveedor: START con la descripción: Luz de interiores',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    43,
    1,
    1,
    'INSERT',
    'Se creo una sección de inventario para un nuevo producto.',
    NULL,
    'Se agrego al inventario el producto: Foco 2, ID:2, con valor y existencia de: 0.00; 0.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    44,
    1,
    1,
    'INSERT',
    'Se ingreso un nuevo producto al catálogo.',
    NULL,
    'Se agrego el producto: Foco 3, ILUMINA, del proveedor: LINEAS con la descripción: Ideal para exteriores',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    45,
    1,
    1,
    'INSERT',
    'Se creo una sección de inventario para un nuevo producto.',
    NULL,
    'Se agrego al inventario el producto: Foco 3, ID:3, con valor y existencia de: 0.00; 0.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    46,
    1,
    1,
    'INSERT',
    'Se ingreso un nuevo producto al catálogo.',
    NULL,
    'Se agrego el producto: Foco 4, SUR, del proveedor: START con la descripción: compuesto',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    47,
    1,
    1,
    'INSERT',
    'Se creo una sección de inventario para un nuevo producto.',
    NULL,
    'Se agrego al inventario el producto: Foco 4, ID:4, con valor y existencia de: 0.00; 0.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    48,
    1,
    1,
    'INSERT',
    'Se ingreso un nuevo producto al catálogo.',
    NULL,
    'Se agrego el producto: Foco 5, CLEND, del proveedor: LUMEX con la descripción: Sin detalles',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    49,
    1,
    1,
    'INSERT',
    'Se creo una sección de inventario para un nuevo producto.',
    NULL,
    'Se agrego al inventario el producto: Foco 5, ID:5, con valor y existencia de: 0.00; 0.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    50,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LUMEX; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    51,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LUMEX; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    52,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: START; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    53,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LINEAS; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    54,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LINEAS; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    55,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: START; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    56,
    1,
    1,
    'INSERT',
    'Se registro una compra de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 1, del producto: Foco 1, con los sigientes datos cantidad, precio unitario, total: 80.00, 19.23, 1538.40',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    57,
    1,
    1,
    'INSERT',
    'Se registro una compra de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 2, del producto: Foco 2, con los sigientes datos cantidad, precio unitario, total: 46.00, 16.23, 746.58',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    58,
    1,
    1,
    'INSERT',
    'Se registro una compra de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 3, del producto: Foco 3, con los sigientes datos cantidad, precio unitario, total: 10.00, 13.40, 134.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    59,
    1,
    1,
    'INSERT',
    'Se registro una compra de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 4, del producto: Foco 4, con los sigientes datos cantidad, precio unitario, total: 15.00, 16.00, 240.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    60,
    1,
    1,
    'UPDATE',
    'Se cambió el precio unitario del producto en inventario.',
    'Precio promedio ponderado anterior: 0.00',
    'El producto: Foco 1, ID: 1, cambió su precio promedio ponderado a 19.23',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    61,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 0.00',
    'El producto: Foco 1, ID: 1, cambió su existencia a 80.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    62,
    1,
    1,
    'UPDATE',
    'Se cambió el precio unitario del producto en inventario.',
    'Precio promedio ponderado anterior: 0.00',
    'El producto: Foco 2, ID: 2, cambió su precio promedio ponderado a 16.23',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    63,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 0.00',
    'El producto: Foco 2, ID: 2, cambió su existencia a 46.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    64,
    1,
    1,
    'UPDATE',
    'Se cambió el precio unitario del producto en inventario.',
    'Precio promedio ponderado anterior: 0.00',
    'El producto: Foco 3, ID: 3, cambió su precio promedio ponderado a 13.40',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    65,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 0.00',
    'El producto: Foco 3, ID: 3, cambió su existencia a 10.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    66,
    1,
    1,
    'UPDATE',
    'Se cambió el precio unitario del producto en inventario.',
    'Precio promedio ponderado anterior: 0.00',
    'El producto: Foco 4, ID: 4, cambió su precio promedio ponderado a 16.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    67,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 0.00',
    'El producto: Foco 4, ID: 4, cambió su existencia a 15.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    68,
    1,
    1,
    'UPDATE',
    'Finalización de compra.',
    NULL,
    'Se concreto la compra con el proveedor: LUMEX; TOTAL: 2658.98, ISV: 398.85, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    69,
    1,
    1,
    'INSERT',
    'Se registro una compra de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 2, del producto: Foco 2, con los sigientes datos cantidad, precio unitario, total: 10.00, 14.36, 143.60',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    70,
    1,
    1,
    'UPDATE',
    'Se cambió el precio unitario del producto en inventario.',
    'Precio promedio ponderado anterior: 16.23',
    'El producto: Foco 2, ID: 2, cambió su precio promedio ponderado a 15.90',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    71,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 46.00',
    'El producto: Foco 2, ID: 2, cambió su existencia a 56.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    72,
    1,
    1,
    'UPDATE',
    'Finalización de compra.',
    NULL,
    'Se concreto la compra con el proveedor: LUMEX; TOTAL: 143.60, ISV: 21.54, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    73,
    1,
    1,
    'UPDATE',
    'Se cambió el estado del producto en inventario.',
    NULL,
    'El producto: Foco 1, ID: 1, cambió su estado a habilitado',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    74,
    1,
    1,
    'UPDATE',
    'Se cambió el precio de venta del producto en inventario.',
    'Precio anterior: 0.00',
    'El producto: Foco 1, ID: 1, cambió su precio de venta a 28.50',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    75,
    1,
    1,
    'UPDATE',
    'Se cambió el estado del producto en inventario.',
    NULL,
    'El producto: Foco 2, ID: 2, cambió su estado a habilitado',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    76,
    1,
    1,
    'UPDATE',
    'Se cambió el precio de venta del producto en inventario.',
    'Precio anterior: 0.00',
    'El producto: Foco 2, ID: 2, cambió su precio de venta a 26.25',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    77,
    1,
    1,
    'UPDATE',
    'Se cambió el estado del producto en inventario.',
    NULL,
    'El producto: Foco 3, ID: 3, cambió su estado a habilitado',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    78,
    1,
    1,
    'UPDATE',
    'Se cambió el precio de venta del producto en inventario.',
    'Precio anterior: 0.00',
    'El producto: Foco 3, ID: 3, cambió su precio de venta a 24.30',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    79,
    1,
    1,
    'UPDATE',
    'Se cambió el estado del producto en inventario.',
    NULL,
    'El producto: Foco 4, ID: 4, cambió su estado a habilitado',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    80,
    1,
    1,
    'UPDATE',
    'Se cambió el precio de venta del producto en inventario.',
    'Precio anterior: 0.00',
    'El producto: Foco 4, ID: 4, cambió su precio de venta a 23.40',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    81,
    1,
    1,
    'UPDATE',
    'Se cambió el estado del producto en inventario.',
    NULL,
    'El producto: Foco 5, ID: 5, cambió su estado a habilitado',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    82,
    1,
    1,
    'UPDATE',
    'Se cambió el precio de venta del producto en inventario.',
    'Precio anterior: 0.00',
    'El producto: Foco 5, ID: 5, cambió su precio de venta a 29.50',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    83,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Maria Teresa; ID: 2, TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    84,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Juan Perez; ID: 1, TOTAL: 0.00, ISV: 0.00, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    85,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Jose Monguia; ID: 3, TOTAL: 0.00, ISV: 0.00, PAGO: Tarjeta de credito Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    86,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Ester Lopez; ID: 6, TOTAL: 0.00, ISV: 0.00, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    87,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Maria Teresa; ID: 2, TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Maria Teresa; ID: 2, TOTAL: 28.50, ISV: 4.28, PAGO: Efectivo, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    88,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Maria Teresa; ID: 2, TOTAL: 28.50, ISV: 4.28, PAGO: Efectivo, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Maria Teresa; ID: 2, TOTAL: 54.75, ISV: 8.22, PAGO: Efectivo, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    89,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Maria Teresa; ID: 2, TOTAL: 54.75, ISV: 8.22, PAGO: Efectivo, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Maria Teresa; ID: 2, TOTAL: 79.05, ISV: 11.87, PAGO: Efectivo, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    90,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Juan Perez; ID: 1, TOTAL: 0.00, ISV: 0.00, PAGO: Credito, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Juan Perez; ID: 1, TOTAL: 28.50, ISV: 4.28, PAGO: Credito, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    91,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Jose Monguia; ID: 3, TOTAL: 0.00, ISV: 0.00, PAGO: Tarjeta de credito, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Jose Monguia; ID: 3, TOTAL: 24.30, ISV: 3.65, PAGO: Tarjeta de credito, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    92,
    1,
    1,
    'UPDATE',
    'Se actualizó la información de la venta.',
    'Información anterior: Ester Lopez; ID: 6, TOTAL: 0.00, ISV: 0.00, PAGO: Credito, Descripción: NINGUNA',
    'Se concreto la venta con el cliente: Ester Lopez; ID: 6, TOTAL: 23.40, ISV: 3.51, PAGO: Credito, Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    93,
    1,
    1,
    'INSERT',
    'Se registro una venta de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 1, del producto: Foco 1, con los sigientes datos cantidad, precio unitario, total: 1.00, 19.23, 19.23',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    94,
    1,
    1,
    'INSERT',
    'Se registro una venta de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 2, del producto: Foco 2, con los sigientes datos cantidad, precio unitario, total: 1.00, 15.90, 15.90',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    95,
    1,
    1,
    'INSERT',
    'Se registro una venta de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 3, del producto: Foco 3, con los sigientes datos cantidad, precio unitario, total: 1.00, 13.40, 13.40',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    96,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 80.00',
    'El producto: Foco 1, ID: 1, cambió su existencia a 79.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    97,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 56.00',
    'El producto: Foco 2, ID: 2, cambió su existencia a 55.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    98,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 10.00',
    'El producto: Foco 3, ID: 3, cambió su existencia a 9.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    99,
    1,
    1,
    'UPDATE',
    'Finalización de venta.',
    NULL,
    'Se concreto la venta con el cliente: Maria Teresa; ID: 2, TOTAL: 79.05, ISV: 11.86, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    100,
    1,
    1,
    'UPDATE',
    'Comisión por ventas.',
    NULL,
    'Se asignó una comisión al usuario con ID: 1, Comisión: 0.00, por cencepto de la venta número: 1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    101,
    1,
    1,
    'UPDATE',
    'Finalización de venta.',
    NULL,
    'Se concreto la venta con el cliente: Maria Teresa; ID: 2, TOTAL: 79.05, ISV: 11.86, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    102,
    1,
    1,
    'UPDATE',
    'Comisión por ventas.',
    NULL,
    'Se asignó una comisión al usuario con ID: 1, Comisión: 3.95, por cencepto de la venta número: 1',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    103,
    1,
    1,
    'INSERT',
    'Se registro una venta de productos.',
    NULL,
    'Se agrego un kardex para la tarjeta de inventario: 1, del producto: Foco 1, con los sigientes datos cantidad, precio unitario, total: 1.00, 19.23, 19.23',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    104,
    1,
    1,
    'UPDATE',
    'Se registro un movimiento en la existencia de un producto.',
    'Cantidad anterior: 79.00',
    'El producto: Foco 1, ID: 1, cambió su existencia a 78.00',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    105,
    1,
    1,
    'UPDATE',
    'Finalización de venta.',
    NULL,
    'Se concreto la venta con el cliente: Juan Perez; ID: 1, TOTAL: 28.50, ISV: 4.28, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    106,
    1,
    1,
    'UPDATE',
    'Comisión por ventas.',
    NULL,
    'Se asignó una comisión al usuario con ID: 1, Comisión: 0.00, por cencepto de la venta número: 2',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    107,
    1,
    1,
    'UPDATE',
    'Finalización de venta.',
    NULL,
    'Se concreto la venta con el cliente: Juan Perez; ID: 1, TOTAL: 28.50, ISV: 4.28, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    108,
    1,
    1,
    'UPDATE',
    'Comisión por ventas.',
    NULL,
    'Se asignó una comisión al usuario con ID: 1, Comisión: 1.43, por cencepto de la venta número: 2',
    '2022-04-17 10:39:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    109,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LUMEX; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    110,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LUMEX; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    111,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: START; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    112,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LINEAS; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    113,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: LINEAS; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    114,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva compra.',
    NULL,
    'Se creó un encabezado de compra con el proveedor: START; TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:33'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    115,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Maria Teresa; ID: 2, TOTAL: 0.00, ISV: 0.00, PAGO: Efectivo Descripción: NINGUNA',
    '2022-04-17 10:39:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    116,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Juan Perez; ID: 1, TOTAL: 0.00, ISV: 0.00, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    117,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Jose Monguia; ID: 3, TOTAL: 0.00, ISV: 0.00, PAGO: Tarjeta de credito Descripción: NINGUNA',
    '2022-04-17 10:39:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    118,
    1,
    1,
    'INSERT',
    'Se ha comenzado el proceso de una nueva venta.',
    NULL,
    'Se creó un encabezado de venta con el cliente: Ester Lopez; ID: 6, TOTAL: 0.00, ISV: 0.00, PAGO: Credito Descripción: NINGUNA',
    '2022-04-17 10:39:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    119,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-17 20:19:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    120,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-17 20:19:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    121,
    1,
    1,
    'INSERT',
    'Se agrego una forma de recuperación de contraseña',
    NULL,
    'INFORMACION: El usuario 1 ha registrado una pregunta y respuesta de seguridad: Mi perro se llama, con respuesta encriptada por seguridad.',
    '2022-04-18 05:04:09'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    122,
    1,
    1,
    'CREATE',
    'Se creó un nuevo puesto.',
    NULL,
    'Se creó un nuevo puesto de trabajo: Administrador, nuevo valor: Administrador del sistema ',
    '2022-04-18 14:46:19'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    123,
    1,
    1,
    'UPDATE',
    'Se actualizó un puesto.',
    'Datos anteriores: Administrador, nuevo valor: Administrador del sistema ',
    'Se actualizó el puesto de trabajo: Administrador, nuevo valor: Administrador de respaldo del sistema ',
    '2022-04-18 14:50:41'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    124,
    1,
    1,
    'UPDATE',
    'Se actualizó un puesto.',
    'Datos anteriores: Administrador, nuevo valor: Administrador de respaldo del sistema ',
    'Se actualizó el puesto de trabajo: Administrador, nuevo valor: Administrador de respaldo del sistema ',
    '2022-04-18 14:50:44'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    125,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEFAULT; PRUEBA, con descripción: DEFAULT',
    'Nuevos datos del objeto: MODULE USERS MODIFICADO; MANAGE USERS, con descripción: ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS, ID relacional: 1',
    '2022-04-19 21:15:12'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    126,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: MODULE USERS MODIFICADO; MANAGE USERS, con descripción: ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS',
    NULL,
    '2022-04-19 21:57:05'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    127,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: ; DEFAULT, con descripción: DEFAULT',
    NULL,
    '2022-04-19 22:17:06'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    128,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: ; DEFAULT, con descripción: DEFAULT',
    NULL,
    '2022-04-19 22:18:36'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    129,
    1,
    1,
    'UPDATE',
    'Se actualizó un rol.',
    'Antiguos datos del rol: Cajero, con descripción: Ninguna',
    'Nuevos datos del rol: COMPRAS 2, con descripción: ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO, ID relacional: 5',
    '2022-04-20 00:22:00'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    130,
    1,
    1,
    'UPDATE',
    'Se actualizó un rol.',
    'Antiguos datos del rol: COMPRAS 2, con descripción: ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO',
    'Nuevos datos del rol: COMPRAS 2, con descripción: ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO, ID relacional: 5',
    '2022-04-20 00:23:44'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    131,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: host_mail, valor: smtp.gmail.com',
    'Se actualizó con la información: host_mail, nuevo valor: smtp.gmail.com',
    '2022-04-20 06:15:39'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    132,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: user_mail, valor: maelconservices',
    'Se actualizó con la información: user_mail, nuevo valor: maelconservices',
    '2022-04-20 06:15:39'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    133,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: pass_mail, valor: hbxnssxpesbwxkbr',
    'Se actualizó con la información: pass_mail, nuevo valor: hbxnssxpesbwxkbr',
    '2022-04-20 06:15:39'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    134,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: service_mail, valor: gmail',
    'Se actualizó con la información: service_mail, nuevo valor: gm',
    '2022-04-20 06:15:39'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    135,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: port_mail, valor: 465',
    'Se actualizó con la información: port_mail, nuevo valor: 465',
    '2022-04-20 06:15:39'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    136,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: service_mail, valor: gm',
    'Se actualizó con la información: service_mail, nuevo valor: gmail.com',
    '2022-04-20 06:20:14'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    137,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: port_mail, valor: 465',
    'Se actualizó con la información: port_mail, nuevo valor: 4566',
    '2022-04-20 06:20:14'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    138,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: host_mail, valor: smtp.gmail.com',
    'Se actualizó con la información: host_mail, nuevo valor: smtp.gmail.com',
    '2022-04-20 06:21:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    139,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: user_mail, valor: maelconservices',
    'Se actualizó con la información: user_mail, nuevo valor: maelconservices',
    '2022-04-20 06:21:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    140,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: pass_mail, valor: hbxnssxpesbwxkbr',
    'Se actualizó con la información: pass_mail, nuevo valor: hbxnssxpesbwxkbr',
    '2022-04-20 06:21:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    141,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: service_mail, valor: gmail.com',
    'Se actualizó con la información: service_mail, nuevo valor: gmail',
    '2022-04-20 06:21:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    142,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: port_mail, valor: 4566',
    'Se actualizó con la información: port_mail, nuevo valor: 456',
    '2022-04-20 06:21:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    143,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: host_mail, valor: smtp.gmail.com',
    'Se actualizó con la información: host_mail, nuevo valor: smtp.gmail.com',
    '2022-04-20 06:22:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    144,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: user_mail, valor: maelconservices',
    'Se actualizó con la información: user_mail, nuevo valor: maelconservices',
    '2022-04-20 06:22:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    145,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: pass_mail, valor: hbxnssxpesbwxkbr',
    'Se actualizó con la información: pass_mail, nuevo valor: hbxnssxpesbwxkbr',
    '2022-04-20 06:22:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    146,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: service_mail, valor: gmail',
    'Se actualizó con la información: service_mail, nuevo valor: gmail.com',
    '2022-04-20 06:22:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    147,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: port_mail, valor: 456',
    'Se actualizó con la información: port_mail, nuevo valor: 456',
    '2022-04-20 06:22:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    148,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: host_mail, valor: smtp.gmail.com',
    'Se actualizó con la información: host_mail, nuevo valor: smtp.gmail.com',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    149,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: user_mail, valor: maelconservices',
    'Se actualizó con la información: user_mail, nuevo valor: maelconservices',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    150,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: pass_mail, valor: hbxnssxpesbwxkbr',
    'Se actualizó con la información: pass_mail, nuevo valor: hbxnssxpesbwxkbr',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    151,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: service_mail, valor: gmail.com',
    'Se actualizó con la información: service_mail, nuevo valor: gmail',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    152,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: port_mail, valor: 456',
    'Se actualizó con la información: port_mail, nuevo valor: 456',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    153,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: MODULE ADMInistrador; MANAGE, con descripción: ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS, ID relacional: 0',
    '2022-04-20 07:10:30'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    154,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: MODULE ADMInistrador; MANAGE, con descripción: ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS',
    'Nuevos datos del objeto: MODULE ADMInistradorES; MANAGE USER, con descripción: ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS, ID relacional: 7',
    '2022-04-20 07:14:13'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    155,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-20 10:16:00'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    156,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 10:16:00'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    157,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-20 10:17:19'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    158,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 10:17:19'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    159,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-20 10:18:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    160,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 10:18:34'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    161,
    1,
    1,
    'UPDATE',
    'Se actualizó un puesto.',
    'Datos anteriores: DEFAULT, nuevo valor: Sin puesto',
    'Se actualizó el puesto de trabajo: Super DEAFAULT, nuevo valor: DEFAULT',
    '2022-04-20 10:32:31'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    162,
    1,
    1,
    'INSERT',
    'Se ha registrado el ingreso de una nueva persona.',
    NULL,
    'INFORMACION:JUANITO PEREZ; 1212121212, CONTACTO: 123123123, PUESTO: Super DEAFAULT; 0.00',
    '2022-04-20 14:58:37'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    163,
    1,
    1,
    'INSERT',
    'Creación de un usuario.',
    NULL,
    'INFORMACION:JuanA; aizakkuhn@gmail.com; ROL: DEFAULT; REFERENCIA A PERSONA: 2',
    '2022-04-20 14:58:37'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    164,
    2,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario2 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 14:58:37'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    165,
    2,
    1,
    'INSERT',
    'Se agrego una forma de recuperación de contraseña',
    NULL,
    'INFORMACION: El usuario 2 ha registrado una pregunta y respuesta de seguridad: Cual es el nombre de mi perro, con respuesta encriptada por seguridad.',
    '2022-04-20 14:58:37'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    166,
    1,
    1,
    'UPDATE',
    'Se ha actualizado el estado.',
    NULL,
    'El usuario: JuanA fue dado de alta en el sistema.',
    '2022-04-20 15:01:17'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    167,
    1,
    1,
    'INSERT',
    'Se ha registrado el ingreso de una nueva persona.',
    NULL,
    'INFORMACION:JUANITO PEREZ; 121212122, CONTACTO: 123123123, PUESTO: Super DEAFAULT; 0.00',
    '2022-04-20 15:04:23'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    168,
    1,
    1,
    'INSERT',
    'Creación de un usuario.',
    NULL,
    'INFORMACION:Juan1; aizakkuhn7@gmail.com; ROL: DEFAULT; REFERENCIA A PERSONA: 3',
    '2022-04-20 15:04:23'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    169,
    3,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario3 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 15:04:23'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    170,
    3,
    1,
    'INSERT',
    'Se agrego una forma de recuperación de contraseña',
    NULL,
    'INFORMACION: El usuario 3 ha registrado una pregunta y respuesta de seguridad: Cual es el nombre de mi perro, con respuesta encriptada por seguridad.',
    '2022-04-20 15:04:23'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    171,
    1,
    1,
    'UPDATE',
    'Se ha actualizado el estado.',
    NULL,
    'El usuario: Juan1 fue dado de alta en el sistema.',
    '2022-04-20 15:05:05'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    172,
    1,
    1,
    'INSERT',
    'Se ha registrado el ingreso de una nueva persona.',
    NULL,
    'INFORMACION:cristian Mena; 0824199701102, CONTACTO: 97554001, PUESTO: Super DEAFAULT; 0.00',
    '2022-04-20 23:45:09'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    173,
    1,
    1,
    'INSERT',
    'Creación de un usuario.',
    NULL,
    'INFORMACION:CMENA; cristian@gmail.com; ROL: DEFAULT; REFERENCIA A PERSONA: 4',
    '2022-04-20 23:45:09'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    174,
    4,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario4 ha registrado una nueva contraseña en el sistema.',
    '2022-04-20 23:45:10'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    175,
    4,
    1,
    'INSERT',
    'Se agrego una forma de recuperación de contraseña',
    NULL,
    'INFORMACION: El usuario 4 ha registrado una pregunta y respuesta de seguridad: wer, con respuesta encriptada por seguridad.',
    '2022-04-20 23:45:10'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    176,
    1,
    1,
    'UPDATE',
    'Se ha actualizado el estado.',
    NULL,
    'El usuario: CMENA fue dado de alta en el sistema.',
    '2022-04-20 23:54:07'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    177,
    1,
    1,
    'UPDATE',
    'Se ha actualizado el estado.',
    NULL,
    'El usuario: CMENA fue dado de baja en el sistema.',
    '2022-04-20 23:55:46'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    178,
    1,
    1,
    'UPDATE',
    'Se ha actualizado el estado.',
    NULL,
    'El usuario: CMENA fue dado de alta en el sistema.',
    '2022-04-20 23:55:58'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    179,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: Impuesto sobre venta (ISV), valor: 15',
    'Se actualizó con la información: Impuesto sobre venta (ISV), nuevo valor: 18',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    180,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: Comisión por venta, valor: 5',
    'Se actualizó con la información: Comisión por venta, nuevo valor: 10',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    181,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: Intentos de sesión, valor: 3',
    'Se actualizó con la información: Intentos de sesión, nuevo valor: 3',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    182,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: Intentos de recuperación de contraseña, valor: 5',
    'Se actualizó con la información: Intentos de recuperación de contraseña, nuevo valor: 5',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    183,
    1,
    1,
    'UPDATE',
    'Se actualizó un parametro.',
    'Información anterior: Tiempo de duración de usuarios, valor: 60',
    'Se actualizó con la información: Tiempo de duración de usuarios, nuevo valor: 30',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    184,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-21 00:43:18'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    185,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-21 00:43:18'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    186,
    1,
    1,
    'UPDATE',
    'Se ha actualizado la contraseña.',
    NULL,
    'El usuario: alex12 actualizo su contraseña la cual fue encriptada por seguridad',
    '2022-04-21 00:44:22'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    187,
    1,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario1 ha registrado una nueva contraseña en el sistema.',
    '2022-04-21 00:44:22'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    188,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: ; DEFAULT, con descripción: DEFAULT',
    'Nuevos datos del objeto: DEFAULT; DEFAULT, con descripción: DEFAULT, ID relacional: 1',
    '2022-04-21 02:22:28'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    189,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: DEFAULT dentro del objeto: Administracion, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 03:19:18'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    241,
    1,
    1,
    'INSERT',
    'Se ha registrado el ingreso de una nueva persona.',
    NULL,
    'INFORMACION:Rafa Mondragon; 0801199712755, CONTACTO: 89000000, PUESTO: Super DEAFAULT; 0.00',
    '2022-04-21 03:44:11'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    242,
    1,
    1,
    'INSERT',
    'Creación de un usuario.',
    NULL,
    'INFORMACION:RMondragon; dasgon23@gmail.com; ROL: DEFAULT; REFERENCIA A PERSONA: 5',
    '2022-04-21 03:44:11'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    243,
    5,
    1,
    'INSERT',
    'Registro de contraseña.',
    NULL,
    'INFORMACION: El usuario5 ha registrado una nueva contraseña en el sistema.',
    '2022-04-21 03:44:11'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    244,
    5,
    1,
    'INSERT',
    'Se agrego una forma de recuperación de contraseña',
    NULL,
    'INFORMACION: El usuario 5 ha registrado una pregunta y respuesta de seguridad: color, con respuesta encriptada por seguridad.',
    '2022-04-21 03:44:11'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    245,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: Analista de compras dentro del objeto: Compras, detalles: INSERTAR-0, ELIMINAR-0, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 04:14:26'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    246,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: Gerente de inventario dentro del objeto: Inventario, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 04:19:28'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    247,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: Control de productos dentro del objeto: Inventario, detalles: INSERTAR-1, ELIMINAR-0, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 04:21:06'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    248,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: COMPRAS 2 dentro del objeto: Compras, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 04:29:46'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    249,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: COMPRAS 2 dentro del objeto: Inventario, detalles: INSERTAR-1, ELIMINAR-1, ACTUALIZAR-1, CONSULTAR-1',
    '2022-04-21 04:48:12'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    250,
    1,
    1,
    'INSERT',
    'Se han registrado permisos para un rol.',
    NULL,
    'Se insertarón permisos para el rol: DEFAULT dentro del objeto: Inventario, detalles: INSERTAR-0, ELIMINAR-0, ACTUALIZAR-0, CONSULTAR-0',
    '2022-04-21 04:54:08'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    251,
    1,
    1,
    'UPDATE',
    'Se actualizó un rol.',
    'Antiguos datos del rol: COMPRAS 2, con descripción: ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO',
    'Nuevos datos del rol: COMPRAS 2, con descripción: ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO, ID relacional: 5',
    '2022-04-21 04:57:03'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    253,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: DEFAULTs; DEFECTO, con descripción: no permisos, ID relacional: 0',
    '2022-04-21 05:22:09'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    254,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: MODULE ADM; MANAGE, con descripción: ALMACENA LOS PERMISOS, ID relacional: 0',
    '2022-04-21 05:22:41'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    255,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEFAULTs; DEFECTO, con descripción: no permisos',
    'Nuevos datos del objeto: DEF; DEF, con descripción: no  a permisos, ID relacional: 8',
    '2022-04-21 05:24:54'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    256,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEF; DEF, con descripción: no  a permisos',
    'Nuevos datos del objeto: DEF; DEF, con descripción: no  a permisos, ID relacional: 8',
    '2022-04-21 05:24:56'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    257,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEF; DEF, con descripción: no  a permisos',
    'Nuevos datos del objeto: DEF; DEF, con descripción: no  a permisos, ID relacional: 8',
    '2022-04-21 05:24:58'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    258,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEF; DEF, con descripción: no  a permisos',
    'Nuevos datos del objeto: DEF; DEF, con descripción: no  a permisos, ID relacional: 8',
    '2022-04-21 05:25:20'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    259,
    1,
    1,
    'UPDATE',
    'Se actualizó un objeto.',
    'Antiguos datos del objeto: DEF; DEF, con descripción: no  a permisos',
    'Nuevos datos del objeto: DEF; DEF, con descripción: no  a permisos, ID relacional: 8',
    '2022-04-21 05:25:22'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    260,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: COMPRAS 3, con descripción: ACCESO A LOS MODULOS DE COMPRAS, ID relacional: 0',
    '2022-04-21 05:46:48'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    261,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo rol.',
    NULL,
    'Se creó el nuevo rol: COMPRAS PRUEBA, con descripción: ACCESO A LOS MODULOS DE COMPRAS, ID relacional: 0',
    '2022-04-21 06:02:08'
  );
INSERT INTO
  `tbl_ms_bitacora` (
    `ID_BITACORA`,
    `ID_USUARIO`,
    `ID_OBJETO`,
    `ACCION`,
    `DESCRIPCION`,
    `INFORMACION_ANTERIOR`,
    `INFORMACION_ACTUAL`,
    `FECHA_BITACORA`
  )
VALUES
  (
    262,
    1,
    1,
    'INSERT',
    'Se ha creado un nuevo Objeto.',
    NULL,
    'Se creó el nuevo objeto: DEFAULTs; DEFECTO, con descripción: Sin , ID relacional: 0',
    '2022-04-21 06:39:11'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_hist_contrasena
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    1,
    1,
    '$2a$10$TDO/frAkv0aL11p8lt5tVuIDfTJUJIDDtfR/ZeTdfZ2z5YVcQGgki'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    2,
    1,
    '$2a$10$mUwT8TOB1BNwQe9xCJGtV.5eI8rF4MZ/T4CsaW8QE3SkkRChVO6Ou'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    3,
    1,
    '$2a$10$NGNRihY1DRsoAH6NhWyXDOvU/KR5q63.KBiDbIjwtUU2uufpcRhNC'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    4,
    1,
    '$2a$10$sn9GcJdUTacHMC8Xd4mzBup9.jCIt376M.BPPPX/yx6ntcrAcZtMm'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    5,
    2,
    '$2a$10$P6TNaH5RutyL6F14Las1Q.hAgjQGLhkq./YhNcBPgXPZdJKbKit.K'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    6,
    3,
    '$2a$10$e5OL9JH.VDS/4GiGa6dxR.3JLXjnB4sq2CUjPPUdwTdaVJowlS4FK'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    7,
    4,
    '$2a$10$JSLAfHcb4SmvApYIZOHUWOrUFlmmEnbqRau75W8308xrVLkdwSB8S'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    8,
    1,
    '$2a$10$999c/Fox3fsqK0JPZjaqJexOxIOlQvBRVbaAgg5GNoZ5pZ0b9u5vO'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    9,
    1,
    '$2a$10$w2unoR/orOogBgIPqbtyr.p2O/bpBTtvXIhMQW9IJiU/pBYmj2JXm'
  );
INSERT INTO
  `tbl_ms_hist_contrasena` (`ID_HISTORIAL`, `ID_USUARIO`, `CONTRASENA`)
VALUES
  (
    10,
    5,
    '$2a$10$yiaCrWT7XVVuDYIb92TCMeND0E1BPfCgcdZi/8vmlphfYUr7qEuIW'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_parametros
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    1,
    'Impuesto sobre venta (ISV)',
    1,
    '18',
    '2022-04-17 10:33:57',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    2,
    'Comisión por venta',
    1,
    '10',
    '2022-04-17 10:33:57',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    3,
    'Intentos de sesión',
    1,
    '3',
    '2022-04-17 10:33:57',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    4,
    'Intentos de recuperación de contraseña',
    1,
    '5',
    '2022-04-17 10:33:57',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    5,
    'Tiempo de duración de usuarios',
    1,
    '30',
    '2022-04-17 10:33:57',
    '2022-04-21 00:35:59'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    6,
    'hostDB',
    1,
    'localhost',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    7,
    'userDB',
    1,
    'root',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    8,
    'databaseDB',
    1,
    'db_maelcon_5',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    9,
    'passwordDB',
    1,
    'rodriguez1999',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    10,
    'host_mail',
    1,
    'smtp.gmail.com',
    '2022-04-17 10:33:57',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    11,
    'user_mail',
    1,
    'maelconservices',
    '2022-04-17 10:33:57',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    12,
    'pass_mail',
    1,
    'hbxnssxpesbwxkbr',
    '2022-04-17 10:33:57',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    13,
    'service_mail',
    1,
    'gmail',
    '2022-04-17 10:33:57',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    14,
    'port_mail',
    1,
    '456',
    '2022-04-17 10:33:57',
    '2022-04-20 06:28:43'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    15,
    'bool_port_mail',
    1,
    'true',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    16,
    'name_cloudinary',
    1,
    'maelcon',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    17,
    'api_key_cloudinary',
    1,
    '588467179963663',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );
INSERT INTO
  `tbl_ms_parametros` (
    `ID_PARAMETRO`,
    `PARAMETRO`,
    `ID_USUARIO`,
    `VALOR`,
    `FECHA_CREACION`,
    `FECHA_MODIFICACION`
  )
VALUES
  (
    18,
    'api_secret_cloudinary',
    1,
    'RcaTIK2zxmc77S_WzwAP067GYcM',
    '2022-04-17 10:33:57',
    '2022-04-17 10:33:57'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_preguntas_usuario
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_preguntas_usuario` (
    `ID_PREGUNTAS_USR`,
    `ID_USUARIO`,
    `PREGUNTA`,
    `RESPUESTA`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    1,
    'Mi perro se llama',
    '$2a$10$EEAGAtRkENUQqzHGAO5Xi.l1K6qbKvawkVsH8iarHJUmIyqK2CTd6',
    '2022-04-18 05:04:09',
    1,
    '2022-04-18 05:04:09',
    1
  );
INSERT INTO
  `tbl_ms_preguntas_usuario` (
    `ID_PREGUNTAS_USR`,
    `ID_USUARIO`,
    `PREGUNTA`,
    `RESPUESTA`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    2,
    2,
    'Cual es el nombre de mi perro',
    'Perro',
    '2022-04-20 14:58:37',
    2,
    '2022-04-20 14:58:37',
    2
  );
INSERT INTO
  `tbl_ms_preguntas_usuario` (
    `ID_PREGUNTAS_USR`,
    `ID_USUARIO`,
    `PREGUNTA`,
    `RESPUESTA`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    3,
    3,
    'Cual es el nombre de mi perro',
    '$2a$10$xHhGnbI4wqoKkSRBDctJ0eAtDNuc8epeiML50QY9p77yZ2C0v1iDO',
    '2022-04-20 15:04:23',
    3,
    '2022-04-20 15:04:23',
    3
  );
INSERT INTO
  `tbl_ms_preguntas_usuario` (
    `ID_PREGUNTAS_USR`,
    `ID_USUARIO`,
    `PREGUNTA`,
    `RESPUESTA`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    4,
    4,
    'wer',
    '$2a$10$PrPY2blFBMlfpvq3ZFOVbesnXnvDXj59Bug4kJ60gpRf0PQ9EP1/i',
    '2022-04-20 23:45:10',
    4,
    '2022-04-20 23:45:10',
    4
  );
INSERT INTO
  `tbl_ms_preguntas_usuario` (
    `ID_PREGUNTAS_USR`,
    `ID_USUARIO`,
    `PREGUNTA`,
    `RESPUESTA`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    5,
    5,
    'color',
    '$2a$10$11o8n4KTRg3iZkcn3MLpkuEavz5eRuO3HcEHuYywMMBRpppQ9E7f6',
    '2022-04-21 03:44:11',
    5,
    '2022-04-21 03:44:11',
    5
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_roles
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    'SuperAdmin',
    'Usuario por defecto del sistema',
    '2022-04-17 10:33:53',
    1,
    '2022-04-17 10:33:53',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    2,
    'DEFAULT',
    'Sin permisos',
    '2022-04-17 10:33:53',
    1,
    '2022-04-17 10:33:53',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    3,
    'Admin',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    4,
    'Analista de compras',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    5,
    'COMPRAS 2',
    'ACCESO A LOS MODULOS DE COMPRAS E INVENTARIO',
    '2022-04-17 10:39:02',
    1,
    '2022-04-21 04:57:03',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    6,
    'Gerente de inventario',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    7,
    'Control de productos',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    8,
    'COMPRAS 3',
    'ACCESO A LOS MODULOS DE COMPRAS',
    '2022-04-21 05:46:48',
    1,
    '2022-04-21 05:46:48',
    1
  );
INSERT INTO
  `tbl_ms_roles` (
    `ID_ROL`,
    `ROL`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    9,
    'COMPRAS PRUEBA',
    'ACCESO A LOS MODULOS DE COMPRAS',
    '2022-04-21 06:02:08',
    1,
    '2022-04-21 06:02:08',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ms_usuario
# ------------------------------------------------------------

INSERT INTO
  `tbl_ms_usuario` (
    `ID_USUARIO`,
    `ID_ROL`,
    `ID_PERSONA`,
    `USUARIO`,
    `CONTRASENA`,
    `IMG_USUARIO`,
    `CORREO_ELECTRONICO`,
    `FECHA_ULTIMA_CONEXION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`,
    `PRIMER_INGRESO`,
    `FECHA_VENCIMIENTO`,
    `ESTADO`
  )
VALUES
  (
    1,
    1,
    1,
    'alex12',
    '$2a$10$w2unoR/orOogBgIPqbtyr.p2O/bpBTtvXIhMQW9IJiU/pBYmj2JXm',
    'img.jpg',
    'alex@gmail.com',
    '2022-04-17 10:33:53',
    '2022-04-17 10:33:53',
    1,
    '2022-04-21 00:44:22',
    1,
    'PRIMER INGRESO',
    '2022-12-12 00:00:00',
    1
  );
INSERT INTO
  `tbl_ms_usuario` (
    `ID_USUARIO`,
    `ID_ROL`,
    `ID_PERSONA`,
    `USUARIO`,
    `CONTRASENA`,
    `IMG_USUARIO`,
    `CORREO_ELECTRONICO`,
    `FECHA_ULTIMA_CONEXION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`,
    `PRIMER_INGRESO`,
    `FECHA_VENCIMIENTO`,
    `ESTADO`
  )
VALUES
  (
    2,
    2,
    2,
    'JuanA',
    '$2a$10$P6TNaH5RutyL6F14Las1Q.hAgjQGLhkq./YhNcBPgXPZdJKbKit.K',
    'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png',
    'aizakkuhn@gmail.com',
    '2022-04-20 14:58:37',
    '2022-04-20 14:58:37',
    1,
    '2022-04-20 15:01:17',
    1,
    '2022-04-20 14:58:37',
    '2022-04-20 14:58:37',
    1
  );
INSERT INTO
  `tbl_ms_usuario` (
    `ID_USUARIO`,
    `ID_ROL`,
    `ID_PERSONA`,
    `USUARIO`,
    `CONTRASENA`,
    `IMG_USUARIO`,
    `CORREO_ELECTRONICO`,
    `FECHA_ULTIMA_CONEXION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`,
    `PRIMER_INGRESO`,
    `FECHA_VENCIMIENTO`,
    `ESTADO`
  )
VALUES
  (
    3,
    2,
    3,
    'Juan1',
    '$2a$10$e5OL9JH.VDS/4GiGa6dxR.3JLXjnB4sq2CUjPPUdwTdaVJowlS4FK',
    'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png',
    'aizakkuhn7@gmail.com',
    '2022-04-20 15:04:23',
    '2022-04-20 15:04:23',
    1,
    '2022-04-20 15:05:05',
    1,
    '2022-04-20 15:04:23',
    '2022-04-20 15:04:23',
    1
  );
INSERT INTO
  `tbl_ms_usuario` (
    `ID_USUARIO`,
    `ID_ROL`,
    `ID_PERSONA`,
    `USUARIO`,
    `CONTRASENA`,
    `IMG_USUARIO`,
    `CORREO_ELECTRONICO`,
    `FECHA_ULTIMA_CONEXION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`,
    `PRIMER_INGRESO`,
    `FECHA_VENCIMIENTO`,
    `ESTADO`
  )
VALUES
  (
    4,
    2,
    4,
    'CMENA',
    '$2a$10$JSLAfHcb4SmvApYIZOHUWOrUFlmmEnbqRau75W8308xrVLkdwSB8S',
    'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png',
    'cristian@gmail.com',
    '2022-04-20 23:45:09',
    '2022-04-20 23:45:09',
    1,
    '2022-04-20 23:56:29',
    1,
    '2022-04-20 23:45:09',
    '2022-04-20 23:45:09',
    1
  );
INSERT INTO
  `tbl_ms_usuario` (
    `ID_USUARIO`,
    `ID_ROL`,
    `ID_PERSONA`,
    `USUARIO`,
    `CONTRASENA`,
    `IMG_USUARIO`,
    `CORREO_ELECTRONICO`,
    `FECHA_ULTIMA_CONEXION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`,
    `PRIMER_INGRESO`,
    `FECHA_VENCIMIENTO`,
    `ESTADO`
  )
VALUES
  (
    5,
    2,
    5,
    'RMondragon',
    '$2a$10$yiaCrWT7XVVuDYIb92TCMeND0E1BPfCgcdZi/8vmlphfYUr7qEuIW',
    'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png',
    'dasgon23@gmail.com',
    '2022-04-21 03:44:11',
    '2022-04-21 03:44:11',
    1,
    '2022-04-21 03:44:11',
    1,
    '2022-04-21 03:44:11',
    '2022-04-21 03:44:11',
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_objetos
# ------------------------------------------------------------

INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    'DEFAULT',
    'DEFAULT',
    'DEFAULT',
    '2022-04-17 10:33:53',
    1,
    '2022-04-21 02:22:28',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    2,
    'Administracion',
    'Control',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    3,
    'Compras',
    'Gestion',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    4,
    'Ventas',
    'Gestion',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    5,
    'Inventario',
    'Control',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    6,
    'Usuarios',
    'Administración',
    'Ninguna',
    '2022-04-17 10:39:02',
    1,
    '2022-04-17 10:39:02',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    7,
    'MODULE ADMInistradorES',
    'MANAGE USER',
    'ALMACENA LOS PERMISOS PARA EL USO DEL MODULO DE LOS USUARIOS',
    '2022-04-20 07:10:30',
    1,
    '2022-04-20 07:14:13',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    8,
    'DEF',
    'DEF',
    'no  a permisos',
    '2022-04-21 05:22:09',
    1,
    '2022-04-21 05:25:22',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    10,
    'MODULE ADM',
    'MANAGE',
    'ALMACENA LOS PERMISOS',
    '2022-04-21 05:22:41',
    1,
    '2022-04-21 05:22:41',
    1
  );
INSERT INTO
  `tbl_objetos` (
    `ID_OBJETO`,
    `OBJETOS`,
    `TIPO_OBJETO`,
    `DESCRIPCION`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    11,
    'DEFAULTs',
    'DEFECTO',
    'Sin ',
    '2022-04-21 06:39:11',
    1,
    '2022-04-21 06:39:11',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_permiso
# ------------------------------------------------------------

INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    2,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    3,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    4,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    5,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    1,
    6,
    1,
    1,
    1,
    1,
    '2022-04-17 10:39:03',
    1,
    '2022-04-17 10:39:03',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    2,
    2,
    1,
    1,
    1,
    1,
    '2022-04-21 03:19:18',
    1,
    '2022-04-21 03:19:18',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    2,
    5,
    0,
    0,
    0,
    0,
    '2022-04-21 04:54:08',
    1,
    '2022-04-21 04:54:08',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    4,
    3,
    0,
    0,
    1,
    1,
    '2022-04-21 04:14:26',
    1,
    '2022-04-21 04:14:26',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    5,
    3,
    1,
    1,
    1,
    1,
    '2022-04-21 04:29:46',
    1,
    '2022-04-21 04:29:46',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    5,
    5,
    1,
    1,
    1,
    1,
    '2022-04-21 04:48:12',
    1,
    '2022-04-21 04:48:12',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    6,
    5,
    1,
    1,
    1,
    1,
    '2022-04-21 04:19:28',
    1,
    '2022-04-21 04:19:28',
    1
  );
INSERT INTO
  `tbl_permiso` (
    `ID_ROL`,
    `ID_OBJETO`,
    `PERMISO_INSERCION`,
    `PERMISO_ELIMINACION`,
    `PERMISO_ACTUALIZACION`,
    `PERMISO_CONSULTAR`,
    `FECHA_CREACION`,
    `CREADO_POR`,
    `FECHA_MODIFICACION`,
    `MODIFICADO_POR`
  )
VALUES
  (
    7,
    5,
    1,
    0,
    1,
    1,
    '2022-04-21 04:21:06',
    1,
    '2022-04-21 04:21:06',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_personas
# ------------------------------------------------------------

INSERT INTO
  `tbl_personas` (
    `ID_PERSONA`,
    `ID_PUESTO`,
    `NOMBRE_PERSONA`,
    `APELLIDO_PERSONA`,
    `GENERO`,
    `RTN`,
    `TELEFONO`,
    `FEC_REGIS_PERSONA`,
    `ESTADO`,
    `SUELDO`
  )
VALUES
  (
    1,
    1,
    'Alejandro',
    'Gomez',
    'M',
    '08011991245784',
    '9999-0000',
    '2022-04-17 10:33:53',
    1,
    0.00
  );
INSERT INTO
  `tbl_personas` (
    `ID_PERSONA`,
    `ID_PUESTO`,
    `NOMBRE_PERSONA`,
    `APELLIDO_PERSONA`,
    `GENERO`,
    `RTN`,
    `TELEFONO`,
    `FEC_REGIS_PERSONA`,
    `ESTADO`,
    `SUELDO`
  )
VALUES
  (
    2,
    2,
    'JUANITO',
    'PEREZ',
    'M',
    '1212121212',
    '123123123',
    '2022-04-20 14:58:37',
    1,
    0.00
  );
INSERT INTO
  `tbl_personas` (
    `ID_PERSONA`,
    `ID_PUESTO`,
    `NOMBRE_PERSONA`,
    `APELLIDO_PERSONA`,
    `GENERO`,
    `RTN`,
    `TELEFONO`,
    `FEC_REGIS_PERSONA`,
    `ESTADO`,
    `SUELDO`
  )
VALUES
  (
    3,
    2,
    'JUANITO',
    'PEREZ',
    'M',
    '121212122',
    '123123123',
    '2022-04-20 15:04:23',
    1,
    0.00
  );
INSERT INTO
  `tbl_personas` (
    `ID_PERSONA`,
    `ID_PUESTO`,
    `NOMBRE_PERSONA`,
    `APELLIDO_PERSONA`,
    `GENERO`,
    `RTN`,
    `TELEFONO`,
    `FEC_REGIS_PERSONA`,
    `ESTADO`,
    `SUELDO`
  )
VALUES
  (
    4,
    2,
    'cristian',
    'Mena',
    'Masculino',
    '0824199701102',
    '97554001',
    '2022-04-20 23:45:09',
    1,
    0.00
  );
INSERT INTO
  `tbl_personas` (
    `ID_PERSONA`,
    `ID_PUESTO`,
    `NOMBRE_PERSONA`,
    `APELLIDO_PERSONA`,
    `GENERO`,
    `RTN`,
    `TELEFONO`,
    `FEC_REGIS_PERSONA`,
    `ESTADO`,
    `SUELDO`
  )
VALUES
  (
    5,
    2,
    'Rafa',
    'Mondragon',
    'Masculino',
    '0801199712755',
    '89000000',
    '2022-04-21 03:44:11',
    1,
    0.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_productos
# ------------------------------------------------------------

INSERT INTO
  `tbl_productos` (
    `ID_PRODUCTO`,
    `ID_PROVEEDOR`,
    `NOMBRE_PRODUCTO`,
    `MARCA_PRODUCTO`,
    `DESCRIPCION_PRODUCTO`,
    `ID_CATEGORIA`,
    `ESTADO`,
    `IMG_PRODUCTO`
  )
VALUES
  (
    1,
    1,
    'Foco 1',
    'LUX',
    'bajas potencias para zonas amplias',
    1,
    1,
    ' img.jpg'
  );
INSERT INTO
  `tbl_productos` (
    `ID_PRODUCTO`,
    `ID_PROVEEDOR`,
    `NOMBRE_PRODUCTO`,
    `MARCA_PRODUCTO`,
    `DESCRIPCION_PRODUCTO`,
    `ID_CATEGORIA`,
    `ESTADO`,
    `IMG_PRODUCTO`
  )
VALUES
  (
    2,
    2,
    'Foco 2',
    'TERX',
    'Luz de interiores',
    1,
    1,
    ' img.jpg'
  );
INSERT INTO
  `tbl_productos` (
    `ID_PRODUCTO`,
    `ID_PROVEEDOR`,
    `NOMBRE_PRODUCTO`,
    `MARCA_PRODUCTO`,
    `DESCRIPCION_PRODUCTO`,
    `ID_CATEGORIA`,
    `ESTADO`,
    `IMG_PRODUCTO`
  )
VALUES
  (
    3,
    3,
    'Foco 3',
    'ILUMINA',
    'Ideal para exteriores',
    1,
    1,
    ' img.jpg'
  );
INSERT INTO
  `tbl_productos` (
    `ID_PRODUCTO`,
    `ID_PROVEEDOR`,
    `NOMBRE_PRODUCTO`,
    `MARCA_PRODUCTO`,
    `DESCRIPCION_PRODUCTO`,
    `ID_CATEGORIA`,
    `ESTADO`,
    `IMG_PRODUCTO`
  )
VALUES
  (4, 2, 'Foco 4', 'SUR', 'compuesto', 1, 1, ' img.jpg');
INSERT INTO
  `tbl_productos` (
    `ID_PRODUCTO`,
    `ID_PROVEEDOR`,
    `NOMBRE_PRODUCTO`,
    `MARCA_PRODUCTO`,
    `DESCRIPCION_PRODUCTO`,
    `ID_CATEGORIA`,
    `ESTADO`,
    `IMG_PRODUCTO`
  )
VALUES
  (
    5,
    1,
    'Foco 5',
    'CLEND',
    'Sin detalles',
    1,
    1,
    ' img.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_proveedores
# ------------------------------------------------------------

INSERT INTO
  `tbl_proveedores` (
    `ID_PROVEEDOR`,
    `RTN`,
    `NOMBRE_PROVEEDOR`,
    `TELEFONO_PROVEEDOR`,
    `CORREO_PROVEEDOR`
  )
VALUES
  (
    1,
    '0102147484451',
    'LUMEX',
    '9915-2020',
    'lumex@correo.com'
  );
INSERT INTO
  `tbl_proveedores` (
    `ID_PROVEEDOR`,
    `RTN`,
    `NOMBRE_PROVEEDOR`,
    `TELEFONO_PROVEEDOR`,
    `CORREO_PROVEEDOR`
  )
VALUES
  (
    2,
    '0102147478964',
    'START',
    '9915-2021',
    'start@correo.com'
  );
INSERT INTO
  `tbl_proveedores` (
    `ID_PROVEEDOR`,
    `RTN`,
    `NOMBRE_PROVEEDOR`,
    `TELEFONO_PROVEEDOR`,
    `CORREO_PROVEEDOR`
  )
VALUES
  (
    3,
    '0102174441578',
    'LINEAS',
    '9915-2022',
    'lineas@correo.com'
  );
INSERT INTO
  `tbl_proveedores` (
    `ID_PROVEEDOR`,
    `RTN`,
    `NOMBRE_PROVEEDOR`,
    `TELEFONO_PROVEEDOR`,
    `CORREO_PROVEEDOR`
  )
VALUES
  (
    4,
    '0801114578513',
    'MATER',
    '9915-2020',
    'mater@correo.com'
  );
INSERT INTO
  `tbl_proveedores` (
    `ID_PROVEEDOR`,
    `RTN`,
    `NOMBRE_PROVEEDOR`,
    `TELEFONO_PROVEEDOR`,
    `CORREO_PROVEEDOR`
  )
VALUES
  (
    5,
    '0102777458711',
    'SERVLUX',
    '9915-2020',
    'servlux@correo.com'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_ventas
# ------------------------------------------------------------

INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    1,
    1,
    1,
    0,
    '2022-04-17 10:39:03',
    2,
    11.86,
    79.05,
    'NINGUNA',
    1,
    3.95
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    2,
    2,
    1,
    0,
    '2022-04-17 10:39:03',
    1,
    4.28,
    28.50,
    'NINGUNA',
    1,
    1.43
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    3,
    3,
    1,
    0,
    '2022-04-17 10:39:03',
    3,
    3.65,
    24.30,
    'NINGUNA',
    0,
    0.00
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    4,
    2,
    1,
    0,
    '2022-04-17 10:39:03',
    6,
    3.51,
    23.40,
    'NINGUNA',
    0,
    0.00
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    5,
    1,
    1,
    0,
    '2022-04-17 10:39:34',
    2,
    0.00,
    0.00,
    'NINGUNA',
    0,
    0.00
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    6,
    2,
    1,
    0,
    '2022-04-17 10:39:34',
    1,
    0.00,
    0.00,
    'NINGUNA',
    0,
    0.00
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    7,
    3,
    1,
    0,
    '2022-04-17 10:39:34',
    3,
    0.00,
    0.00,
    'NINGUNA',
    0,
    0.00
  );
INSERT INTO
  `tbl_ventas` (
    `ID_VENTA`,
    `ID_PAGO`,
    `ID_USUARIO`,
    `CANTIDAD_VENTA`,
    `FECHA_VENTA`,
    `ID_CLIENTE`,
    `ISV`,
    `TOTAL_VENTA`,
    `DESCRIPCION_VENTA`,
    `ESTADO`,
    `COMISION_EMPLEADO`
  )
VALUES
  (
    8,
    2,
    1,
    0,
    '2022-04-17 10:39:34',
    6,
    0.00,
    0.00,
    'NINGUNA',
    0,
    0.00
  );

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_CATEGORIA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_CATEGORIA;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_CATEGORIA` BEFORE INSERT ON `tbl_categorias` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se creo una nueva categoría de productos.', NULL,
	CONCAT('Se creó la categoría de productos: ',NEW.CATEGORIA,' con la descripción: ', NEW.DESCRIPCION), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_CATEGORIA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_CATEGORIA;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_CATEGORIA` BEFORE UPDATE ON `tbl_categorias` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'UPDATE', 'Se creo una nueva categoría de productos.',	CONCAT('Valor anterior ',NEW.CATEGORIA,' con la descripción: ', NEW.DESCRIPCION),
	CONCAT('Se actualizó la categoría de productos a ',NEW.CATEGORIA,' con la descripción: ', NEW.DESCRIPCION), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_CLIENTE
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_CLIENTE;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_CLIENTE` BEFORE INSERT ON `tbl_clientes` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se ha registrado un nuevo cliente.', NULL,
	CONCAT('Se creó un nuevo cliente con los datos: ',NEW.NOMBRE_CLIENTE,'; RTN: ',NEW.RTN,', CONTACTO: ', NEW.TELEFONO_CLIENTE,', ',NEW.DIRECCION_CLIENTE), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_CLIENTE
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_CLIENTE;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_CLIENTE` BEFORE UPDATE ON `tbl_clientes` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'UPDATE', 'Se ha actualizado un cliente.', CONCAT('Infromación anterior: ',OLD.NOMBRE_CLIENTE,'; RTN: ',OLD.RTN,', CONTACTO: ', OLD.TELEFONO_CLIENTE,', ',OLD.DIRECCION_CLIENTE),
	CONCAT('Se actualizó la información del cliente: ',NEW.NOMBRE_CLIENTE,'; RTN: ',NEW.RTN,', CONTACTO: ', NEW.TELEFONO_CLIENTE,', ',NEW.DIRECCION_CLIENTE), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_COMPRA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_COMPRA;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_COMPRA` BEFORE INSERT ON `tbl_compras` FOR EACH ROW BEGIN
	DECLARE PROVEEDOR_temp VARCHAR(50);
    DECLARE PAGO_temp VARCHAR(50);
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = NEW.ID_PROVEEDOR;
    SELECT FORMA_PAGO INTO PAGO_temp FROM TBL_METODOS_PAGO WHERE ID_PAGO = NEW.ID_PAGO;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.ID_USUARIO, 1, 'INSERT', 'Se ha comenzado el proceso de una nueva compra.', NULL,
	CONCAT('Se creó un encabezado de compra con el proveedor: ',PROVEEDOR_temp,'; TOTAL: ',NEW.TOTAL_COMPRA,', ISV: ', NEW.ISV_COMPRA,', PAGO: ',PAGO_temp,' Descripción: ',NEW.OBSERVACION_COMPRA), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_COMPRA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_COMPRA;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_COMPRA` BEFORE UPDATE ON `tbl_compras` FOR EACH ROW BEGIN
	DECLARE PAGO_temp_act VARCHAR(50);
    DECLARE PAGO_temp_old VARCHAR(50);
	DECLARE PROVEEDOR_temp VARCHAR(50);
    SELECT FORMA_PAGO INTO PAGO_temp_act FROM TBL_METODOS_PAGO WHERE ID_PAGO = NEW.ID_PAGO;
    SELECT FORMA_PAGO INTO PAGO_temp_old FROM TBL_METODOS_PAGO WHERE ID_PAGO = OLD.ID_PAGO;
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = NEW.ID_PROVEEDOR;
    
    IF NEW.ID_PAGO != OLD.ID_PAGO THEN 
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Se ha modificado la forma de pago de una compra.', CONCAT('Método de pago anterior: ', PAGO_temp_old),
		CONCAT('La compra con ID: ',NEW.ID_COMPRA,', actualizo la forma de pago a: ',PAGO_temp_act), NOW());
    END IF;
    
    IF NEW.ESTADO = 1 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Finalización de compra.', NULL,
		CONCAT('Se concreto la compra con el proveedor: ',PROVEEDOR_temp,'; TOTAL: ',NEW.TOTAL_COMPRA,', ISV: ', NEW.ISV_COMPRA,', PAGO: ',PAGO_temp_act,' Descripción: ',NEW.OBSERVACION_COMPRA), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ELIMINAR_COMPRA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ELIMINAR_COMPRA;
DELIMITER ;;
CREATE TRIGGER `TR_ELIMINAR_COMPRA` AFTER DELETE ON `tbl_compras` FOR EACH ROW BEGIN
	DECLARE PROVEEDOR_temp VARCHAR(50);
    DECLARE PAGO_temp VARCHAR(50);
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = OLD.ID_PROVEEDOR;
    SELECT FORMA_PAGO INTO PAGO_temp FROM TBL_METODOS_PAGO WHERE ID_PAGO = OLD.ID_PAGO;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(OLD.ID_USUARIO, 1, 'DELETE', 'Se eliminado una compra.', CONCAT('Se eliminó la compra con el proveedor: ',PROVEEDOR_temp,'; TOTAL: ',OLD.TOTAL_COMPRA,', ISV: ', OLD.ISV_COMPRA,', PAGO: ',PAGO_temp,', Descripción: ',OLD.OBSERVACION_COMPRA),
	CONCAT('Se eliminó la compra y los articulos relacionados a esta.'), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_INVENTARIO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_INVENTARIO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_INVENTARIO` BEFORE INSERT ON `tbl_inventario` FOR EACH ROW BEGIN
	DECLARE PRODUCTO_temp VARCHAR(50);
    SELECT NOMBRE_PRODUCTO INTO PRODUCTO_temp FROM TBL_PRODUCTOS WHERE ID_PRODUCTO = NEW.ID_PRODUCTO;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se creo una sección de inventario para un nuevo producto.', NULL,
	CONCAT('Se agrego al inventario el producto: ',PRODUCTO_temp,', ID:',NEW.ID_PRODUCTO,', con valor y existencia de: ',NEW.PRECIO_VENTA,'; ', NEW.EXISTENCIA), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_INVENTARIO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_INVENTARIO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_INVENTARIO` BEFORE UPDATE ON `tbl_inventario` FOR EACH ROW BEGIN
	DECLARE PRODUCTO_temp VARCHAR(50);
    SELECT NOMBRE_PRODUCTO INTO PRODUCTO_temp FROM TBL_PRODUCTOS WHERE ID_PRODUCTO = NEW.ID_PRODUCTO;
    
    IF NEW.ESTADO != OLD.ESTADO AND NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se cambió el estado del producto en inventario.', NULL,
		CONCAT('El producto: ',PRODUCTO_temp,', ID: ',NEW.ID_PRODUCTO,', cambió su estado a habilitado'), NOW());
    END IF;
    
    IF NEW.ESTADO != OLD.ESTADO AND NOT NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se cambió el estado del producto en inventario.', NULL,
		CONCAT('El producto: ',PRODUCTO_temp,', ID: ',NEW.ID_PRODUCTO,', cambió su estado a deshabilitado'), NOW());
    END IF;
    
    IF NEW.PRECIO_VENTA != OLD.PRECIO_VENTA THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se cambió el precio de venta del producto en inventario.', CONCAT('Precio anterior: ', OLD.PRECIO_VENTA),
		CONCAT('El producto: ',PRODUCTO_temp,', ID: ',NEW.ID_PRODUCTO,', cambió su precio de venta a ', NEW.PRECIO_VENTA), NOW());
    END IF;
    
    IF NEW.PRECIO_UNITARIO != OLD.PRECIO_UNITARIO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se cambió el precio unitario del producto en inventario.', CONCAT('Precio promedio ponderado anterior: ', OLD.PRECIO_UNITARIO),
		CONCAT('El producto: ',PRODUCTO_temp,', ID: ',NEW.ID_PRODUCTO,', cambió su precio promedio ponderado a ', NEW.PRECIO_UNITARIO), NOW());
    END IF;
    
    IF NEW.EXISTENCIA != OLD.EXISTENCIA THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se registro un movimiento en la existencia de un producto.', CONCAT('Cantidad anterior: ', OLD.EXISTENCIA),
		CONCAT('El producto: ',PRODUCTO_temp,', ID: ',NEW.ID_PRODUCTO,', cambió su existencia a ', NEW.EXISTENCIA), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_KARDEX
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_KARDEX;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_KARDEX` BEFORE INSERT ON `tbl_kardex` FOR EACH ROW BEGIN
	DECLARE PRODUCTO_temp VARCHAR(50);
    SELECT NOMBRE_PRODUCTO INTO PRODUCTO_temp FROM TBL_PRODUCTOS P 
    INNER JOIN TBL_INVENTARIO I ON I.ID_PRODUCTO = P.ID_PRODUCTO 
    WHERE I.ID_INVENTARIO = NEW.ID_INVENTARIO;
    
    IF NEW.TIPO_MOVIMIENTO = 0 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'INSERT', 'Se registro una compra de productos.', NULL,
		CONCAT('Se agrego un kardex para la tarjeta de inventario: ',NEW.ID_INVENTARIO,', del producto: ',PRODUCTO_temp,', con los sigientes datos cantidad, precio unitario, total: ',NEW.CANTIDAD,', ', NEW.PRECIO_UNITARIO,', ',NEW.TOTAL), NOW());
	ELSEIF NEW.TIPO_MOVIMIENTO = 1 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'INSERT', 'Se registro una venta de productos.', NULL,
		CONCAT('Se agrego un kardex para la tarjeta de inventario: ', NEW.ID_INVENTARIO,', del producto: ', PRODUCTO_temp,', con los sigientes datos cantidad, precio unitario, total: ',NEW.CANTIDAD,', ', NEW.PRECIO_UNITARIO,', ',NEW.TOTAL), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_KARDEX
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_KARDEX;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_KARDEX` BEFORE UPDATE ON `tbl_kardex` FOR EACH ROW BEGIN
	DECLARE PRODUCTO_temp VARCHAR(50);
    SELECT NOMBRE_PRODUCTO INTO PRODUCTO_temp FROM TBL_PRODUCTOS P 
    INNER JOIN TBL_INVENTARIO I ON I.ID_PRODUCTO = P.ID_PRODUCTO 
    WHERE I.ID_INVENTARIO = NEW.ID_INVENTARIO;
    
    IF NEW.TIPO_MOVIMIENTO = 0 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se actualizó la fecha de vencimiento de un producto.', NULL,
		CONCAT('Se actualizó la fecha de vencimiento del inventario: ',NEW.ID_INVENTARIO,', del producto: ',PRODUCTO_temp,', dichos productos de vencen en: ',NEW.FECHA_VENCI_PRODUCTO), NOW());
	END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_METODO_PAGO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_METODO_PAGO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_METODO_PAGO` BEFORE INSERT ON `tbl_metodos_pago` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se han registrado un nuevo método de pago.', NULL,
	CONCAT('Se creó un método de pago: ', NEW.FORMA_PAGO,', descripción: ', NEW.DESCRIPCION), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_METODO_PAGO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_METODO_PAGO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_METODO_PAGO` BEFORE UPDATE ON `tbl_metodos_pago` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'UPDATE', 'Se actualizó un método de pago.', CONCAT('Información anterior: ', OLD.FORMA_PAGO,', descripción: ', OLD.DESCRIPCION),
	CONCAT('Se actualizó con la información: ', NEW.FORMA_PAGO,', descripción: ', NEW.DESCRIPCION), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_CREAR_PUESTO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_CREAR_PUESTO;
DELIMITER ;;
CREATE TRIGGER `TR_CREAR_PUESTO` BEFORE INSERT ON `tbl_mp_puesto` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'CREATE', 'Se creó un nuevo puesto.', null,
	CONCAT('Se creó un nuevo puesto de trabajo: ', NEW.PUESTO,', nuevo valor: ', NEW.DESCRIPCION_PUESTO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PUESTO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PUESTO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PUESTO` BEFORE UPDATE ON `tbl_mp_puesto` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'UPDATE', 'Se actualizó un puesto.', CONCAT('Datos anteriores: ', OLD.PUESTO,', nuevo valor: ', OLD.DESCRIPCION_PUESTO),
	CONCAT('Se actualizó el puesto de trabajo: ', NEW.PUESTO,', nuevo valor: ', NEW.DESCRIPCION_PUESTO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_MS_HIST_CONTRASENA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_MS_HIST_CONTRASENA;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_MS_HIST_CONTRASENA` BEFORE INSERT ON `tbl_ms_hist_contrasena` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.ID_USUARIO, 1, 'INSERT', 'Registro de contraseña.', NULL,
	CONCAT('INFORMACION: El usuario', NEW.ID_USUARIO,' ha registrado una nueva contraseña en el sistema.'), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_MS_PARAMETRO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_MS_PARAMETRO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_MS_PARAMETRO` BEFORE INSERT ON `tbl_ms_parametros` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.ID_USUARIO, 1, 'INSERT', 'Se ha creado un nuevo parametro.', NULL,
	CONCAT('Se creó el parametro: ', NEW.PARAMETRO,', valor registrado: ', NEW.VALOR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PARAMETRO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PARAMETRO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PARAMETRO` BEFORE UPDATE ON `tbl_ms_parametros` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Se actualizó un parametro.', CONCAT('Información anterior: ', OLD.PARAMETRO,', valor: ', OLD.VALOR),
	CONCAT('Se actualizó con la información: ', NEW.PARAMETRO,', nuevo valor: ', NEW.VALOR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_CREAR_PREGUNTA_SEGURIDAD
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_CREAR_PREGUNTA_SEGURIDAD;
DELIMITER ;;
CREATE TRIGGER `TR_CREAR_PREGUNTA_SEGURIDAD` BEFORE INSERT ON `tbl_ms_preguntas_usuario` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.CREADO_POR, 1, 'INSERT', 'Se agrego una forma de recuperación de contraseña', NULL,
	CONCAT('INFORMACION: El usuario ', NEW.ID_USUARIO,' ha registrado una pregunta y respuesta de seguridad: ', NEW.PREGUNTA ,', con respuesta encriptada por seguridad.'), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PREGUNTA_SEGURIDAD
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PREGUNTA_SEGURIDAD;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PREGUNTA_SEGURIDAD` BEFORE UPDATE ON `tbl_ms_preguntas_usuario` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se actualizo la pregunta o respuesta de seguridad.', NULL,
	CONCAT('INFORMACION: El usuario', NEW.ID_USUARIO,' ha actualizadO la pregunta o respuesta de seguridad: ', NEW.PREGUNTA ,', con respuesta encriptada por seguridad.'), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_ROL
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_ROL;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_ROL` BEFORE INSERT ON `tbl_ms_roles` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.CREADO_POR, 1, 'INSERT', 'Se ha creado un nuevo rol.', NULL,
	CONCAT('Se creó el nuevo rol: ', NEW.ROL,', con descripción: ',NEW.DESCRIPCION, ', ID relacional: ', NEW.ID_ROL), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_ROL
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_ROL;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_ROL` BEFORE UPDATE ON `tbl_ms_roles` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se actualizó un rol.', CONCAT('Antiguos datos del rol: ', OLD.ROL,', con descripción: ', OLD.DESCRIPCION),
	CONCAT('Nuevos datos del rol: ', NEW.ROL,', con descripción: ',NEW.DESCRIPCION, ', ID relacional: ', NEW.ID_ROL), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_USUARIO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_USUARIO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_USUARIO` BEFORE INSERT ON `tbl_ms_usuario` FOR EACH ROW BEGIN
	DECLARE ROL_temp VARCHAR(50);
	SELECT ROL INTO ROL_temp FROM TBL_MS_ROLES WHERE ID_ROL = NEW.ID_ROL;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.CREADO_POR, 1, 'INSERT', 'Creación de un usuario.', NULL,
	CONCAT('INFORMACION:', NEW.USUARIO,'; ',NEW.CORREO_ELECTRONICO,'; ROL: ', ROL_temp, '; REFERENCIA A PERSONA: ',NEW.ID_PERSONA), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_USUARIO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_USUARIO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_USUARIO` BEFORE UPDATE ON `tbl_ms_usuario` FOR EACH ROW BEGIN
	DECLARE ROL_temp_act VARCHAR(50);
    DECLARE ROL_temp_old VARCHAR(50);
	SELECT ROL INTO ROL_temp_act FROM TBL_MS_ROLES WHERE ID_ROL = NEW.ID_ROL;
    SELECT ROL INTO ROL_temp_old FROM TBL_MS_ROLES WHERE ID_ROL = OLD.ID_ROL;
    
    IF NEW.CONTRASENA != OLD.CONTRASENA THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se ha actualizado la contraseña.', NULL,
		CONCAT('El usuario: ', NEW.USUARIO,' actualizo su contraseña la cual fue encriptada por seguridad'), NOW());
	END IF;
    
	IF NEW.ESTADO != OLD.ESTADO AND NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se ha actualizado el estado.', NULL,
		CONCAT('El usuario: ', NEW.USUARIO,' fue dado de alta en el sistema.'), NOW());
	END IF;
    
	IF NEW.ESTADO != OLD.ESTADO AND NOT NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se ha actualizado el estado.', NULL,
		CONCAT('El usuario: ', NEW.USUARIO,' fue dado de baja en el sistema.'), NOW());
	END IF;
    
    IF NEW.ID_ROL != OLD.ID_ROL THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se ha actualizado el rol del usuario.', CONCAT('Rol anterior: ', ROL_temp_old),
		CONCAT('El nuevo rol del usuario', NEW.USUARIO,' es ', ROL_temp_act), NOW());
	END IF;
    
	IF NEW.IMG_USUARIO != OLD.IMG_USUARIO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se ha actualizado imagen del usuario.', NULL,
		CONCAT('El usuario', NEW.USUARIO,' ha actualizado su imagen de perfil URL: ', NEW.IMG_USUARIO), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_OBJETO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_OBJETO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_OBJETO` BEFORE INSERT ON `tbl_objetos` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.CREADO_POR, 1, 'INSERT', 'Se ha creado un nuevo Objeto.', NULL,
	CONCAT('Se creó el nuevo objeto: ', NEW.OBJETOS,'; ',NEW.TIPO_OBJETO,', con descripción: ',NEW.DESCRIPCION, ', ID relacional: ', NEW.ID_OBJETO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_OBJETOS
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_OBJETOS;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_OBJETOS` BEFORE UPDATE ON `tbl_objetos` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se actualizó un objeto.', CONCAT('Antiguos datos del objeto: ', OLD.OBJETOS,'; ',OLD.TIPO_OBJETO,', con descripción: ', OLD.DESCRIPCION),
	CONCAT('Nuevos datos del objeto: ', NEW.OBJETOS,'; ',NEW.TIPO_OBJETO,', con descripción: ',NEW.DESCRIPCION, ', ID relacional: ', NEW.ID_OBJETO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_PERMISOS
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_PERMISOS;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_PERMISOS` BEFORE INSERT ON `tbl_permiso` FOR EACH ROW BEGIN
	DECLARE ROL_temp VARCHAR(50);
    DECLARE OBJETO_temp VARCHAR(50);
    SELECT OBJETOS INTO OBJETO_temp FROM TBL_OBJETOS WHERE ID_OBJETO = NEW.ID_OBJETO;
    SELECT ROL INTO ROL_temp FROM TBL_MS_ROLES WHERE ID_ROL = NEW.ID_ROL;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.CREADO_POR, 1, 'INSERT', 'Se han registrado permisos para un rol.', NULL,
	CONCAT('Se insertarón permisos para el rol: ', ROL_temp,' dentro del objeto: ', OBJETO_temp ,', detalles: INSERTAR-',NEW.PERMISO_INSERCION,', ELIMINAR-', NEW.PERMISO_ELIMINACION
    ,', ACTUALIZAR-', NEW.PERMISO_ACTUALIZACION,', CONSULTAR-', NEW.PERMISO_CONSULTAR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PERMISOS
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PERMISOS;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PERMISOS` BEFORE UPDATE ON `tbl_permiso` FOR EACH ROW BEGIN
	DECLARE ROL_temp VARCHAR(50);
    DECLARE OBJETO_temp VARCHAR(50);
    SELECT OBJETOS INTO OBJETO_temp FROM TBL_OBJETOS WHERE ID_OBJETO = NEW.ID_OBJETO;
    SELECT ROL INTO ROL_temp FROM TBL_MS_ROLES WHERE ID_ROL = NEW.ID_ROL;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.MODIFICADO_POR, 1, 'UPDATE', 'Se han actualizado permisos para un rol.', NULL,
	CONCAT('Se actualozarón permisos para el rol: ', ROL_temp,' dentro del objeto: ', OBJETO_temp ,', detalles: INSERTAR-',NEW.PERMISO_INSERCION,', ELIMINAR-', NEW.PERMISO_ELIMINACION
    ,', ACTUALIZAR-', NEW.PERMISO_ACTUALIZACION,', CONSULTAR-', NEW.PERMISO_CONSULTAR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_PERSONA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_PERSONA;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_PERSONA` BEFORE INSERT ON `tbl_personas` FOR EACH ROW BEGIN
	DECLARE PUESTO_temp VARCHAR(50);
	SELECT PUESTO INTO PUESTO_temp FROM TBL_MP_PUESTO WHERE ID_PUESTO = NEW.ID_PUESTO;
        
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se ha registrado el ingreso de una nueva persona.', NULL,
	CONCAT('INFORMACION:',NEW.NOMBRE_PERSONA,' ',NEW.APELLIDO_PERSONA,'; ', NEW.RTN,', CONTACTO: ', NEW.TELEFONO,', PUESTO: ',PUESTO_temp,'; ', NEW.SUELDO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PERSONA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PERSONA;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PERSONA` BEFORE UPDATE ON `tbl_personas` FOR EACH ROW BEGIN
	DECLARE PUESTO_temp_act VARCHAR(50);
    DECLARE PUESTO_temp_old VARCHAR(50);
	SELECT PUESTO INTO PUESTO_temp_act FROM TBL_MP_PUESTO WHERE ID_PUESTO = NEW.ID_PUESTO;
	SELECT PUESTO INTO PUESTO_temp_old FROM TBL_MP_PUESTO WHERE ID_PUESTO = OLD.ID_PUESTO;  
    
    IF NEW.ID_PUESTO != OLD.ID_PUESTO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se ha actualizado el puesto de una persona.',
		CONCAT('Puesto anterior', PUESTO_temp_old,'; Salario: ', OLD.SUELDO),
		CONCAT('La persona', NEW.NOMBRE_PERSONA,' ', NEW.APELLIDO_PERSONA,' con RTN ',NEW.RTN,', fue actualizada al puesto de ', PUESTO_temp_act,'; Salario: ', NEW.SUELDO), NOW());
	END IF;
    
    IF (NEW.NOMBRE_PERSONA != OLD.NOMBRE_PERSONA) OR (NEW.APELLIDO_PERSONA != OLD.APELLIDO_PERSONA) OR (NEW.TELEFONO != OLD.TELEFONO)  THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se ha actualizado la información de una persona.',
		CONCAT('INFORMACION:', OLD.NOMBRE_PERSONA,' ', OLD.APELLIDO_PERSONA,', CONTACTO: ', OLD.TELEFONO),
		CONCAT('INFORMACION:', NEW.NOMBRE_PERSONA,' ', NEW.APELLIDO_PERSONA,', CONTACTO: ', NEW.TELEFONO), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_PRODUCTO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_PRODUCTO;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_PRODUCTO` BEFORE INSERT ON `tbl_productos` FOR EACH ROW BEGIN
	DECLARE PROVEEDOR_temp VARCHAR(50);
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = NEW.ID_PROVEEDOR;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se ingreso un nuevo producto al catálogo.', NULL,
	CONCAT('Se agrego el producto: ',NEW.NOMBRE_PRODUCTO,', ',NEW.MARCA_PRODUCTO,', del proveedor: ',PROVEEDOR_temp,' con la descripción: ', NEW.DESCRIPCION_PRODUCTO), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PRODUCTO
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PRODUCTO;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PRODUCTO` BEFORE UPDATE ON `tbl_productos` FOR EACH ROW BEGIN
	DECLARE PROVEEDOR_temp_act VARCHAR(50);
    DECLARE PROVEEDOR_temp_old VARCHAR(50);
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp_act FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = NEW.ID_PROVEEDOR;
    SELECT NOMBRE_PROVEEDOR INTO PROVEEDOR_temp_old FROM TBL_PROVEEDORES WHERE ID_PROVEEDOR = OLD.ID_PROVEEDOR;
    
    IF NEW.ESTADO != OLD.ESTADO AND NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se actualizó el estado del producto', NULL,
		CONCAT('El producto: ',NEW.NOMBRE_PRODUCTO,'; ',NEW.MARCA_PRODUCTO,', del proveedor: ',PROVEEDOR_temp_act,' cambio su estado a disponible.'), NOW());
    END IF;
    
	IF NEW.ESTADO != OLD.ESTADO AND NOT NEW.ESTADO THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se actualizó el estado del producto', NULL,
		CONCAT('El producto: ',NEW.NOMBRE_PRODUCTO,'; ',NEW.MARCA_PRODUCTO,', del proveedor: ',PROVEEDOR_temp_act,' fue deshabilitado.'), NOW());
    END IF;
    
    IF (NEW.ESTADO != OLD.ESTADO) OR (NEW.ESTADO = OLD.ESTADO) THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(1, 1, 'UPDATE', 'Se actualizo un producto del catálogo.', CONCAT('Información anterior: ',OLD.NOMBRE_PRODUCTO,', ',OLD.MARCA_PRODUCTO,', del proveedor: ',PROVEEDOR_temp_old,' con la descripción: ', OLD.DESCRIPCION_PRODUCTO),
		CONCAT('Se actualizó a: ',NEW.NOMBRE_PRODUCTO,', ',NEW.MARCA_PRODUCTO,', del proveedor: ',PROVEEDOR_temp_act,' con la descripción: ', NEW.DESCRIPCION_PRODUCTO), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_PROVEEDOR
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_PROVEEDOR;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_PROVEEDOR` BEFORE INSERT ON `tbl_proveedores` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'INSERT', 'Se ha registrado un nuevo proveedor.', NULL,
	CONCAT('Se creó un nuevo proveedor con los datos: ',NEW.NOMBRE_PROVEEDOR,'; RTN: ',NEW.RTN,', CONTACTO: ', NEW.TELEFONO_PROVEEDOR,', ',NEW.CORREO_PROVEEDOR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_PROVEEDOR
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_PROVEEDOR;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_PROVEEDOR` BEFORE UPDATE ON `tbl_proveedores` FOR EACH ROW BEGIN
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(1, 1, 'UPDATE', 'Se ha actualizado un proveedor.', CONCAT('Infromación anterior: ',OLD.NOMBRE_PROVEEDOR,'; RTN: ',OLD.RTN,', CONTACTO: ', OLD.TELEFONO_PROVEEDOR,', ',OLD.CORREO_PROVEEDOR),
	CONCAT('Se actualizó la información del proveedor: ',NEW.NOMBRE_PROVEEDOR,'; RTN: ',NEW.RTN,', CONTACTO: ', NEW.TELEFONO_PROVEEDOR,', ',NEW.CORREO_PROVEEDOR), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_INSERTAR_VENTA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_INSERTAR_VENTA;
DELIMITER ;;
CREATE TRIGGER `TR_INSERTAR_VENTA` BEFORE INSERT ON `tbl_ventas` FOR EACH ROW BEGIN
	DECLARE CLIENTE_temp VARCHAR(50);
    DECLARE PAGO_temp VARCHAR(50);
    SELECT NOMBRE_CLIENTE INTO CLIENTE_temp FROM TBL_CLIENTES WHERE ID_CLIENTE = NEW.ID_CLIENTE;
    SELECT FORMA_PAGO INTO PAGO_temp FROM TBL_METODOS_PAGO WHERE ID_PAGO = NEW.ID_PAGO;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(NEW.ID_USUARIO, 1, 'INSERT', 'Se ha comenzado el proceso de una nueva venta.', NULL,
	CONCAT('Se creó un encabezado de venta con el cliente: ',CLIENTE_temp,'; ID: ',NEW.ID_CLIENTE,', TOTAL: ',NEW.TOTAL_VENTA,', ISV: ', NEW.ISV,', PAGO: ',PAGO_temp,' Descripción: ',NEW.DESCRIPCION_VENTA), NOW());
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ACTUALIZAR_VENTA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ACTUALIZAR_VENTA;
DELIMITER ;;
CREATE TRIGGER `TR_ACTUALIZAR_VENTA` BEFORE UPDATE ON `tbl_ventas` FOR EACH ROW BEGIN
	DECLARE PAGO_temp_act VARCHAR(50);
    DECLARE PAGO_temp_old VARCHAR(50);
	DECLARE CLIENTE_temp_act VARCHAR(50);
    DECLARE CLIENTE_temp_old VARCHAR(50);
    SELECT FORMA_PAGO INTO PAGO_temp_act FROM TBL_METODOS_PAGO WHERE ID_PAGO = NEW.ID_PAGO;
    SELECT FORMA_PAGO INTO PAGO_temp_old FROM TBL_METODOS_PAGO WHERE ID_PAGO = OLD.ID_PAGO;
    SELECT NOMBRE_CLIENTE INTO CLIENTE_temp_act FROM TBL_CLIENTES WHERE ID_CLIENTE = NEW.ID_CLIENTE;
    SELECT NOMBRE_CLIENTE INTO CLIENTE_temp_old FROM TBL_CLIENTES WHERE ID_CLIENTE = OLD.ID_CLIENTE;
    
    IF NEW.ID_PAGO != OLD.ID_PAGO THEN 
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Se ha modificado la forma de pago de una venta.', CONCAT('Método de pago anterior: ', PAGO_temp_old),
		CONCAT('La venta con ID: ',NEW.ID_VENTA,', actualizo la forma de pago a: ',PAGO_temp_act), NOW());
    END IF;
    
    IF NEW.ESTADO = 1 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Finalización de venta.', NULL,
		CONCAT('Se concreto la venta con el cliente: ',CLIENTE_temp_act,'; ID: ',NEW.ID_CLIENTE,', TOTAL: ',NEW.TOTAL_VENTA,', ISV: ', NEW.ISV,', PAGO: ',PAGO_temp_act,' Descripción: ',NEW.DESCRIPCION_VENTA), NOW());
        
        INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Comisión por ventas.', NULL,
		CONCAT('Se asignó una comisión al usuario con ID: ',NEW.ID_USUARIO,', Comisión: ',NEW.COMISION_EMPLEADO,', por cencepto de la venta número: ',OLD.ID_VENTA), NOW());
    END IF;
    
    IF NEW.ESTADO = 0 THEN
		INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
		VALUES(NEW.ID_USUARIO, 1, 'UPDATE', 'Se actualizó la información de la venta.', CONCAT('Información anterior: ', CLIENTE_temp_old,'; ID: ',OLD.ID_CLIENTE,', TOTAL: ',OLD.TOTAL_VENTA,', ISV: ', OLD.ISV,', PAGO: ',PAGO_temp_old,', Descripción: ',OLD.DESCRIPCION_VENTA),
		CONCAT('Se concreto la venta con el cliente: ',CLIENTE_temp_act,'; ID: ',NEW.ID_CLIENTE,', TOTAL: ',NEW.TOTAL_VENTA,', ISV: ', NEW.ISV,', PAGO: ',PAGO_temp_act,', Descripción: ',NEW.DESCRIPCION_VENTA), NOW());
    END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: TR_ELIMINAR_VENTA
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS TR_ELIMINAR_VENTA;
DELIMITER ;;
CREATE TRIGGER `TR_ELIMINAR_VENTA` AFTER DELETE ON `tbl_ventas` FOR EACH ROW BEGIN
	DECLARE CLIENTE_temp VARCHAR(50);
    DECLARE PAGO_temp VARCHAR(50);
    SELECT NOMBRE_CLIENTE INTO CLIENTE_temp FROM TBL_CLIENTES WHERE ID_CLIENTE = OLD.ID_CLIENTE;
    SELECT FORMA_PAGO INTO PAGO_temp FROM TBL_METODOS_PAGO WHERE ID_PAGO = OLD.ID_PAGO;
    
	INSERT INTO TBL_MS_BITACORA(ID_USUARIO, ID_OBJETO, ACCION, DESCRIPCION, INFORMACION_ANTERIOR, INFORMACION_ACTUAL, FECHA_BITACORA)
	VALUES(OLD.ID_USUARIO, 1, 'DELETE', 'Se eliminado una venta.', CONCAT('Se eliminó la venta con el cliente: ',CLIENTE_temp,'; TOTAL: ',OLD.TOTAL_VENTA,', ISV: ', OLD.ISV,', PAGO: ',PAGO_temp,', Descripción: ',OLD.DESCRIPCION_VENTA),
	CONCAT('Se eliminó la venta y los articulos relacionados a esta.'), NOW());
END;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
