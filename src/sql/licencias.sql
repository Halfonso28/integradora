/*Tabla usuario*/

CREATE TABLE `usuario` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Tabla soporte*/

CREATE TABLE `soporte` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `curp` char(18) NOT NULL UNIQUE,
  `rfc` varchar(13) NOT NULL UNIQUE,
  `numeroSeguroSocial` char(11) NOT NULL UNIQUE,
  `ine` longblob NOT NULL,
  FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Tabla Asignaciones*/

CREATE TABLE `asignaciones` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idSoporte` int(11) DEFAULT NULL,
    `idAdmin` int(11) DEFAULT NULL,
    FOREIGN KEY (`idSoporte`) REFERENCES `soporte` (`id`),
    FOREIGN KEY (`idAdmin`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*Tabla Jornada*/

CREATE TABLE `jornada` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `turno` enum('Matutino', 'Vespertino', 'Nocturno') DEFAULT NULL,
    `duracion` time NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `comentarios` varchar(256),
    `idUsuario` int(11) NOT NULL,
    FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Tabla Licencias*/

CREATE TABLE `licencias` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `codigo` char(19) NOT NULL,
    `nombre` varchar(256) NOT NULL,
    `genero` enum('Acción', 'Aventura', 'Plataformas', 'RPG', 'Estrategia', 'Simulación', 'Deportes', 'Carreras', 'Lucha', 'Shooter', 'Survival Horror', 'Puzle', 'Musical', 'MMORPG', 'Sandbox', 'Battle Royale', 'Metroidvania', 'Hack and Slash', 'Terror', 'Roguelike', 'MOBA', 'Party', 'Idle') NOT NULL,
    `plataforma` enum('PC', 'Xbox', 'PlayStation') NOT NULL,
    `clasificacion` enum('3+', '6+', '10+', '13+', '17+', '18+') NOT NULL,
    `precio` decimal(10, 2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Tabla Compra*/

CREATE TABLE `compra` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `fechaCompra` date NOT NULL,
    `idUsuario` int(11) NOT NULL,
    `idLicencias` int(11) NOT NULL,
    FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
    FOREIGN KEY (`idLicencias`) REFERENCES `licencias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Tabla Ticket*/

CREATE TABLE `ticket` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `fechaCreacion` datetime DEFAULT current_timestamp(),
  `fechaCierre` datetime DEFAULT NULL,
  `estado` enum('Nuevo', 'En progreso', 'Finalizado') DEFAULT 'Nuevo',
  `idCompra` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`),
  FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*Tabla Preguntas*/

CREATE TABLE `pregunta` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Preguntas*/

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
(10, '¿El agente fue respetuoso en todo momento?')

/*Tabla Respuestas*/

CREATE TABLE `respuestas` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `idPregunta` int(11) DEFAULT NULL,
  `calificacion` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
