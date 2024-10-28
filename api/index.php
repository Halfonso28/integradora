<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use App\Controllers\UsuarioController;

require(__DIR__ . "/vendor/autoload.php");

$app = AppFactory::create();

//Para usar una sola vez un controlador solo usar en cadena "App\Controllers\UsuarioController:nombreFuncion"
//Ejemplo $app->get("/getUsuarios", "App\Controllers\UsuarioController:getUsuarios");

$app->get("/getById", UsuarioController::class . ":getById");
$app->get("/hola", function ($request, $response, $args) {
    $response->getBody()->write("Hello");
    return $response;
});
// $app->post("");

$app->run();
