<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use App\Models\UsuarioModel;
use App\Models\CamposModel;


class UsuarioController
{

    function getById($request, $response, $args)
    {
        $usuario = UsuarioModel::getById($args["id"]);
        if ($usuario == null) {
            $response->getBody()->write("No se encontro al usuario con id: " . $args["id"]);
            return $response->withStatus(404);
        } else {
            $response->getBody()->write(json_encode($usuario));
            return $response->withStatus(200);
        }
    }

    function getAll($request, $response, $args)
    {
        $usuarios = UsuarioModel::getAll();
        $response->getBody()->write(json_encode($usuarios));
        return $response->withStatus(200);
    }

    // Campos: usuario,contraseña,correo,estado,nombre,apellidoPaterno,apellidoMaterno,fechaNacimiento,telefono,rol
    function add($request, $response, $args)
    {
        $respuestas = (array)$request->getParsedBody();
        $respuestas["contraseña"] = password_hash($respuestas["contraseña"], PASSWORD_BCRYPT);
        // password_verify():
        // password_verify($pass, $passHash)

        $valores = '';
        foreach ($respuestas as $respuesta) {
            if ($valores == '') {
                $valores = '"' . "'$respuesta'";
            } else {
                $valores .= ", '$respuesta'";
            }
        }
        $valores = $valores . '"';


        $campos = '"';
        foreach (CamposModel::$campos["usuario"] as $campo) {
            if ($campos == '"') {
                $campos = $campo;
            } else {
                $campos .= ", $campo";
            }
        }

        if (UsuarioModel::add($campos, $valores)) {
            $response->getBody()->write("Usuario añadido con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Fallo al añadir usuario");
            return $response->withStatus(400);
        }
    }

    function deleteById($request, $response, $args)
    {
        if (UsuarioModel::deleteById($args["id"])) {
            $response->getBody()->write("Usuario eliminado con Exito");
            return $response->withStatus(200);
        } else {
            $response->getBody()->write("Fallo al eliminar usuario");
            return $response->withStatus(400);
        }
    }


    /**
     * Actualización de Datos.
     * Solo se actualizaran los campos: nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono.
     * 
     * @param mixed $request
     * @param mixed $response Respuesta a la peticion HTTP
     * @param array $args Parametros obtenidos por GET $args['param']
     * 
     * @return boolean 
     */
    function update($request, $response, $args)
    {
        $respuestas = (array)$request->getParsedBody();
        var_dump($respuestas);
        die();
        $nombre = $respuestas["nombre"];
        $apellidoPaterno = $respuestas["apellidoPaterno"];
        $apellidoMaterno = $respuestas["apellidoMaterno"];
        $fechaNacimiento = $respuestas["fechaNacimiento"];
        $telefono = $respuestas["fechaNacimiento"];

        if(UsuarioModel::update($nombre, $apellidoPaterno, $apellidoMaterno, $fechaNacimiento, $telefono, $args["id"])){
            $response->getBody()->write("Usuario actualizado con Exito");
            return $response->withStatus(200);
        }else{
            $response->getBody()->write("Fallo al actualizar el usuario con id: ".$args["id"]);
            return $response->withStatus(400);
        }
    }
    // Get all POST parameters
    // $params = (array)$request->getParsedBody();

    // Get a single POST parameter
    // $foo = $params['foo'];

}
