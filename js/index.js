// Declaramos variables para cada jugador y elementos en el Banner HOME

let text = document.getElementById('text');   
let pele = document.getElementById('pele-home');
let elDiego = document.getElementById('diego');
let zizou = document.getElementById('zidane');
let messiHome = document.getElementById('messi-home');
let trophy = document.getElementById('trofeo-home')

// La funcionalidad se crea con un event listener de scroll para que le movimiento se ejecute con esta accion
window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 0.65 + 'px';
    pele.style.left = value * -1.2 + 'px';
    trophy.style.top = value * -0.5 + 'px';
    messiHome.style.left = value * 0.7 + 'px';
    zizou.style.left = value * 1.2 + 'px';
    elDiego.style.left = value * -0.7 + 'px';
});

// La funcionalidad del menu Burger empieza declarando las variables de cada accion.
const nav = document.querySelector("#nav");
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");

// se define la visibilidad del menu al hacer click.
openMenu.addEventListener("click", () => {
  nav.classList.add("visible");
})

closeMenu.addEventListener("click", () => {
  nav.classList.remove("visible");
})

// Funcionalidad para Volver al inicio de la pagina: BACK TO TOP icon
document.querySelectorAll('.back-to-top').forEach(button => {
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // le damos el valor smooth para que se vea suave
    });
  });
});

// Animacion del banner inicial de cada torneo  

const links = document.querySelectorAll('.dropdown__link');
  
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      });
      link.addEventListener("click", () => {
        nav.classList.remove("visible");
      })
    });

// --- 
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.banner__image');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.3
  });

  images.forEach(image => observer.observe(image));
});

// --- Event listener para la accion de scroll en las tiles   

    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, {
          threshold: 0.1
      });
  
      const animatedElements = document.querySelectorAll('.animated');
      animatedElements.forEach(element => {
          observer.observe(element);
      });
  });

// Animacion con Fade cuando las Tiles entran a la vista
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('tile--visible');
    }
  });
}, { threshold: 0.2 }); // visibilidad de un 20%

// selecciond e todas las Tiles
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => observer.observe(tile));

// Funcionalidad del modal PopUp con bloque de scroll y restaurar la posición desde donde fue ejecutado

// Selecciona todos los enlaces que ejecutan el popup en cada seccion
const viewButtons = document.querySelectorAll('[data-modal-target]');

// Esto selecciona todos los botones de "cerrar" que encontraremos dentro de las modales
const closeButtons = document.querySelectorAll('[data-close-button]');

// Variable para guardar la posicion de scroll cuando se abre un popup
let scrollPosition = 0;

// Relacionamos un click listener a cada boton de View More
viewButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault(); // Prevent default link behavior

    const modalId = button.getAttribute('data-modal-target'); // Toma el target ID de la modal
    const modal = document.querySelector(modalId); // para encontrar la modal correspondiente

    if (modal) {
      openModal(modal);
    }
  });
});

// Se le pone un click listener a cada boton de cerrar en las modales
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal'); // Busca la modal parent mas cercana

    if (modal) {
      closeModal(modal);
    }
  });
});

// Funcionalidad al abrir una Modal
function openModal(modal) {
  scrollPosition = window.scrollY || window.pageYOffset; // captura la posicion actual de scroll

  modal.classList.add('modal--active'); // añadimos la clase para mostrar el modal
  document.body.classList.add('modal--open'); // añadimos clase para deshabilitar el scroll

  // bloqueamos el body scroll y se fija la posicion
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

// Funcion al cerrar una modal
function closeModal(modal) {
  modal.classList.remove('modal--active'); // Clase remove para ocultar la modal
  document.body.classList.remove('modal--open'); // permite hacer scroll en el body de nuevo

  // restaura el comportamiento del scroll en el body
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  // Vuelve a la posicion de scroll anterior 
  window.scrollTo(0, scrollPosition);
}