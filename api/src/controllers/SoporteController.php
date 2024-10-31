<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\SoporteModel;
use App\Models\UsuarioModel;
use App\Models\CamposModel;

class SoporteController
{

    function getById(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $soporte = SoporteModel::getById($id);
            if ($soporte != []) {
                $idUsuario = $soporte["idUsuario"];
                $usuario = UsuarioModel::getById($idUsuario);
                // Para quitar un campo que no queramos devolver.
                unset($usuario["contraseña"]);
                // Opcion Visual
                $resultado = array("id" => $id, "idUsuario" => $idUsuario) + $usuario + $soporte;
                // Opcion no visual
                // $resultado=$usuario+$soporte;
                $response->getBody()->write(json_encode($resultado));
                return $response->withStatus(200);
            } else {
                $response->getBody()->write("No se encontro al soporte con id: " . $id);
                return $response->withStatus(404);
            }
        } else {
            $response->getBody()->write("El Id debe ser un numero");
            return $response->withStatus(400);
        }
    }

    function getAll(Request $request, Response $response, $args)
    {
        if (isset($args["page"])) {
            $page = $args["page"];
            $soportes = SoporteModel::getAll($page);
            if ($soportes != []) {
                $response->getBody()->write(json_encode($soportes));
                return $response->withStatus(200);
            } else {
                $response->getBody()->write("No se encontraron soportes registrados en la pagina: " . $args["page"]);
                return $response->withStatus(404);
            }
        } else {
            $soportes = SoporteModel::getAll();
            if ($soportes != []) {
                $response->getBody()->write(json_encode($soportes));
                return $response->withStatus(200);
            } else {
                $response->getBody()->write("No se encontraron soportes registrados");
                return $response->withStatus(404);
            }
        }
    }

    function add(Request $request, Response $response, $args)
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

        if (SoporteModel::add($campos, $valores)) {
            $response->getBody()->write("Usuario añadido con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Fallo al añadir usuario");
            return $response->withStatus(400);
        }
    }

    /**
     * Actualización de Datos.
     * Solo se actualizaran los campos: nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono.
     * 
     * NOTA: Requiere un array(JSON) como entrada de datos.
     * @param mixed $request
     * @param mixed $response Respuesta a la peticion HTTP
     * @param array $args Parametros obtenidos por GET $args['param']
     * 
     * @return boolean 
     */
    function update(Request $request, Response $response, array $args)
    {
        $body = $request->getBody()->getContents();
        $respuestas = json_decode($body, true);
        $nombre = '"' . $respuestas["nombre"] . '"';
        $apellidoPaterno = '"' . $respuestas["apellidoPaterno"] . '"';
        $apellidoMaterno = '"' . $respuestas["apellidoMaterno"] . '"';
        $fechaNacimiento = '"' . $respuestas["fechaNacimiento"] . '"';
        $telefono = '"' . $respuestas["fechaNacimiento"] . '"';

        if (SoporteModel::update($nombre, $apellidoPaterno, $apellidoMaterno, $fechaNacimiento, $telefono, $args["id"])) {
            $response->getBody()->write("Usuario actualizado con Exito");
            return $response->withStatus(200);
        } else {
            $response->getBody()->write("Fallo al actualizar el usuario con id: " . $args["id"]);
            return $response->withStatus(400);
        }
    }

    function deleteById($request, $response, $args)
    {
        if (SoporteModel::deleteById($args["id"])) {
            $response->getBody()->write("Usuario eliminado con Exito");
            return $response->withStatus(200);
        } else {
            $response->getBody()->write("Fallo al eliminar usuario");
            return $response->withStatus(400);
        }
    }



    // Get all POST parameters
    // $params = (array)$request->getParsedBody();

    // Get a single POST parameter
    // $foo = $params['foo'];

}
