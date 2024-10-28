<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use App\Models\UsuarioModel;

class UsuarioController
{
    function getById($request, $response, $args)
    {
        $usuarios = UsuarioModel::getById(1);
        $usuarios=json_encode($usuarios);
        echo($usuarios);
        die();
        $response->getBody()->write("Hello Gay");
        return $response;
    }
}
