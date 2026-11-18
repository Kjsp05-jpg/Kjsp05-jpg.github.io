// Menú hamburguesa: el estado visible y aria-expanded cambian juntos.
const botonMenu = document.querySelector(".nav-menu-toggle");
const menu = document.querySelector(".nav-menu");
const pantallaMovil = window.matchMedia("(max-width: 992px)");

function cambiarEstadoMenu(abierto) {
    menu.classList.toggle("active", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.setAttribute(
        "aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
    const icono = botonMenu.querySelector("i");
    icono.classList.toggle("fa-xmark", abierto);
    icono.classList.toggle("fa-bars", !abierto);
}

botonMenu.addEventListener("click", function () {
    cambiarEstadoMenu(!menu.classList.contains("active"));
});

pantallaMovil.addEventListener("change", function () {
    cambiarEstadoMenu(false);
});

menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a") && pantallaMovil.matches) {
        cambiarEstadoMenu(false);
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menu.classList.contains("active")) {
        cambiarEstadoMenu(false);
        botonMenu.focus();
    }
});

// Ir arriba: el atributo hidden controla la visibilidad, como en clase.
const botonArriba = document.querySelector(".scroll-up");
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

function mostrarBotonArriba() {
    botonArriba.hidden = window.scrollY < 400;
}

mostrarBotonArriba();
window.addEventListener("scroll", mostrarBotonArriba, { passive: true });

botonArriba.addEventListener("click", function () {
    document.querySelector("#contenido").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducirMovimiento.matches ? "instant" : "smooth" });
});

// Galería: recoge la imagen y el título de cada tarjeta y abre un diálogo nativo.
const visor = document.querySelector("#visor-fotos");

if (visor) {
    const imagenGrande = document.querySelector("#visor-imagen");
    const tituloVisor = document.querySelector("#visor-titulo");

    for (const boton of document.querySelectorAll(".abrir-foto")) {
        boton.addEventListener("click", function () {
            const foto = boton.querySelector("img");
            imagenGrande.src = foto.currentSrc || foto.src;
            imagenGrande.alt = foto.alt;
            tituloVisor.textContent = boton.closest(".gallery-card").querySelector("h3").textContent;
            visor.showModal();
        });
    }
}

// HTML5 valida los campos antes de emitir submit. La consulta es de práctica.
const formulario = document.querySelector("#consulta-foodily");

if (formulario) {
    const estado = document.querySelector("#estado-consulta");
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        estado.textContent = "Consulta validada. Los datos de demostración no se enviaron.";
    });
    formulario.addEventListener("input", function () {
        estado.textContent = "";
    });
}
