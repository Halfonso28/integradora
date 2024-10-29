<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UsuarioController;

require(__DIR__ . "/vendor/autoload.php");
//header() se utiliza para ver el archivo en json en el navegador
header('Content-Type: application/json; charset=utf-8');

$app = AppFactory::create();


//Para usar una sola vez un controlador solo usar en cadena "App\Controllers\UsuarioController:nombreFuncion"
//Ejemplo $app->get("/getUsuarios", "App\Controllers\UsuarioController:getUsuarios");

// USUARIO
$app->group('/usuarios', function (RouteCollectorProxy $group)  {
    $group->get("/getById/{id}", UsuarioController::class . ":getById");
    $group->get("/getAll", UsuarioController::class . ":getAll");
    $group->post("/add", UsuarioController::class . ":add");
    $group->delete("/{id}", UsuarioController::class . ":deleteById");
    $group->put("/{id}", UsuarioController::class . ":update");
});

$app->run();
