"use strict";

const imageUrlInput = document.querySelector("#imageUrl");
const addBtn = document.querySelector("#addBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const clearSelectionBtn = document.querySelector("#clearSelectionBtn");
const gallery = document.querySelector("#gallery");
const statusText = document.querySelector("#statusText");
const counter = document.querySelector("#counter");

let selectedImg = null;

function setStatus(message, type = "") {
  statusText.textContent = message;
  statusText.className = `status ${type}`.trim();
}

function updateCounter() {
  const total = gallery.querySelectorAll("img.thumb").length;
  counter.textContent = `${total} ${total === 1 ? "imagen" : "imágenes"}`;
}

function setButtonsState() {
  const hasSelection = Boolean(selectedImg);
  deleteBtn.disabled = !hasSelection;
  clearSelectionBtn.disabled = !hasSelection;
}

function deselectAll() {
  gallery.querySelectorAll("img.thumb.selected").forEach(img => img.classList.remove("selected"));
  selectedImg = null;
  setButtonsState();
}

function isValidImageUrl(url) {
  try {
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) return false;

    const path = u.pathname.toLowerCase();
    const looksLikeImage =
      path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png") ||
      path.endsWith(".gif") || path.endsWith(".webp") || path.endsWith(".svg");

    return looksLikeImage || u.search.length > 0;
  } catch {
    return false;
  }
}

function createImageElement(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Imagen agregada por el usuario";
  img.className = "thumb adding";
  img.loading = "lazy";

  img.addEventListener("error", () => {
    if (img === selectedImg) {
      selectedImg = null;
      setButtonsState();
    }
    img.remove();
    updateCounter();
    setStatus("No se pudo cargar la imagen. Verifica la URL.", "err");
  });

  img.addEventListener("animationend", () => {
    img.classList.remove("adding");
  }, { once: true });

  return img;
}

function addImage() {
  const url = imageUrlInput.value.trim();

  if (!url) {
    setStatus("Ingresa una URL antes de agregar.", "warn");
    imageUrlInput.focus();
    return;
  }

  if (!isValidImageUrl(url)) {
    setStatus("URL inválida o no parece imagen (usa http/https).", "err");
    imageUrlInput.focus();
    return;
  }

  const img = createImageElement(url);
  gallery.appendChild(img);

  imageUrlInput.value = "";
  imageUrlInput.focus();

  updateCounter();
  setStatus("Imagen agregada correctamente.", "ok");
}

function selectImage(img) {
  deselectAll();
  img.classList.add("selected");
  selectedImg = img;
  setButtonsState();
  setStatus("Imagen seleccionada.", "ok");
}

function deleteSelectedImage() {
  if (!selectedImg) {
    setStatus("No hay una imagen seleccionada para eliminar.", "warn");
    return;
  }

  const imgToRemove = selectedImg;
  selectedImg = null;
  setButtonsState();

  imgToRemove.classList.add("removing");
  imgToRemove.addEventListener("animationend", () => {
    imgToRemove.remove();
    updateCounter();
    setStatus("Imagen eliminada.", "ok");
  }, { once: true });
}

/* Eventos */
addBtn.addEventListener("click", addImage);
deleteBtn.addEventListener("click", deleteSelectedImage);

clearSelectionBtn.addEventListener("click", () => {
  deselectAll();
  setStatus("Selección removida.", "ok");
});

imageUrlInput.addEventListener("input", () => {
  const value = imageUrlInput.value.trim();
  if (!value) {
    setStatus("Escribe una URL para agregar una imagen.", "");
    return;
  }
  if (isValidImageUrl(value)) {
    setStatus("URL válida. Puedes agregar (Ctrl+Enter).", "ok");
  } else {
    setStatus("Parece una URL inválida o no es imagen.", "warn");
  }
});

// Delegación de eventos para imágenes dinámicas
gallery.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLImageElement)) return;
  if (!target.classList.contains("thumb")) return;
  selectImage(target);
});

// keydown (atajos)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    imageUrlInput.focus();
    return;
  }

  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();
    addImage();
    return;
  }

  if (e.key === "Delete") {
    deleteSelectedImage();
    return;
  }

  if (e.key === "Escape" && selectedImg) {
    deselectAll();
    setStatus("Selección removida (Esc).", "ok");
  }
});

/* Init */
updateCounter();
setButtonsState();
setStatus("Listo. Ingresa una URL para comenzar.", "");
