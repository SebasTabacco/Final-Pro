// public/javascripts/dropdownLogin.js
function expandLogin() {
    const container = document.getElementById("login-container");
    container.classList.toggle("expanded");
  }
  
  // Opcional: cerrar el dropdown al hacer clic fuera
  document.addEventListener("click", function(event) {
    const container = document.getElementById("login-container");
    const icon = document.querySelector(".login-icon");
    if (!container.contains(event.target) && !icon.contains(event.target)) {
      container.classList.remove("expanded");
    }
  });
  