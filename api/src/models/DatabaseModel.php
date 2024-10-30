<?php

namespace App\Models;

use Exception;
use PDO; //Opcional new \PDO()
use PDOException;

class DatabaseModel
{
    protected static $tabla = "";

    /**
     * Obtiene todos los datos registrados en una tabla.
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @return array Retorna un array asociativo con los registros encontrados.
     */
    public static function getAll()
    {
        $tabla = static::$tabla;
        $query = "CALL getAll('$tabla')";
        return self::execute($query, "GET");
    }

    /**
     * Obtiene los datos del un registro por id.
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @param int $id Id de del registro a obtener.
     * 
     * @return array Retorna un array asociativo con el registro encontrado.
     */
    public static function getById($id = 0)
    {
        $tabla = static::$tabla;
        $query = "CALL getById('$tabla','$id')";
        $resultado = self::execute($query, "GET");
        if (count($resultado) == 0) {
            return null;
        } else {
            return $resultado[0];
        }
    }

    /**
     * Añade un nuevo registro a una tabla
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @param string $campos lista de campos en formato 'campo1, campo2, campo3'
     * @param string $valores lista de valores en formato " 'valor1', 'valor2', 'valor3' "
     * 
     * @return boolean
     */
    public static function add($campos = "", $valores = "")
    {
        $tabla = static::$tabla;
        $query = "CALL register('$tabla', '$campos', $valores)";
        if (self::execute($query, "SET")) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Elimina un registro por Id.
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @param int $id Id del registro a eliminar.
     * 
     * @return boolean
     */
    public static function deleteById($id = 0)
    {
        $tabla = static::$tabla;
        $query = "CALL deleteById('$tabla','$id')";
        return self::execute($query, "SET");
    }

    /**
     * Actualiza un registro por Id.
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @param string $camposValores lista de campos y valores en formato 'campo1="nuevoValor1", campo2="nuevoValor2"'
     * @param int $id Id del registro a actualizar.
     * 
     * @return boolean
     */
    public static function update($camposValores = "", $id = 0)
    {
        $tabla = static::$tabla;
        $query = "CALL updateData('$tabla','$camposValores','$id')";
        return self::execute($query, "SET");
    }

    /**
     * Ejecuta las consultas a la base de datos.
     * NOTA: Necesita usar un modelo extendido de DatabaseModel para indicar la tabla a la que se le realizara la consulta.
     * 
     * @param string $query Consulta a base de datos en formato MySql.
     * @param string $type Tipo de consulta a realizar ("GET": SELECT, "SET": UPDATE, DELETE, INSERT).
     * 
     * @return [type] Retorna un array asociativo para las consultas GET y un boolean para las consultas SET.
     */
    protected static function execute($query = "", $type = null)
    {
        try {
            if (isset($type)) {
                $conexion = new PDO("mysql:host=localhost;dbname=licencias;charset=utf8mb4", "root", "mysql");
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $conexion->prepare($query);
                $resultado = $stmt->execute();
                $type = strtoupper($type);
                if ($type == "GET") {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
                } elseif ($type == "SET") {
                    return $resultado;
                }
            }
        } catch (PDOException $e) {
            error_log("Error en la ejecución de la consulta: " . $e->getMessage());
            return false;
        } finally {
            $conexion = null;
        }
    }
}
