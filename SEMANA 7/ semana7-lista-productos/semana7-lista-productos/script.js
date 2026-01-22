"use strict";

// Arreglo base de productos (se renderiza al cargar la página)
const products = [
  { name: "Mouse inalámbrico", price: 12.5, description: "Mouse compacto para trabajo diario." },
  { name: "Teclado mecánico", price: 35.99, description: "Teclas con buen tacto y respuesta rápida." },
  { name: "Audífonos", price: 18.0, description: "Sonido claro para clases y llamadas." },
];

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("productList");
  const template = document.getElementById("productTemplate");
  const addBtn = document.getElementById("addProductBtn");

  renderAllProducts(list, template, products);

  addBtn.addEventListener("click", () => {
    const newProduct = askProductData();
    if (!newProduct) return;

    products.push(newProduct);          // lo guardo en el arreglo
    appendOneProduct(list, template, newProduct); // lo agrego al final en el DOM
  });
});

function renderAllProducts(listEl, templateEl, productArray) {
  listEl.innerHTML = ""; // limpio por si se re-renderiza
  for (const product of productArray) {
    appendOneProduct(listEl, templateEl, product);
  }
}

function appendOneProduct(listEl, templateEl, product) {
  const clone = templateEl.content.cloneNode(true);

  const nameEl = clone.querySelector("[data-name]");
  const priceEl = clone.querySelector("[data-price]");
  const descEl = clone.querySelector("[data-desc]");

  nameEl.textContent = product.name;
  priceEl.textContent = formatUSD(product.price);
  descEl.textContent = product.description;

  listEl.appendChild(clone);
}

function askProductData() {
  const name = prompt("Nombre del producto:");
  if (name === null) return null;

  const priceStr = prompt("Precio (solo números, por ejemplo: 10.50):");
  if (priceStr === null) return null;

  const desc = prompt("Descripción breve:");
  if (desc === null) return null;

  const cleanName = name.trim();
  const cleanDesc = desc.trim();
  const price = Number.parseFloat(priceStr);

  if (!cleanName) {
    alert("El nombre no puede estar vacío.");
    return null;
  }
  if (Number.isNaN(price) || price < 0) {
    alert("El precio debe ser un número válido (mayor o igual a 0).");
    return null;
  }
  if (!cleanDesc) {
    alert("La descripción no puede estar vacía.");
    return null;
  }

  return { name: cleanName, price, description: cleanDesc };
}

function formatUSD(value) {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
