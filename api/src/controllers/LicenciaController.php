<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\LicenciaModel;
use App\Models\CamposModel;


class LicenciaController
{

    function getById(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $licencia = LicenciaModel::getById($id);
            if ($licencia == []) {
                $response->getBody()->write("No se encontro la licencia con id: " . $id);
                return $response->withStatus(404);
            } else {
                $response->getBody()->write(json_encode($licencia));
                return $response->withStatus(200);
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
            $usuarios = LicenciaModel::getAll($page);
        } else {
            $usuarios = LicenciaModel::getAll();
        }
        $response->getBody()->write(json_encode($usuarios));
        return $response->withStatus(200);
    }

    function add(Request $request,Response $response, $args)
    {
        $respuestas = (array)$request->getParsedBody();
        $valoresLicencia = [
            'codigo' => $respuestas['codigo'],
            'nombre' => $respuestas['nombre'],
            'genero' => $respuestas['genero'],
            'plataforma' => $respuestas['plataforma'],
            'clasificacion' => $respuestas['clasificacion'],
        ];
        $licenciaFormateado = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valoresLicencia)) . '"';
        $camposLicencia = CamposModel::obtenerCamposLicencia();

        if (LicenciaModel::add($camposLicencia, $licenciaFormateado)) {
            $response->getBody()->write("Licencia añadida con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Fallo al añadir licencia");
            return $response->withStatus(400);
        }
    }

    // function update(Request $request, Response $response, array $args)
    // {
    //     $body = $request->getBody()->getContents();
    //     $respuestas = json_decode($body, true);
    //     $nombre = '"' . $respuestas["nombre"] . '"';
    //     $genero = '"' . $respuestas["genero"] . '"';
    //     $plataforma = '"' . $respuestas["plataforma"] . '"';
    //     $clasificacion = '"' . $respuestas["clasificacion"] . '"';
    //     $precio = '"' . $respuestas["precio"] . '"';

    //     if (LicenciaModel::update($nombre, $apellidoPaterno, $apellidoMaterno, $fechaNacimiento, $telefono, $args["id"])) {
    //         $response->getBody()->write("Usuario actualizado con Exito");
    //         return $response->withStatus(200);
    //     } else {
    //         $response->getBody()->write("Fallo al actualizar el usuario con id: " . $args["id"]);
    //         return $response->withStatus(400);
    //     }
    // }

    // function deleteById($request, $response, $args)
    // {
    //     if (LicenciaModel::deleteById($args["id"])) {
    //         $response->getBody()->write("Usuario eliminado con Exito");
    //         return $response->withStatus(200);
    //     } else {
    //         $response->getBody()->write("Fallo al eliminar usuario");
    //         return $response->withStatus(400);
    //     }
    // }



    // Get all POST parameters
    // $params = (array)$request->getParsedBody();

    // Get a single POST parameter
    // $foo = $params['foo'];

}
