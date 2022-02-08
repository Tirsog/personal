/*******************************/
/*           MENU              */
/*******************************/

const btn_menu = document.querySelector("span.boton_menu");
const menu = document.getElementById("togglemenu");

//Añadimos el evento click al span que forma el boton del menu
btn_menu.addEventListener('click', ToggleMenu);

/* muestra el icono de menu o el de cerrar */
function ToggleMenu() {


  if (window.matchMedia('only screen and  (max-width: 1024px)').matches) {

    //MODO MOVIL
    //Menu pequeño desplegable, mostramos u ocultamos cambiando max-height  
    if (menu.style.maxHeight == "100%") {
      menu.style.maxHeight = "0px";
      btn_menu.innerHTML = 'menu';
    } else {
      menu.style.maxHeight = "100%";
      btn_menu.innerHTML = 'close'

    }
  }
}