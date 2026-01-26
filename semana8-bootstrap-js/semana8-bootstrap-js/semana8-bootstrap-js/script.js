// ===== BOTÓN DE ALERTA =====
const btnAlerta = document.getElementById("btnAlerta");

btnAlerta.addEventListener("click", () => {
  alert("✅ Hola! Esta es una alerta personalizada con JavaScript.");
});

// ===== VALIDACIÓN DINÁMICA DEL FORMULARIO =====
const form = document.getElementById("contactForm");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorMensaje = document.getElementById("errorMensaje");

const msgForm = document.getElementById("msgForm");

function esCorreoValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function marcarInvalido(input, errorDiv, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  errorDiv.textContent = mensaje;
}

function marcarValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function validarNombre() {
  const val = nombre.value.trim();
  if (val.length < 3) {
    marcarInvalido(nombre, errorNombre, "El nombre es obligatorio (mínimo 3 caracteres).");
    return false;
  }
  marcarValido(nombre);
  return true;
}

function validarCorreo() {
  const val = correo.value.trim();
  if (!esCorreoValido(val)) {
    marcarInvalido(correo, errorCorreo, "Ingresa un correo válido (ej: correo@ejemplo.com).");
    return false;
  }
  marcarValido(correo);
  return true;
}

function validarMensaje() {
  const val = mensaje.value.trim();
  if (val.length < 10) {
    marcarInvalido(mensaje, errorMensaje, "El mensaje es obligatorio (mínimo 10 caracteres).");
    return false;
  }
  marcarValido(mensaje);
  return true;
}

// Validación en tiempo real
nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
mensaje.addEventListener("input", validarMensaje);

// Validación al enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const okNombre = validarNombre();
  const okCorreo = validarCorreo();
  const okMensaje = validarMensaje();

  if (okNombre && okCorreo && okMensaje) {
    msgForm.className = "alert alert-success";
    msgForm.textContent = "✅ Formulario enviado correctamente (simulado).";
    msgForm.classList.remove("d-none");

    form.reset();
    [nombre, correo, mensaje].forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  } else {
    msgForm.className = "alert alert-danger";
    msgForm.textContent = "❌ Revisa los campos. Hay errores en el formulario.";
    msgForm.classList.remove("d-none");
  }
});
