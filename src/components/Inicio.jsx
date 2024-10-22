import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faCaretDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import "../CSS/inicio.css";
import "../CSS/fuentes.css";

const Inicio = () => {
  // Simulación del rol y usuario desde una sesión PHP
  const [rol, setRol] = useState("usuario"); // Cambia "usuario" por "soporte" para ver la otra interfaz
  const [usuario, setUsuario] = useState("Usuario Demo");

  return (
    <>
      <nav>
        <div className="contendor-menu">
          <a href="#" className="nombre-pagina">
            VIAJERO DIGITAL
          </a>
          <a href="/inicio" className="nav-enlace nav-enlace-seleccionado">
            Inicio
          </a>
          <div className="contendor-submenu">
            <p className="nav-enlace">
              Reportes <FontAwesomeIcon icon={faCaretDown} />
            </p>
            <div className="submenu">
              {rol === "usuario" && (
                <>
                  <a href="/crear_reporte" className="nav-enlace-submenu">
                    Crear
                  </a>
                  <a href="/historial_ticked" className="nav-enlace-submenu">
                    Historial
                  </a>
                </>
              )}
              {rol === "soporte" && (
                <a href="/historial_ticked" className="nav-enlace-submenu">
                  Historial
                </a>
              )}
            </div>
          </div>
          {rol === "usuario" && (
            <a href="/historial_ticked" className="nav-enlace">
              Encuesta
            </a>
          )}
          {rol === "soporte" && (
            <a href="/grafica" className="nav-enlace">
              Gráficas
            </a>
          )}
        </div>
        <div className="div-enlaces">
          <a href="#" className="nav-enlace nav-enlace-subrayado">
            {usuario}
          </a>
          <button className="nav-boton">
            <a href="/salir" className="nav-boton-a">
              Salir <FontAwesomeIcon icon={faRightFromBracket} />
            </a>
          </button>
        </div>
      </nav>

      <section className="row" id="seccion-opciones">
        {rol === "usuario" && (
          <>
            <div className="col-md-4 col-sm-12 seccion-grupo">
              <img src="/IMG/persona-laptop.jpg" alt="" className="seccion-imagen" />
              <strong className="seccion-parrafo">¿Tuviste problemas con tu viaje?</strong>
              <p className="seccion-parrafo">
                Aquí te ayudamos a resolverlo. Genera un reporte donde especifiques lo que pasó.
              </p>
              <button className="seccion-boton">
                <a href="/crear_reporte" className="seccion-boton-a">
                  Clic Aquí <FontAwesomeIcon icon={faArrowPointer} />
                </a>
              </button>
            </div>

            <div className="col-md-4 col-sm-12 seccion-grupo">
              <img src="/IMG/encuesta.jpg" alt="" className="seccion-imagen" />
              <strong className="seccion-parrafo">Satisfacción del cliente</strong>
              <p className="seccion-parrafo">
                Completa una pequeña encuesta donde nos digas cómo fue el servicio de resolución de problemas.
              </p>
              <button className="seccion-boton">
                <a href="/historial_ticked" className="seccion-boton-a">
                  Clic Aquí <FontAwesomeIcon icon={faArrowPointer} />
                </a>
              </button>
            </div>
          </>
        )}

        {rol === "soporte" && (
          <>
            <div className="col-md-4 col-sm-12 seccion-grupo">
              <img src="/IMG/persona-laptop.jpg" alt="" className="seccion-imagen" />
              <strong className="seccion-parrafo">Reportes</strong>
              <p className="seccion-parrafo">
                Accede a los reportes recientes relacionados con los viajes. Aquí podrás revisar en detalle todos los
                informes generados para los viajes realizados.
              </p>
              <button className="seccion-boton">
                <a href="/historial_ticked" className="seccion-boton-a">
                  Clic Aquí <FontAwesomeIcon icon={faArrowPointer} />
                </a>
              </button>
            </div>

            <div className="col-md-4 col-sm-12 seccion-grupo">
              <img src="/IMG/encuesta.jpg" alt="" className="seccion-imagen" />
              <strong className="seccion-parrafo">Gráficas</strong>
              <p className="seccion-parrafo">
                Accede a un análisis detallado de las calificaciones proporcionadas por los usuarios en sus reportes de
                viajes.
              </p>
              <button className="seccion-boton">
                <a href="/grafica" className="seccion-boton-a">
                  Clic Aquí <FontAwesomeIcon icon={faArrowPointer} />
                </a>
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Inicio;
