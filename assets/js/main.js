document.addEventListener("DOMContentLoaded", () => {
  let particleInterval = null;

  function startParticles() {
    if (particleInterval) return; // Evita duplicar
    particleInterval = setInterval(createHeart, 100);
  }

  function stopParticles() {
    if (particleInterval) {
      clearInterval(particleInterval);
      particleInterval = null;
    }
  }

  // ❤️ Partículas flotantes
  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.position = "absolute";
    heart.style.top = window.scrollY + window.innerHeight - 20 + "px";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    const duration = Math.random() * 2 + 3;
    heart.style.animationDuration = duration + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  // 🔐 Validación
  const user = { nickname: "milu", date: "2025-04-12" };
  const btnNext = document.getElementById("btnNext");
  const nickname = document.getElementById("nickname");
  const dateLove = document.getElementById("dateLove");
  const login = document.getElementById("login-section");

  // Ocultar login al inicio
  document.querySelector(".login").style.display = "none";

  // TEST: 10 seg desde ahora (para pruebas)
  // const endDate = new Date(Date.now() + 10 * 1000);

  // REAL:
  const endDate = new Date("2025-08-12T15:00:00");

  const units = {
    days: document.querySelector("#unit-days"),
    hours: document.querySelector("#unit-hours"),
    minutes: document.querySelector("#unit-minutes"),
    seconds: document.querySelector("#unit-seconds"),
  };

  function updateCountdown() {
    const now = new Date();
    const remaining = endDate - now;

    if (remaining <= 0) {
      Object.values(units).forEach((unit) => {
        unit.querySelector(".heart-value").textContent = "00";
        unit.querySelector(".heart-fill").style.height = "100%";
      });

      document.querySelector(".login").style.display = "block";
      document.querySelector(".countdown-heart").style.display = "none";

      clearInterval(timer);
      startParticles(); // 🔥 Activar partículas ahora
      return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    const progress = {
      days: 1 - days / 30,
      hours: 1 - hours / 24,
      minutes: 1 - minutes / 60,
      seconds: 1 - seconds / 60,
    };

    units.days.querySelector(".heart-value").textContent = String(
      days
    ).padStart(2, "0");
    units.hours.querySelector(".heart-value").textContent = String(
      hours
    ).padStart(2, "0");
    units.minutes.querySelector(".heart-value").textContent = String(
      minutes
    ).padStart(2, "0");
    units.seconds.querySelector(".heart-value").textContent = String(
      seconds
    ).padStart(2, "0");

    units.days.querySelector(".heart-fill").style.height = `${
      progress.days * 100
    }%`;
    units.hours.querySelector(".heart-fill").style.height = `${
      progress.hours * 100
    }%`;
    units.minutes.querySelector(".heart-fill").style.height = `${
      progress.minutes * 100
    }%`;
    units.seconds.querySelector(".heart-fill").style.height = `${
      progress.seconds * 100
    }%`;
  }

  // ❌ Desactivar partículas mientras cuenta
  stopParticles();

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    if (nickname.value.trim() === "" || dateLove.value.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (
      nickname.value.toLowerCase() !== user.nickname ||
      dateLove.value !== user.date
    ) {
      alert("Datos incorrectos. Inténtalo de nuevo.");
      return;
    }
    toggleLogin();
    renderDate();
  });

  function toggleLogin() {
    document.body.classList.add("active");
    const template = document.getElementById("template-container");
    const sitio = document.getElementById("template-section");
    const visible = login || sitio;
    if (!visible) return;

    const clone = template.content.firstElementChild.cloneNode(true);

    const temp = document.createElement("template");
    temp.innerHTML = visible.outerHTML;
    template.innerHTML = temp.innerHTML;

    visible.remove();
    document.body.insertBefore(clone, template);

    // 💌 Lógica carta
    const btn = document.getElementById("btnCarta");
    const cartaImg = document.getElementById("carta-imagen");
    const mensaje = document.getElementById("mensaje-carta");
    const texto =
      "Desde que llegaste a mi vida, todo tiene más sentido.\nTus risas se volvieron mi melodía favorita 💖";

    let abierta = false;

    btn.addEventListener("click", () => {
      if (!abierta) {
        cartaImg.src = "./assets/img/carta_opened.png";
        btn.textContent = "Cerrar";
        mensaje.classList.remove("oculto");
        escribirTexto(texto, mensaje);
        abierta = true;
      } else {
        cartaImg.src = "./assets/img/carta_closed.png";
        btn.textContent = "Abrir";
        mensaje.textContent = "";
        mensaje.classList.add("oculto");
        abierta = false;
      }
    });
  }

  function escribirTexto(texto, elemento) {
    let i = 0;
    elemento.textContent = "";
    const intervalo = setInterval(() => {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
      } else {
        clearInterval(intervalo);
      }
    }, 40);
  }

  function renderDate() {
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = meses[hoy.getMonth()];
    const año = hoy.getFullYear();
    const fechaFormateada = `${dia} ${mes} ${año}`;

    const presente = document.querySelector("#fecha-presente");
    presente.textContent = fechaFormateada;
  }

  function enviarWhatsApp() {
    const mensaje = document.getElementById("mensaje").value.trim();
    if (mensaje === "") {
      alert("Por favor, escribe un mensaje bonito 💌");
      return;
    }
    const numero = "528661122396";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    document.getElementById("mensaje").value = "";
  }

  const btnWhatsApp = document.getElementById("btnSend");
  btnWhatsApp.addEventListener("click", enviarWhatsApp);

  renderDate();
});
