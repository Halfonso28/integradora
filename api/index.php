<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UsuarioController;
use App\Controllers\SoporteController;

require(__DIR__ . "/vendor/autoload.php");
//header() se utiliza para ver el archivo en json en el navegador
header('Content-Type: application/json; charset=utf-8');

$app = AppFactory::create();


//Para usar una sola vez un controlador solo usar en cadena "App\Controllers\UsuarioController:nombreFuncion"
//Ejemplo $app->get("/getUsuarios", "App\Controllers\UsuarioController:getUsuarios");

// USUARIO
$app->group('/usuario', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", UsuarioController::class . ":getById");//Listo
    $group->get("/getAll/{page}", UsuarioController::class . ":getAll");//Listo
    $group->get("/getAll", UsuarioController::class . ":getAll");//Listo
    $group->post("/add", UsuarioController::class . ":add");//Listo
    $group->delete("/delete/{id}", UsuarioController::class . ":deleteById");//Listo
    $group->put("update/{id}", UsuarioController::class . ":update");//Listo
});
//Soporte
$app->group('/soporte', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", SoporteController::class . ":getById");//Listo
    $group->get("/getAll/{page}", SoporteController::class . ":getAll");//Listo
    $group->get("/getAll", SoporteController::class . ":getAll");//Listo
    $group->post("/add", SoporteController::class . ":add");//❌
    $group->delete("/delete/{id}", SoporteController::class . ":deleteById");//❌
    $group->put("update/{id}", SoporteController::class . ":update");//❌
});

$app->run();
