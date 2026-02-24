
// cambio de tema 
const button = document.querySelector('.theme-toggle');
const icono = button.querySelector('img');

button.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    document.documentElement.removeAttribute('data-theme');
    icono.src = 'img/sol.png';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    icono.src = 'img/luna.png';
  }
});

// slider 
const track = document.querySelector('.skills_track');
const cards = document.querySelectorAll('.skill_card');

// duplicamos las tarjetas para loop infinito
track.innerHTML += track.innerHTML;

let position = 0;
let speed = 0;
const maxSpeed = 0.5;
let paused = false;

function animate() {
  // aceleración suave
  if (!paused && speed < maxSpeed) {
    speed += 0.005;
  }

  if (!paused) {
    position -= speed;
  }

  // reinicio invisible skills
  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}

// arranque suave
setTimeout(() => {
  animate();
}, 300);

// form

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página vaya a otra 

    const formData = new FormData(form);
    
    // Enviamos los datos a Formspree
    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        // Limpiamos el formulario
        form.reset(); 
        alert("¡Gracias por tu mensaje, Laura lo recibirá pronto!");
        
        // Se resetea contador de caracteres
        const contador = document.getElementById('contador');
        if(contador) contador.textContent = "0 / 500";
    } else {
        alert("Ops! Hubo un problema al enviar tu mensaje.");
    }
});
