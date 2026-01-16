// ======= Selección de elementos =======
const form = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");

const btnEnviar = document.getElementById("btnEnviar");
const statusMsg = document.getElementById("statusMsg");

// Errores (spans)
const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");
const errorEdad = document.getElementById("errorEdad");

// ======= Reglas (Regex) =======
// Correo: simple y práctico (evita espacios y valida estructura básica)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Contraseña: mínimo 8, al menos 1 número y 1 carácter especial
const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>\/?\\|`~]).{8,}$/;

// ======= Estado de validación =======
const state = {
  nombre: false,
  correo: false,
  password: false,
  confirmPassword: false,
  edad: false,
};

// ======= Helpers UI =======
function setInvalid(inputEl, errorEl, message) {
  inputEl.classList.remove("is-valid");
  inputEl.classList.add("is-invalid");
  errorEl.textContent = message;
}

function setValid(inputEl, errorEl) {
  inputEl.classList.remove("is-invalid");
  inputEl.classList.add("is-valid");
  errorEl.textContent = "";
}

function setNeutral(inputEl, errorEl) {
  inputEl.classList.remove("is-invalid", "is-valid");
  errorEl.textContent = "";
}

function updateSubmitButton() {
  const allValid = Object.values(state).every(Boolean);
  btnEnviar.disabled = !allValid;
}

// ======= Validadores =======
function validateNombre() {
  const value = nombre.value.trim();
  if (!value) {
    state.nombre = false;
    setInvalid(nombre, errorNombre, "El nombre es obligatorio.");
    return;
  }
  if (value.length < 3) {
    state.nombre = false;
    setInvalid(nombre, errorNombre, "Debe tener al menos 3 caracteres.");
    return;
  }
  state.nombre = true;
  setValid(nombre, errorNombre);
}

function validateCorreo() {
  const value = correo.value.trim();
  if (!value) {
    state.correo = false;
    setInvalid(correo, errorCorreo, "El correo es obligatorio.");
    return;
  }
  if (!emailRegex.test(value)) {
    state.correo = false;
    setInvalid(correo, errorCorreo, "Formato inválido. Ej: nombre@dominio.com");
    return;
  }
  state.correo = true;
  setValid(correo, errorCorreo);
}

function validatePassword() {
  const value = password.value;
  if (!value) {
    state.password = false;
    setInvalid(password, errorPassword, "La contraseña es obligatoria.");
    return;
  }
  if (!passRegex.test(value)) {
    state.password = false;
    setInvalid(
      password,
      errorPassword,
      "Debe tener mínimo 8 caracteres, 1 número y 1 carácter especial."
    );
    return;
  }
  state.password = true;
  setValid(password, errorPassword);
}

function validateConfirmPassword() {
  const value = confirmPassword.value;
  if (!value) {
    state.confirmPassword = false;
    setInvalid(confirmPassword, errorConfirmPassword, "Confirma tu contraseña.");
    return;
  }
  if (value !== password.value) {
    state.confirmPassword = false;
    setInvalid(confirmPassword, errorConfirmPassword, "Las contraseñas no coinciden.");
    return;
  }
  state.confirmPassword = true;
  setValid(confirmPassword, errorConfirmPassword);
}

function validateEdad() {
  const value = edad.value.trim();
  if (!value) {
    state.edad = false;
    setInvalid(edad, errorEdad, "La edad es obligatoria.");
    return;
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    state.edad = false;
    setInvalid(edad, errorEdad, "Ingresa una edad válida.");
    return;
  }
  if (n < 18) {
    state.edad = false;
    setInvalid(edad, errorEdad, "Debes tener 18 años o más.");
    return;
  }
  state.edad = true;
  setValid(edad, errorEdad);
}

// Valida todo (útil para submit)
function validateAll() {
  validateNombre();
  validateCorreo();
  validatePassword();
  validateConfirmPassword();
  validateEdad();
  updateSubmitButton();
}

// ======= Eventos en tiempo real =======
nombre.addEventListener("input", () => {
  validateNombre();
  updateSubmitButton();
  statusMsg.textContent = "";
});

correo.addEventListener("input", () => {
  validateCorreo();
  updateSubmitButton();
  statusMsg.textContent = "";
});

password.addEventListener("input", () => {
  validatePassword();
  // Al cambiar password, también se revalida confirmación (depende de password)
  if (confirmPassword.value.length > 0) validateConfirmPassword();
  updateSubmitButton();
  statusMsg.textContent = "";
});

confirmPassword.addEventListener("input", () => {
  validateConfirmPassword();
  updateSubmitButton();
  statusMsg.textContent = "";
});

edad.addEventListener("input", () => {
  validateEdad();
  updateSubmitButton();
  statusMsg.textContent = "";
});

// (Opcional) Validar también en blur para UX
[nombre, correo, password, confirmPassword, edad].forEach((el) => {
  el.addEventListener("blur", () => {
    validateAll();
  });
});

// ======= Submit =======
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateAll();

  if (!btnEnviar.disabled) {
    // Requisito: alerta o mensaje de éxito
    alert("✅ Validación exitosa. Formulario listo para enviarse.");
    statusMsg.textContent = "✅ Validación exitosa. Datos correctos.";

    // Si quieres, puedes resetear automáticamente:
    // form.reset();
    // resetUI();
  } else {
    statusMsg.textContent = "❌ Revisa los campos marcados antes de enviar.";
  }
});

// ======= Reset =======
function resetUI() {
  // Estado
  state.nombre = false;
  state.correo = false;
  state.password = false;
  state.confirmPassword = false;
  state.edad = false;

  // UI neutral
  setNeutral(nombre, errorNombre);
  setNeutral(correo, errorCorreo);
  setNeutral(password, errorPassword);
  setNeutral(confirmPassword, errorConfirmPassword);
  setNeutral(edad, errorEdad);

  statusMsg.textContent = "";
  updateSubmitButton();
}

form.addEventListener("reset", () => {
  // Espera a que el navegador limpie los inputs
  setTimeout(() => resetUI(), 0);
});

// Estado inicial
updateSubmitButton();
