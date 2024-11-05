<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UsuarioController;
use App\Controllers\SoporteController;
use App\Controllers\LicenciaController;

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
    $group->put("/update/{id}", UsuarioController::class . ":update");//Listo
});
// Soporte
$app->group('/soporte', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", SoporteController::class . ":getById");//Listo
    $group->get("/getAll/{page}", SoporteController::class . ":getAll");//Listo
    $group->get("/getAll", SoporteController::class . ":getAll");//Listo
    $group->post("/add", SoporteController::class . ":add");//Listo
    $group->post("/upgradeUser/{id}", SoporteController::class . ":upgradeUser");//Listo
    $group->delete("/delete/{id}", SoporteController::class . ":deleteById");//Listo
    $group->put("/update/{id}", SoporteController::class . ":update");//Listo
});

// Licencia
$app->group('/licencia', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", LicenciaController::class . ":getById");//Listo
    $group->get("/getAll/{page}", LicenciaController::class . ":getAll");//Listo
    $group->get("/getAll", LicenciaController::class . ":getAll");//Listo
    $group->post("/add", LicenciaController::class . ":add");//Listo
    $group->delete("/delete/{id}", LicenciaController::class . ":deleteById");//Listo
    $group->put("/update/{id}", LicenciaController::class . ":update");//Licencia
}); 
 
// Ticket
$app->group('/ticket', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", LicenciaController::class . ":getById");//Listo
    $group->get("/getAll/{page}", LicenciaController::class . ":getAll");//Listo
    $group->get("/getAll", LicenciaController::class . ":getAll");//Listo
    $group->post("/add", LicenciaController::class . ":add");//Listo
    $group->delete("/delete/{id}", LicenciaController::class . ":deleteById");//Listo
    $group->put("/update/{id}", LicenciaController::class . ":update");//Licencia
});



$app->run();
