-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2024 a las 20:04:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `id` int(11) NOT NULL,
  `idSoporte` int(11) DEFAULT NULL,
  `idAdmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `fechaCompra` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idLicencias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `id` int(11) NOT NULL,
  `turno` enum('Matutino','Vespertino','Nocturno') DEFAULT NULL,
  `duracion` time NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `comentarios` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencias`
--

CREATE TABLE `licencias` (
  `id` int(11) NOT NULL,
  `codigo` char(19) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `genero` enum('Acción','Aventura','Plataformas','RPG','Estrategia','Simulación','Deportes','Carreras','Lucha','Shooter','Survival Horror','Puzle','Musical','MMORPG','Sandbox','Battle Royale','Metroidvania','Hack and Slash','Terror','Roguelike','MOBA','Party','Idle') NOT NULL,
  `plataforma` enum('PC','Xbox','PlayStation') NOT NULL,
  `clasificacion` enum('3+','6+','10+','13+','17+','18+') NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) DEFAULT NULL
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
  `id` int(11) NOT NULL,
  `idPregunta` int(11) DEFAULT NULL,
  `calificacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soporte`
--

CREATE TABLE `soporte` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idJornada` int(11) DEFAULT NULL,
  `curp` char(18) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `numeroSeguroSocial` char(11) NOT NULL,
  `ine` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `idCompra` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idSoporte` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fechaCreacion` datetime DEFAULT current_timestamp(),
  `fechaCierre` datetime DEFAULT NULL,
  `estado` enum('Nuevo','En progreso','Finalizado') DEFAULT 'Nuevo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT 0,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidoPaterno` varchar(100) DEFAULT NULL,
  `apellidoMaterno` varchar(100) DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` char(10) NOT NULL,
  `rol` enum('admin','usuario','soporte') DEFAULT NULL
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
  ADD KEY `idAdmin` (`idAdmin`);

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
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `curp` (`curp`),
  ADD UNIQUE KEY `rfc` (`rfc`),
  ADD UNIQUE KEY `numeroSeguroSocial` (`numeroSeguroSocial`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `idPregunta` (`idPregunta`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `licencias`
--
ALTER TABLE `licencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `soporte`
--
ALTER TABLE `soporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`idSoporte`) REFERENCES `soporte` (`id`),
  ADD CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `usuario` (`id`);

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
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD CONSTRAINT `soporte_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `soporte_ibfk_2` FOREIGN KEY (`idJornada`) REFERENCES `jornada` (`id`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`idSoporte`) REFERENCES `soporte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Procedimientos
DELIMITER $$

CREATE PROCEDURE insertarLicencia(
    IN p_codigo CHAR(19),
    IN p_nombre VARCHAR(256),
    IN p_genero ENUM('Acción','Aventura','Plataformas','RPG','Estrategia','Simulación','Deportes','Carreras','Lucha','Shooter','Survival Horror','Puzle','Musical','MMORPG','Sandbox','Battle Royale','Metroidvania','Hack and Slash','Terror','Roguelike','MOBA','Party','Idle'),
    IN p_plataforma ENUM('PC','Xbox','PlayStation'),
    IN p_clasificacion ENUM('3+','6+','10+','13+','17+','18+'),
    IN p_precio DECIMAL(10,2)
)
BEGIN
    INSERT INTO licencias (codigo, nombre, genero, plataforma, clasificacion, precio)
    VALUES (p_codigo, p_nombre, p_genero, p_plataforma, p_clasificacion, p_precio);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE modificarLicencia(
    IN p_id INT,
    IN p_codigo CHAR(19),
    IN p_nombre VARCHAR(256),
    IN p_genero ENUM('Acción','Aventura','Plataformas','RPG','Estrategia','Simulación','Deportes','Carreras','Lucha','Shooter','Survival Horror','Puzle','Musical','MMORPG','Sandbox','Battle Royale','Metroidvania','Hack and Slash','Terror','Roguelike','MOBA','Party','Idle'),
    IN p_plataforma ENUM('PC','Xbox','PlayStation'),
    IN p_clasificacion ENUM('3+','6+','10+','13+','17+','18+'),
    IN p_precio DECIMAL(10,2)
)
BEGIN
    UPDATE licencias
    SET codigo = p_codigo, 
        nombre = p_nombre, 
        genero = p_genero, 
        plataforma = p_plataforma, 
        clasificacion = p_clasificacion, 
        precio = p_precio
    WHERE id = p_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE eliminarLicencia(
    IN p_id INT
)
BEGIN
    DELETE FROM licencias
    WHERE id = p_id;
END $$

DELIMITER ;

