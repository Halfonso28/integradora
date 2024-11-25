<?php

namespace App\Models;

/**
 * Lista de campos de las de la base de Datos licencias.sql
 */
class CamposModel
{
    public const USUARIO = [
        'usuario',
        'contraseña',
        'correo',
        'nombre',
        'apellidoPaterno',
        'apellidoMaterno',
        'fechaNacimiento',
        'telefono',
        'rol'
    ];

    public const SOPORTE = [
        'idUsuario',
        'curp',
        'rfc',
        'nss',
        'urlIne'
    ];

    public const LICENCIA = [
        'codigo',
        'nombre',
        'genero',
        'plataforma',
        'clasificacion',
        'precio',
        'urlImagen'
    ];

    public const TICKET = [
        'idCompra',
        'descripcion',
    ];

    public const COMPRA = [
        'idUsuario',
        'idLicencia',
    ];

    public static function obtenerCamposUsuario(): string
    {
        return '"' . implode(', ', self::USUARIO) . '"';
    }

    public static function obtenerCamposSoporte(): string
    {
        return '"' . implode(', ', self::SOPORTE) . '"';
    }

    public static function obtenerCamposLicencia(): string
    {
        return '"' . implode(', ', self::LICENCIA) . '"';
    }

    public static function obtenerCamposTicket(): string
    {
        return '"' . implode(', ', self::TICKET) . '"';
    }

    public static function obtenerCamposCompra(): string
    {
        return '"' . implode(', ', self::COMPRA) . '"';
    }
}
