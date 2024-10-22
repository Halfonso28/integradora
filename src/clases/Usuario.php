<?php

class Usuario extends Conexion
{
    public function __construct()
    {
        parent::__construct();
    }
    public function cambiarContraseñaUsuario($usuario_id, $nueva_contraseña)
    {
        $stmt = $this->conexion->prepare("CALL cambiar_contraseña_usuario(?, ?)");
        $stmt->execute([$usuario_id, $nueva_contraseña]);
    }

    public function insertarUsuario($nombre, $apellido_paterno, $apellido_materno, $correo, $usuario, $contraseña, $telefono, $fecha_nacimiento, $rol)
    {
        $stmt = $this->conexion->prepare("CALL registrar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$nombre, $apellido_paterno, $apellido_materno, $correo, $usuario, $contraseña, $telefono, $fecha_nacimiento, $rol]);
    }

    public function obtenerUsuariosPorRol($rol_usuario)
    {
        $stmt = $this->conexion->prepare("CALL obtener_usuarios_por_rol(?)");
        $stmt->execute([$rol_usuario]);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function obtenerUsuarioPorId($usuario_id)
    {
        try {
            $stmt = $this->conexion->prepare("CALL obtener_usuario_por_id(?)");
            $stmt->execute([$usuario_id]);
            return $stmt->fetchObject();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }

    public function obtenerUsuarioPorSoporteId($id_soporte)
    {
        try {
            // Preparar la llamada al procedimiento almacenado
            $stmt = $this->conexion->prepare("CALL obtener_usuario_por_soporte_id(?)");

            // Ejecutar el procedimiento almacenado con el parámetro del id_soporte
            $stmt->execute([$id_soporte]);

            // Obtener el resultado como un objeto
            return $stmt->fetch(PDO::FETCH_OBJ);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return null;
        }
    }
}
