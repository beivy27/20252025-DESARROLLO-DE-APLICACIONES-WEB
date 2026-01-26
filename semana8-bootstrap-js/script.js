const form = document.getElementById("registroForm");
const alertPlaceholder = document.getElementById("alertPlaceholder");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const pais = document.getElementById("pais");
const pass = document.getElementById("pass");
const pass2 = document.getElementById("pass2");
const terminos = document.getElementById("terminos");

const pvNombre = document.getElementById("pvNombre");
const pvEmail = document.getElementById("pvEmail");
const pvEdad = document.getElementById("pvEdad");
const pvPais = document.getElementById("pvPais");

document.getElementById("btnAlerta").addEventListener("click", () => {
  showAlert("Alerta de prueba: Bootstrap + JS funcionando ✅", "info");
});

document.getElementById("btnLimpiar").addEventListener("click", () => {
  clearPreview();
  form.classList.remove("was-validated");
});

function showAlert(message, type) {
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function updatePreview() {
  pvNombre.textContent = nombre.value.trim() || "—";
  pvEmail.textContent = email.value.trim() || "—";
  pvEdad.textContent = edad.value.trim() || "—";
  pvPais.textContent = pais.value || "—";
}

function clearPreview() {
  pvNombre.textContent = "—";
  pvEmail.textContent = "—";
  pvEdad.textContent = "—";
  pvPais.textContent = "—";
}

function validatePasswords() {
  const p1 = pass.value;
  const p2 = pass2.value;

  if (!p2) {
    pass2.setCustomValidity("required");
    return;
  }

  if (p1 !== p2) {
    pass2.setCustomValidity("no-match");
  } else {
    pass2.setCustomValidity("");
  }
}

[nombre, email, edad, pais].forEach((el) => {
  el.addEventListener("input", updatePreview);
  el.addEventListener("change", updatePreview);
});

pass.addEventListener("input", validatePasswords);
pass2.addEventListener("input", validatePasswords);

form.addEventListener("submit", (event) => {
  validatePasswords();

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    showAlert("Revisa los campos marcados en rojo ❌", "danger");
  } else {
    event.preventDefault();
    showAlert("Formulario enviado correctamente ✅", "success");
    form.reset();
    clearPreview();
    form.classList.remove("was-validated");
  }

  form.classList.add("was-validated");
});
