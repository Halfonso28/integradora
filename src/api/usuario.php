<?php
// Permitir solicitudes desde 'http://localhost:3000'
header("Access-Control-Allow-Origin: http://localhost:3000");
// Permitir los métodos de solicitud necesarios, como GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras personalizadas, si son necesarias
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Si deseas permitir todas las solicitudes de cualquier origen, usa '*'

require_once("../clases/Conexion.php");
require_once("../clases/Usuario.php");

$classUsuario = new Usuario();

// Manejo de la solicitud GET
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if ($_GET["accion"] == "obtenerUsuarioPorId" && isset($_GET["id"])) {
        $usuarioId = $_GET["id"];
        $respuesta = $classUsuario->obtenerUsuarioPorId($usuarioId);
        if ($respuesta) {
            // Retorna una respuesta exitosa con los datos del usuario
            echo json_encode([$respuesta]);
        } else {
            // Retorna un error si no se encuentra el usuario
            echo json_encode([
                'codigoEstado' => '401',
                'message' => 'Usuario no encontrado'
            ]);
        }
    } else {
        // Manejo de acciones no válidas
        echo json_encode([
            'status' => 'error',
            'message' => 'Acción no válida'
        ]);
    }
} else {
    // Manejo de métodos no permitidos
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido'
    ]);
}
