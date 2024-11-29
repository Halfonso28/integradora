<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\TicketModel;
use App\Models\CamposModel;

class TicketController
{

    function getById(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $licencia = TicketModel::getById($id);
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

    function getByUser(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        if (is_numeric($id)) {
            $data = TicketModel::getByUser($id);
            if ($data == []) {
                $response->getBody()->write("No se encontraron tickets");
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
            $usuarios = TicketModel::getAll($page);
        } else {
            $usuarios = TicketModel::getAll();
        }
        $response->getBody()->write(json_encode($usuarios));
        return $response->withStatus(200);
    }

    function add(Request $request, Response $response, $args)
    {
        $respuestas = (array)$request->getParsedBody();
        $valores= [
            'idCompra' => $respuestas['idCompra'],
            'descripcion' => $respuestas['descripcion']
        ];
        $valoresFormateados = '"' . implode(', ', array_map(fn($valor) => "'$valor'", $valores)) . '"';
        $campos = CamposModel::obtenerCamposTicket();

        if (TicketModel::add($campos, $valoresFormateados)) {
            $response->getBody()->write("Ticket creado con Exito");
            return $response->withStatus(201);
        } else {
            $response->getBody()->write("Fallo al crear ticket");
            return $response->withStatus(400);
        }
    }

    function update(Request $request, Response $response, array $args)
    {
        $body = $request->getBody()->getContents();
        $respuestas = json_decode($body, true);

        $campos = ['genero', 'plataforma', 'clasificacion', 'precio', 'urlImagen'];
        foreach ($campos as $campo) {
            $$campo = '"' . ($respuestas[$campo] ?? '') . '"';
        }

        if (TicketModel::update($genero, $plataforma, $clasificacion, $precio, $urlImagen, $args["id"])) {
            $response->getBody()->write("Registro actualizado con éxito");
            return $response->withStatus(200);
        } else {
            $response->getBody()->write("Fallo al actualizar el registro con id: " . $args["id"]);
            return $response->withStatus(400);
        }
    }


    function deleteById(Request $request, Response $response, $args)
    {
        if (TicketModel::deleteById($args["id"])) {
            $response->getBody()->write("Licencia eliminado con Exito");
            return $response->withStatus(200);
        } else {
            $response->getBody()->write("Fallo la licencia con id: " . $args["id"]);
            return $response->withStatus(400);
        }
    }
}
