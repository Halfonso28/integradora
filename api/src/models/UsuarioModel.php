<?php

namespace App\Models;

use App\Models\DatabaseModel;

class UsuarioModel extends DatabaseModel
{
    static $tabla = "usuario";

     /**
     * Actualiza un registro por Id.
     * NOTA: Solo se actualizaran los campos: nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono.
     * 
     * Requiere que los parametros tengan el formato: "valor"
     * 
     * Ejemplo de asignacion: $valor = '"'.$valor .'"';
     * 
     * @param string $nombre Nombre nuevo.
     * @param string $apellidoPaterno Apellido paterno nuevo.
     * @param string $apellidoMaterno Apellido materno nuevo.
     * @param string $fechaNacimiento Fecha de Nacimiento nueva en formato YYYY-MM-DD.
     * @param string $telefono Numero de telefono nuevo.
     * @param int $id Id del registro a actualizar.
     * 
     * @return boolean
     */
    public static function update($nombre="", $apellidoPaterno="", $apellidoMaterno="", $fechaNacimiento="", $telefono="", $id = 0)
    {
        $tabla = static::$tabla;
        $camposValores="nombre=$nombre,apellidoPaterno=$apellidoPaterno,apellidoMaterno=$apellidoMaterno,fechaNacimiento=$fechaNacimiento,telefono=$telefono";
        $query = "CALL updateData('$tabla','$camposValores',$id)";
        return self::execute($query, "SET");
    }
    public static function login($usuario=""){
        $query = "CALL login('$usuario')";
        $resultado = self::execute($query, "GET");
        if (count($resultado) == 0) {
            return null;
        } else {
            return $resultado[0];
        }
    }
}
