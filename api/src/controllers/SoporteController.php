<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\SoporteModel;
use App\Models\UsuarioModel;
use App\Models\CamposModel;
use Usuario;

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
        $valoresUsuario = [
            'usuario' => $respuestas['usuario'],
            'contraseña' => password_hash($respuestas['contraseña'], PASSWORD_BCRYPT),
            'correo' => $respuestas['correo'],
            'nombre' => $respuestas['nombre'],
            'apellidoPaterno' => $respuestas['apellidoPaterno'],
            'apellidoMaterno' => $respuestas['apellidoMaterno'],
            'fechaNacimiento' => $respuestas['fechaNacimiento'],
            'telefono' => $respuestas['telefono'],
            'rol' => "soporte"
        ];
        $usuarioFormateado = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valoresUsuario)) . '"';
        $camposUsuario = CamposModel::obtenerCamposUsuario();
        if (UsuarioModel::add($camposUsuario, $usuarioFormateado)) {
            $valoresSoporte = [
                'idUsuario' => UsuarioModel::getLastId(),
                'curp' => $respuestas['curp'],
                'rfc' => $respuestas['rfc'],
                'nss' => $respuestas['nss'],
                'urlIne' => $respuestas['urlIne']
            ];
            $soporteFormateado = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valoresSoporte)) . '"';
            $camposSoporte = CamposModel::obtenerCamposSoporte();
            if (SoporteModel::add($camposSoporte, $soporteFormateado)) {
                $response->getBody()->write("Soporte añadido con Exito");
                return $response->withStatus(201);
            } else {
                $response->getBody()->write("Fallo al añadir el soporte");
                return $response->withStatus(400);
            }
        } else {
            $response->getBody()->write("Fallo al añadir usuario");
            return $response->withStatus(400);
        }
    }

    function upgradeUser(Request $request, Response $response, $args)
    {
        $idUsuario = $args["id"];
        $respuestas = (array)$request->getParsedBody();
        $valoresSoporte = [
            'idUsuario' => $idUsuario,
            'curp' => $respuestas['curp'],
            'rfc' => $respuestas['rfc'],
            'nss' => $respuestas['nss'],
            'urlIne' => $respuestas['urlIne']
        ];
        $soporteFormateado = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valoresSoporte)) . '"';
        $camposSoporte = CamposModel::obtenerCamposSoporte();
        if (SoporteModel::add($camposSoporte, $soporteFormateado)) {
            if (UsuarioModel::upgradeUser($idUsuario, "soporte")) {
                $response->getBody()->write("Soporte añadido con Exito");
                return $response->withStatus(201);
            } else {
                $response->getBody()->write("Fallo al cambiar el rol del usuario: " . $idUsuario);
                return $response->withStatus(400);
            }
        } else {
            $response->getBody()->write("Fallo al añadir el soporte");
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
        $idSoporte = $args["id"];
        $body = $request->getBody()->getContents();
        $respuestas = json_decode($body, true);
        $curp = '"' . $respuestas["curp"] . '"';
        $rfc = '"' . $respuestas["rfc"] . '"';
        $nss = '"' . $respuestas["nss"] . '"';
        $urlIne = '"' . $respuestas["urlIne"] . '"';
        if (SoporteModel::update($curp, $rfc, $nss, $urlIne, $idSoporte)) {
            $response->getBody()->write("Soporte actualizado con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Fallo al actualizar los datos del soporte con id: " . $idSoporte);
            return $response->withStatus(400);
        }
    }

    function deleteById(Request $request, Response $response, $args)
    {
        $idSoporte = $args["id"];
        $soporte = SoporteModel::getById($idSoporte);
        if ($soporte != []) {
            if (UsuarioModel::upgradeUser($soporte["idUsuario"])) {
                if (SoporteModel::deleteById($args["id"])) {
                    $response->getBody()->write("Soporte eliminado con Exito");
                    return $response->withStatus(200);
                } else {
                    $response->getBody()->write("Fallo al eliminar el soporte con id: " . $idSoporte);
                    return $response->withStatus(400);
                }
            } else {
                $response->getBody()->write("Fallo al eliminar el soporte con id: " . $idSoporte);
                return $response->withStatus(400);
            }
        } else {
            $response->getBody()->write("No se encontro al soporte con id: " . $idSoporte);
            return $response->withStatus(400);
        }
    }



    // Get all POST parameters
    // $params = (array)$request->getParsedBody();

    // Get a single POST parameter
    // $foo = $params['foo'];

}
