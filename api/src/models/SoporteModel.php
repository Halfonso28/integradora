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

     /**
     * Actualiza un registro por Id.
     * NOTA: Solo se actualizaran los campos: curp, rfc, nss, urlIne
     * 
     * Requiere que los parametros tengan el formato: "valor"
     * 
     * Ejemplo de asignacion: $valor = '"'.$valor .'"';
     * 
     * @param string $curp CURP nuevo.
     * @param string $rfc RFC nuevo.
     * @param string $nss NSS nuevo.
     * @param string $urlIne url de la imagen local del Ine.
     * @param int $id Id del registro a actualizar.
     * 
     * @return boolean
     */
    public static function update($curp="", $rfc="", $nss="", $urlIne="", $id = 0)
    {
        $tabla = static::$tabla;
        $camposValores="curp=$curp,rfc=$rfc,nss=$nss,urlIne=$urlIne";
        $query = "CALL updateData('$tabla','$camposValores',$id)";
        return self::execute($query, "SET");
    }
}
