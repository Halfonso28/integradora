<?php

namespace App\Models;

/**
 * Lista de campos de las de la base de Datos licencias.sql
 */
class CamposModel
{
    public static $campos = array(
        "usuario" => array(
            'usuario',
            'contraseña',
            'correo',
            'estado',
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'fechaNacimiento',
            'telefono',
            'rol'
        )
    );
}
