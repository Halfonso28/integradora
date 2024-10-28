<?php

namespace App\Models;

use PDO; //Opcional new \PDO()

class DatabaseModel
{
    protected static $tabla = "";

    public static function select()
    {
        $query = "SELECT * FROM " . static::$tabla;
        return self::execute($query);
    }

    public static function getById($id = 0)
    {
        $query = "SELECT * FROM " . static::$tabla . " WHERE id ='$id'";
        $resultado = self::execute($query);
        if(count($resultado)==0){
            return null;
        }else{
            return $resultado[0];
        }
    }


    // conexion a base de datos
    protected static function execute($query)
    {
        $conexion = new PDO("mysql:host=localhost; dbname=licencias;charset=utf8mb4", "root", "mysql");
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conexion->prepare($query);
        $resultado = $stmt->execute();

        $filas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $filas[] = $row;
        }

        return $filas;
    }
}
