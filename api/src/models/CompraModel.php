<?php

namespace App\Models;

use App\Models\DatabaseModel;

class CompraModel extends DatabaseModel
{
    static $tabla = "compra";
    public static function getByUser($id=0){
        $query = "CALL getCompraByUserId($id)";
        return self::execute($query, "GET");
    }
}