<?php

use Slim\Factory\AppFactory;
use App\Middleware\CorsMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestFactoryInterface as Request;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UsuarioController;
use App\Controllers\SoporteController;
use App\Controllers\LicenciaController;
use App\Controllers\TicketController;
use App\Controllers\CompraController;

require(__DIR__ . "/vendor/autoload.php");
//header() se utiliza para ver el archivo en json en el navegador
header('Content-Type: application/json; charset=utf-8');



$app = AppFactory::create();
$app->add(new CorsMiddleware());

//Para usar una sola vez un controlador solo usar en cadena "App\Controllers\UsuarioController:nombreFuncion"
//Ejemplo $app->get("/getUsuarios", "App\Controllers\UsuarioController:getUsuarios");

// USUARIO
$app->group('/usuario', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", UsuarioController::class . ":getById");//Listo
    $group->get("/getAll/{page}", UsuarioController::class . ":getAll");//Listo
    $group->get("/getAll", UsuarioController::class . ":getAll");//Listo
    $group->post("/add", UsuarioController::class . ":add");//Listo
    $group->post("/login", UsuarioController::class . ":login");//Listo
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
    $group->get("/getById/{id}", TicketController::class . ":getById");//Listo
    $group->get("/getByUser/{id}", TicketController::class . ":getByUser");//Listo
    $group->get("/getAll/{page}", TicketController::class . ":getAll");//Listo
    $group->get("/getAll", TicketController::class . ":getAll");//Listo
    $group->post("/add", TicketController::class . ":add");//Listo
    $group->delete("/delete/{id}", TicketController::class . ":deleteById");//Listo
    $group->put("/update/{id}", TicketController::class . ":update");//Listo
});

// Compra
$app->group('/compra', function (RouteCollectorProxy $group) {
    $group->get("/getById/{id}", CompraController::class . ":getById");//❌
    $group->get("/getByUser/{id}", CompraController::class . ":getByUser");//❌
    $group->get("/getAll/{page}", CompraController::class . ":getAll");//❌
    $group->get("/getAll", CompraController::class . ":getAll");//❌
    $group->post("/add", CompraController::class . ":add");//❌
    $group->delete("/delete/{id}", CompraController::class . ":deleteById");//❌
    $group->put("/update/{id}", CompraController::class . ":update");//❌
});



$app->run();
