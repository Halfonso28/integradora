<?php
// Permitir solicitudes desde 'http://localhost:3000'
header("Access-Control-Allow-Origin: http://localhost:3000");
// Permitir los métodos de solicitud necesarios, como GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras personalizadas, si son necesarias
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Si deseas permitir todas las solicitudes de cualquier origen, usa '*'

require_once("../clases/Conexion.class.php");
require_once("../clases/Usuario.class.php");

$classUsuario = new Usuario();

function response($status, $message, $data = null) {
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
}   

// Manejo de la solicitud GET
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if ($_GET["accion"] == "obtenerUsuarioPorId" && isset($_GET["id"])) {
        $usuarioId = intval($_GET["id"]); // Asegurarse de que el ID sea un número
        $respuesta = $classUsuario->obtenerUsuarioPorId($usuarioId);
        if ($respuesta) {
            // Retorna una respuesta exitosa con los datos del usuario
            http_response_code(200);
            echo json_encode($respuesta);
            // response('200', 'Usuario encontrado', $respuesta);
        } else {
            // Retorna un error si no se encuentra el usuario
            http_response_code(401);
            response('404', 'Usuario no encontrado');
        }
    }elseif($_GET["accion"] == "obtenerUsuariosPorRol" && isset($_GET["rol"])){
        $rol = $_GET["rol"];
        $respuesta = $classUsuario->obtenerUsuariosPorRol($rol);
        if ($respuesta) {
            // Retorna una respuesta exitosa con los datos del usuario
            http_response_code(200);
            response('200', 'Usuarios encontrado', $respuesta);
        } else {
            // Retorna un error si no se encuentra el usuario
            http_response_code(401);
            response('404', 'Usuarios no encontrados');
        }
    }
    else {
        // Manejo de acciones no válidas
        http_response_code(400);
        response('400', 'Acción no válida o parámetros faltantes');
    }
} else {
    // Manejo de métodos no permitidos
    http_response_code(405);
    response('405', 'Método no permitido');
}