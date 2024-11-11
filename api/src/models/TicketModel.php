<?php

namespace App\Models;

use App\Models\DatabaseModel;

class TicketModel extends DatabaseModel
{
    static $tabla = "ticket";

    public static function getByUser($id=0){
        $tabla = static::$tabla;
        $query = "CALL getTicketByUserId($id)";
        return self::execute($query, "GET");
    }
}