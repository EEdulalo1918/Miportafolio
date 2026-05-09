// ------------------------
//barra de navegacion  -  cambia al hacer scroll
//----------------------------

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    //si el scroll es mayor a 50px agrega la clase scrolled

    if(window.scrollY > 50){
        nav.classList.add('scrolled');      
    } else {
        nav.classList.remove('scrolled')
    }
});

// MENÚ HAMBURGUESA con efecto fade
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav_links');

hamburger.addEventListener('click', () => {

  // Alterna la clase 'abierto' en ambos elementos
    hamburger.classList.toggle('abierto');
    navLinks.classList.toggle('abierto');

});

// Cierra el menú al hacer clic en un link
document.querySelectorAll('.nav_links a').forEach(link => {
    link.addEventListener('click', () => {
    hamburger.classList.remove('abierto');
    navLinks.classList.remove('abierto');
    });
});

//ANIMACION AL HACER SCROLL

//seleccionamos todo los elemento con la clase 'reveal'

const elementos = document.querySelectorAll('.reveal');

//interconectionOnserver : detecta cuando un elemento estra en pantalla
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry, indice) => {
        //si el elemento es visible ne pantalla
        if(entry.isIntersecting){
            
            //espera un poco mas por cada elemeto : efecto casacada
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, indice * 80);
        }
    });
}, {threshold: 0.1}); //se activa cuando el 10% es visible


//Observa cada elemento
elementos.forEach(el => observer.observe(el));


//-----------------------------------------------
//Contador animado                              |
//-----------------------------------------------

const contadores = document.querySelectorAll('.stat_num');

const contadorObserver = new IntersectionObserver ((entries) => {
    entries.forEach( entry => {
        if(entry.isIntersecting){
            const elemento = entry.target;
            const textoOriginal = elemento.textContent;

            //extrae solo el numero, quita % Y +
            const meta = parseInt(textoOriginal);

            //si no es un numeor puro lo dejmaos igual
            if(isNaN(meta)) return;

            let actual  = 0;
            const duracion = 1500;
            const paso  = meta / (duracion /16);

            const animar = () => {
                actual += paso;
                if (actual < meta) {
                    //conserva el simbolo (% o +) si lo tenía
                    const sufijo = textoOriginal.replace(/[0-9]/g, '');
                    elemento.textContent = Math.floor(actual) + sufijo;
                    requestAnimationFrame(animar);  //llamamos al siguiente frame
                    
                } else {
                    elemento.textContent = textoOriginal; //valor final excato
                }
            };

            requestAnimationFrame(animar);
            contadorObserver.unobserve(elemento); //deja de observarlo
        }
    });
}, {threshold: 0.5});

contadores.forEach( c => contadorObserver.observe(c));

//scroll suave en los links

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); //evita el salto brusco

        const destino = document.querySelector(link.getAttribute('href'));
        if(destino){
            destino.scrollIntoView({behavior: 'smooth'});
        }
        //cierra el menu movil si esta abierto
        const links = document.querySelector('.nav_links')
        if (links) links.style.display = '';
    });
});

//FORMULARIO -- envio a formspree

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const boton = form.querySelector('button[type="submit"]');
    boton.textContent = 'Enviando..';
    boton.disabled = true;

    const datos = new FormData(form);

    try {
        const respuesta = await fetch(form.action,{
            method: 'POST',
            body: datos,
            headers: {'Accept': 'application/json'}
        });

        if (respuesta.ok) {
            boton.textContent = '¡Mensaje Enviado!'
            boton.style.background = '#059669'
            form.reset();
            
        } else {
            boton.textContent = 'Error al enviar';
            boton.style.background = '#dc2626';
        }

    } catch (error) {
        boton.textContent = 'Sin conexión';
        boton.style.background = '#dc2626';
    }

    setTimeout(() => {
        boton.textContent = 'Enviar Mensaje';
        boton.style.background = '';
        boton.disabled = false;
    }, 3000);


})

//validar entrada de datos

form.addEventListener("submit", (e) => {
    const nombre = form.nombre.value.trim();
    const mensaje = form.mensaje.value.trim();

    if(nombre.length < 5){
        alert("Nombre invalido");
        e.preventDefault();
        return
    }

    if(mensaje.length < 10){
        alert("Mensaje demasiado corto")
        e.preventDefault();
    }
});
