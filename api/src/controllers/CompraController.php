<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\CompraModel;
use App\Models\LicenciaModel;
use App\Models\CamposModel;

class CompraController
{
    function getById(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $data = CompraModel::getById($id);
            if ($data == []) {
                $response->getBody()->write("No se encontro la compra con id: " . $id);
                return $response->withStatus(404);
            } else {
                $response->getBody()->write(json_encode($data));
                return $response->withStatus(200);
            }
        } else {
            $response->getBody()->write("El Id debe ser un numero");
            return $response->withStatus(400);
        }
    }

    function getByUser(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $data1 = CompraModel::getByUser($id);
            $data2 =  LicenciaModel::getByUser($id);
            $data =array_combine($data1,$data2);
            if ($data1 == []) {
                $response->getBody()->write("No se encontraron compras");
                return $response->withStatus(404);
            } else {
                
                $response->getBody()->write(json_encode($data));
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
            $data = CompraModel::getAll($page);
        } else {
            $usuarios = CompraModel::getAll();
        }
        $response->getBody()->write(json_encode($data));
        return $response->withStatus(200);
    }

    function add(Request $request, Response $response, $args)
    {
        $respuestas = (array)$request->getParsedBody();
        $valores = [
            'idUsuario' => $respuestas['idUsuario'],
            'idLicencia' => $respuestas['idLicencia'],
        ];
        $valoresFormateados = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valores)) . '"';
        $campos = CamposModel::obtenerCamposCompra();

        if (CompraModel::add($campos, $valoresFormateados)) {
            $response->getBody()->write("Compra realizada con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Compra Fallida");
            return $response->withStatus(400);
        }
    }

    // function update(Request $request, Response $response, array $args)
    // {
    //     $body = $request->getBody()->getContents();
    //     $respuestas = json_decode($body, true);

    //     $campos = ['genero', 'plataforma', 'clasificacion', 'precio', 'urlImagen'];
    //     foreach ($campos as $campo) {
    //         $$campo = '"' . ($respuestas[$campo] ?? '') . '"';
    //     }

    //     if (TicketModel::update($genero, $plataforma, $clasificacion, $precio, $urlImagen, $args["id"])) {
    //         $response->getBody()->write("Registro actualizado con éxito");
    //         return $response->withStatus(200);
    //     } else {
    //         $response->getBody()->write("Fallo al actualizar el registro con id: " . $args["id"]);
    //         return $response->withStatus(400);
    //     }
    // }


    // function deleteById(Request $request, Response $response, $args)
    // {
    //     if (TicketModel::deleteById($args["id"])) {
    //         $response->getBody()->write("Licencia eliminado con Exito");
    //         return $response->withStatus(200);
    //     } else {
    //         $response->getBody()->write("Fallo la licencia con id: " . $args["id"]);
    //         return $response->withStatus(400);
    //     }
    // }
}
