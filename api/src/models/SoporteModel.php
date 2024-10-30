<?php

namespace App\Models;

use App\Models\DatabaseModel;

class SoporteModel extends DatabaseModel
{
    static $tabla = "soporte";

    /**
     * Obtiene todos los datos registrados en las tablas usuario y soporte.
     * 
     * @param int $page Numero de Pagina a buscar.
     * @param int $perPage Limite de registros por pagina.
     * @param string $condicion Condicion de seleccion de datos
     * 
     * @return array Retorna un array asociativo con los registros encontrados.
     */
    public static function getAll($page = 1, $perPage = 10, $condicion = null)
    {
        if($condicion===null){
            $condicion="usuario.id=soporte.idUsuario";
        }
        $offset = ($page - 1) * $perPage;
        $query = "CALL getAll('usuario,soporte',$perPage,$offset,'$condicion')";
        return self::execute($query, "GET");
    }
}
