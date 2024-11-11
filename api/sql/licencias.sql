-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-11-2024 a las 08:50:47
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.24

DROP DATABASE IF EXISTS licencias;

-- Crear la base de datos
CREATE DATABASE licencias;

-- Usar la base de datos creada
USE licencias;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `licencias`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteById` (IN `tabla` VARCHAR(255), IN `id` INT)   BEGIN
    SET @sql = CONCAT('DELETE FROM ', tabla, ' WHERE id = ?');
    PREPARE stmt FROM @sql;
    SET @id = id;
    EXECUTE stmt USING @id;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAll` (IN `tabla` VARCHAR(255), IN `perPage` INT, IN `afterTo` INT, IN `condicion` VARCHAR(255))   BEGIN
    SET @sql = CONCAT('SELECT * FROM ', tabla);
    IF condicion IS NOT NULL AND condicion != '' THEN
        SET @sql = CONCAT(@sql, ' WHERE ', condicion);
    END IF;
    SET @sql = CONCAT(@sql, ' LIMIT ', perPage, ' OFFSET ', afterTo);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getById` (IN `tabla` VARCHAR(255), IN `id` INT)   BEGIN
    SET @sql = CONCAT('SELECT * FROM ', tabla, ' WHERE id = ?');
    PREPARE stmt FROM @sql;
    SET @id = id;
    EXECUTE stmt USING @id;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTicketByUserId` (IN `usuarioId` INT)   BEGIN
    SELECT t.*
    FROM licencias.ticket AS t
    JOIN licencias.compra AS c ON t.idCompra = c.id
    JOIN licencias.usuario AS u ON c.idUsuario = u.id
    WHERE u.id = usuarioId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `tabla` VARCHAR(255), IN `campos` VARCHAR(255), IN `valores` VARCHAR(255))   BEGIN
    SET @sql = CONCAT('INSERT INTO ', tabla, ' (', campos, ') VALUES (', valores, ')');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateData` (IN `tabla` VARCHAR(255), IN `camposValores` VARCHAR(255), IN `id` INT(11))   BEGIN
    SET @sql = CONCAT('UPDATE ', tabla, ' SET ', camposValores, ' WHERE id = ', id);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upgradeUser` (IN `tabla` VARCHAR(100), IN `id` INT, IN `rol` VARCHAR(100))   BEGIN
    SET @sql = CONCAT('UPDATE ', tabla, ' SET rol = "', rol, '" WHERE id = ', id);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `id` int NOT NULL,
  `idSoporte` int DEFAULT NULL,
  `idAdmin` int DEFAULT NULL,
  `idJornada` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int NOT NULL,
  `fechaCompra` date NOT NULL,
  `idUsuario` int NOT NULL,
  `idLicencias` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `id` int NOT NULL,
  `turno` enum('Matutino','Vespertino','Nocturno') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `duracion` time NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `comentarios` varchar(256) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencias`
--

CREATE TABLE `licencias` (
  `id` int NOT NULL,
  `codigo` char(19) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(256) COLLATE utf8mb4_spanish_ci NOT NULL,
  `genero` enum('Acción','Aventura','Plataformas','RPG','Estrategia','Simulación','Deportes','Carreras','Lucha','Shooter','Survival Horror','Puzle','Musical','MMORPG','Sandbox','Battle Royale','Metroidvania','Hack and Slash','Terror','Roguelike','MOBA','Party','Idle') COLLATE utf8mb4_spanish_ci NOT NULL,
  `plataforma` enum('PC','Xbox','PlayStation') COLLATE utf8mb4_spanish_ci NOT NULL,
  `clasificacion` enum('3+','6+','10+','13+','17+','18+') COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `urlImagen` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT 'Sin Imagen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int NOT NULL,
  `pregunta` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `pregunta`) VALUES
(1, 'Cómo calificarías la amabilidad del agente?\r\n'),
(2, '¿El agente comprendió correctamente tu problema?'),
(3, '¿La explicación proporcionada fue clara?'),
(4, '¿El tiempo de respuesta fue adecuado?'),
(5, '¿Cómo calificarías la competencia técnica del agente?'),
(6, '¿El agente mantuvo una actitud profesional durante la conversación?'),
(7, '¿Recibiste la ayuda necesaria para resolver tu problema?'),
(8, '¿El agente te proporcionó información adicional útil?'),
(9, '¿El agente fue paciente al responder tus preguntas?'),
(10, '¿El agente fue respetuoso en todo momento?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int NOT NULL,
  `idTicket` int NOT NULL,
  `idPregunta` int DEFAULT NULL,
  `calificacion` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soporte`
--

CREATE TABLE `soporte` (
  `id` int NOT NULL,
  `idUsuario` int DEFAULT NULL,
  `curp` char(18) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rfc` varchar(13) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nss` char(11) COLLATE utf8mb4_spanish_ci NOT NULL,
  `urlIne` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT 'Sin INE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` int NOT NULL,
  `idCompra` int NOT NULL,
  `idSoporte` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaCierre` datetime DEFAULT NULL,
  `estado` enum('Nuevo','En progreso','Finalizado') COLLATE utf8mb4_spanish_ci DEFAULT 'Nuevo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `usuario` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contraseña` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `apellidoPaterno` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `apellidoMaterno` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` char(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` enum('admin','usuario','soporte') COLLATE utf8mb4_spanish_ci DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSoporte` (`idSoporte`),
  ADD KEY `idAdmin` (`idAdmin`),
  ADD KEY `asignaciones_ibfk_3` (`idJornada`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idLicencias` (`idLicencias`);

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `licencias`
--
ALTER TABLE `licencias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPregunta` (`idPregunta`),
  ADD KEY `idTicket` (`idTicket`);

--
-- Indices de la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `curp` (`curp`),
  ADD UNIQUE KEY `rfc` (`rfc`),
  ADD UNIQUE KEY `nss` (`nss`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `ticket_ibfk_3` (`idSoporte`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `licencias`
--
ALTER TABLE `licencias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `soporte`
--
ALTER TABLE `soporte`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`idSoporte`) REFERENCES `soporte` (`id`),
  ADD CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `asignaciones_ibfk_3` FOREIGN KEY (`idJornada`) REFERENCES `jornada` (`id`);

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`idLicencias`) REFERENCES `licencias` (`id`);

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`id`);

--
-- Filtros para la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD CONSTRAINT `soporte_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`idSoporte`) REFERENCES `soporte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
