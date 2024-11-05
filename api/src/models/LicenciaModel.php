<?php

namespace App\Models;

use App\Models\DatabaseModel;

class LicenciaModel extends DatabaseModel
{
    static $tabla = "licencias";

    /**
     * 
     * Actualiza un registro por Id.
     * NOTA: Solo se actualizaran los campos: genero, plataforma, clasificacion, precio, urlImagen.
     * 
     * Requiere que los parametros tengan el formato: "valor"
     * 
     * $campos = ['genero', 'plataforma', 'clasificacion', 'precio', 'urlImagen'];
     *  foreach ($campos as $campo) {
     *      $$campo = '"' . ($respuestas[$campo] ?? '') . '"';
     *  }
     * 
     * @param string $genero Genero nuevo.
     * @param string $plataforma Plataforma nueva.
     * @param string $clasificacion Clasificacion nueva.
     * @param string $precio Precio nuevo.
     * @param string $urlImagen Url de la imagen nueva.
     * @param int $id Id de la licencia a modificar.
     * 
     * @return boolean
     */
    public static function update($genero = "", $plataforma = "", $clasificacion = "", $precio = "", $urlImagen = "", $id = 0)
    {
        $tabla = static::$tabla;
        $camposValores = "genero=$genero, plataforma=$plataforma, clasificacion=$clasificacion, precio=$precio, urlImagen=$urlImagen";
        $query = "CALL updateData('$tabla', '$camposValores', $id)";
        return self::execute($query, "SET");
    }

    public static function generarCodigo()
    {
        $codigo = '';
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for ($i = 0; $i < 4; $i++) {
            $bloque = '';
            for ($j = 0; $j < 4; $j++) {
                $bloque .= $caracteres[mt_rand(0, strlen($caracteres) - 1)];
            }
            $codigo .= $bloque;

            if ($i < 3) {
                $codigo .= '-';
            }
        }

        return $codigo;
    }
}
