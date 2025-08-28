
// Product data
const products = [
  {
    id: 1,
    name: "1 KILO",
    description: "Podes elegir hasta 4 gustos",
    price: 20000,
    image: "1kg.png",
    category: "Helado",
    popular: true,
  },
  {
    id: 2,
    name: "1/2 KILO",
    description: "Podes elegir hasta 3 gustos",
    price: 12000,
    image: "mediokilo.jpg",
    category: "Helado",
    popular: true,
  },
  {
    id: 3,
    name: "1/4 KILO",
    description: "Podes elegir hasta 3 gustos",
    price: 7500,
    image: "cuartokilo.png",
    category: "Helado",
    popular: true,
  },
  {
    id: 4,
    name: "1KG PARA CELÍACOS",
    description: "Podes elegir hasta 4 gustos",
    price: 8000,
    image: "1kg.png",
    category: "Apto Celiacos",
  },
  {
    id: 5,
    name: "1/2 KG PARA CELÍACOS",
    description: "Podes elegir hasta 3 gustos",
    price: 8000,
    image: "mediokilo.jpg",
    category: "Apto Celiacos",
  },
  {
    id: 6,
    name: "1/4 KG PARA CELÍACOS",
    description: "Podes elegir hasta 3 gustos",
    price: 8000,
    image: "cuartokilo.png",
    category: "Apto Celiacos",
    popular: true,
  },
  {
    id: 7,
    name: "MILKSHAKE",
    description: "Batido de leche con bochas de helado mas crema",
    price: 8000,
    image: "milkshake.jpg",
    category: "Desayunos/Meriendas",
    popular: true,
  },
  {
    id: 8,
    name: "SUBMARINO CON ALFAJOR",
    description: "Subamarino con acompañamiento",
    price: 8000,
    image: "Diseño sin título.png",
    category: "Desayunos/Meriendas",
  },
  {
    id: 9,
    name: "BROWNIE CON HELADO",
    description: "Brownie de chocolate con bocha de helado, gusto a elección",
    price: 8000,
    image: "brownieconhelado.png",
    category: "Desayunos/Meriendas",
  },
  {
    id: 10,
    name: "CAFÉ CON LECHE Y MEDIALUNAS",
    description: "Café con leche con 2 medialunas",
    price: 5000,
    image: "ChatGPT Image 8 ago 2025, 17_01_34.png",
    category: "Desayunos/Meriendas",
    popular: true,
  },
  {
    id: 11,
    name: "CHOCOTORTA",
    description: "Porción de Chocotorta",
    price: 8000,
    image: "chocotorta2.jpg",
    category: "Tortas",
    popular: true,
  },
  {
    id: 12,
    name: "CHAJA",
    description: "Porcion de torta Chaja",
    price: 4500,
    image: "torta-chaja-foto-principal.jpg",
    category: "Tortas",
  },
  {
    id: 13,
    name: "TIRAMISÚ",
    description: "Barra de postre Tiramisú. 12 porciones",
    price: 8000,
    image: "tiramisu.png",
    category: "Postres",
  },
  {
    id: 14,
    name: "TRICOLOR",
    description: "Barra de postre Tricolor. 12 porciones",
    price: 8000,
    image: "casata.png",
    category: "Postres",
  },
]

function formatPrice(price) {
  return price.toLocaleString("es-AR") // 12000 → "12.000"
}

// Available flavors
const availableFlavors = [
  { id: "chocolate", name: "Chocolate" },
  { id: "dulce-de-leche", name: "Dulce de Leche" },
  { id: "strawberry-cream", name: "Frutilla a la Crema" },
  { id: "americana-cream", name: "Americana" },
  { id: "lemon-cream", name: "Limon" },
]

// Available toppings
const availableToppings = [
  { id: "Baño de Chocolate", name: "Baño de Chocolate", price: 500 },
  { id: "Cereales de Chocolate", name: "Cereales de Chocolate", price: 400 },
  { id: "Cucuruchos", name: "Cucuruchos", price: 800 },
  { id: "Tacitas", name: "Tacitas", price: 300 },
]

// Global variables
let cart = []
let currentCategory = "All"
let nextInstanceId = 1
let activeFlavorSelection = null // Track which product has active flavor selection
const customerInfo = {
  name: "",
  phone: "",
  address: "",
  paymentMethod: "",
  notes: "",
}

// Business hours configuration
const businessHours = {
  monday: { open: 10, close: 25 },
  tuesday: { open: 10, close: 25 },
  wednesday: { open: 10, close: 25 },
  thursday: { open: 10, close: 25 },
  friday: { open: 10, close: 27 },
  saturday: { open: 10, close: 27 },
  sunday: { open: 12, close: 27 },
}

// Helper functions for flavor selection

function getMaxFlavors(productName) {
  switch (productName) {
    case "1 KILO": return 4;
    case "1/2 KILO": return 3;
    case "1/4 KILO": return 3;
    case "BROWNIE CON HELADO": return 1;
    case "MILKSHAKE": return 3;
    case "1KG PARA CELÍACOS": return 4;
    case "1/2 KG PARA CELÍACOS": return 3;
    case "1/4 KG PARA CELÍACOS": return 3;
    default: return 0;
  }
}

function hasFlavorSelection(productName) {
  return [
    "1 KILO",
    "1/2 KILO",
    "1/4 KILO",
    "BROWNIE CON HELADO",
    "MILKSHAKE",
    "1KG PARA CELÍACOS",
    "1/2 KG PARA CELÍACOS",
    "1/4 KG PARA CELÍACOS"
  ].includes(productName);
}

// Helper functions for toppings selection

function getMaxToppings(productName) {
  return [
    "1 KILO",
    "1/2 KILO",
    "1/4 KILO",
    "1KG PARA CELÍACOS",
    "1/2 KG PARA CELÍACOS",
    "1/4 KG PARA CELÍACOS"
  ].includes(productName) ? 3 : 0;
}

function hasToppingsSelection(productName) {
  return ["1 KILO", "1/2 KILO", "1/4 KILO", "1KG PARA CELÍACOS", "1/2 KG PARA CELÍACOS", "1/4 KG PARA CELÍACOS"].includes(productName)
}

// Calculate item total price including toppings
function calculateItemTotal(item) {
  let total = item.price * item.quantity

  if (item.toppings) {
    Object.entries(item.toppings).forEach(([toppingId, count]) => {
      const topping = availableToppings.find((t) => t.id === toppingId)
      if (topping) {
        total += topping.price * count * item.quantity
      }
    })
  }

  return total
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
  updateCartDisplay()
  setupFormListeners()
  loadSavedCustomerInfo()
  updateClosedNotice()

})

// Setup form event listeners
function setupFormListeners() {
  const formFields = ["customer-name", "customer-phone", "customer-address", "payment-method", "special-notes"]
  formFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.addEventListener("input", (e) => {
        const key = fieldId
          .replace("customer-", "")
          .replace("payment-method", "paymentMethod")
          .replace("special-notes", "notes")
        customerInfo[key] = e.target.value
        updateWhatsAppButton()
      })
      field.addEventListener("change", (e) => {
        const key = fieldId
          .replace("customer-", "")
          .replace("payment-method", "paymentMethod")
          .replace("special-notes", "notes")
        customerInfo[key] = e.target.value
        updateWhatsAppButton()
      })
    }
  })
}

// Render products based on current category
function renderProducts() {
  const productsGrid = document.getElementById("products-grid")
  const filteredProducts =
    currentCategory === "All" ? products : products.filter((product) => product.category === currentCategory)

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='/placeholder.svg?height=200&width=300&text=${encodeURIComponent(product.name)}'">
                ${product.popular ? '<div class="popular-badge">Popular</div>' : ""}
            </div>
            <div class="product-info">
                <div class="product-header">
                    <div>
                        <div class="product-title">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                    </div>
                    <div class="category-badge">${product.category}</div>
                </div>
                <!-- Flavor selection now appears below product header 
                <div class="flavor-selection" id="flavor-selection-{product.id}" style="display: none;">
                    {generateProductFlavorSelection(product)}
                </div>-->
            </div>
            <div class="product-footer">
                <div class="product-price">$${formatPrice(product.price)}</div>
                <div class="product-controls">
                    ${getProductControls(product)}
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function generateProductFlavorSelection(product) {
  if (!hasFlavorSelection(product.name)) {
    return ""
  }

  const maxFlavors = getMaxFlavors(product.name)
  let html = `
    <div class="flavor-selection-content">
      <p class="flavor-title">Selecciona sabores (máx ${maxFlavors}):</p>
      <div class="flavor-list" id="flavor-list-${product.id}">
        ${availableFlavors
          .map(
            (flavor) => `
            <div class="flavor-item">
              <div class="flavor-name">
                <span>${flavor.name}</span>
              </div>
              <div class="flavor-controls">
                <button class="quantity-btn" onclick="updateTempFlavor(${product.id}, '${flavor.id}', -1)" disabled>
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display" id="temp-flavor-${product.id}-${flavor.id}">0</span>
                <button class="quantity-btn" onclick="updateTempFlavor(${product.id}, '${flavor.id}', 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          `,
          )
          .join("")}
      </div>
  `

  if (hasToppingsSelection(product.name)) {
    const maxToppings = getMaxToppings(product.name)
    html += `
      <p class="toppings-title">Toppings (máx ${maxToppings}):</p>
      <div class="toppings-list" id="toppings-list-${product.id}">
        ${availableToppings
          .map(
            (topping) => `
            <div class="topping-item">
              <div class="topping-name">
                <span>${topping.name}</span>
                <span class="topping-price">+$${topping.price}</span>
              </div>
              <div class="topping-controls">
                <button class="quantity-btn" onclick="updateTempTopping(${product.id}, '${topping.id}', -1)" disabled>
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display" id="temp-topping-${product.id}-${topping.id}">0</span>
                <button class="quantity-btn" onclick="updateTempTopping(${product.id}, '${topping.id}', 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          `,
          )
          .join("")}
      </div>
    `
  }

  html += `
      <div class="flavor-selection-actions">
        <button class="cancel-btn" onclick="cancelFlavorSelection(${product.id})">Cancelar</button>
        <button class="add-to-cart-btn" onclick="confirmAddToCart(${product.id})">Agregar al Carrito</button>
      </div>
    </div>
  `

  return html
}

const tempSelections = {}
function updateTempFlavor(productId, flavorId, change) {
  if (!tempSelections[productId]) {
    tempSelections[productId] = { flavors: {}, toppings: {} }
  }

  const product = products.find((p) => p.id === productId)
  const maxFlavors = getMaxFlavors(product.name)
  const currentFlavors = tempSelections[productId].flavors
  const totalFlavors = Object.values(currentFlavors).reduce((sum, count) => sum + count, 0)

  const currentCount = currentFlavors[flavorId] || 0
  const newCount = Math.max(0, currentCount + change)

  if (change > 0 && totalFlavors >= maxFlavors) return
  if (newCount === 0) {
    delete currentFlavors[flavorId]
  } else {
    currentFlavors[flavorId] = newCount
  }

  updateFlavorSelectionDisplay(productId)
}

function updateTempTopping(productId, toppingId, change) {
  if (!tempSelections[productId]) {
    tempSelections[productId] = { flavors: {}, toppings: {} }
  }

  const product = products.find((p) => p.id === productId)
  const maxToppings = getMaxToppings(product.name)
  const currentToppings = tempSelections[productId].toppings
  const totalToppings = Object.values(currentToppings).reduce((sum, count) => sum + count, 0)

  const currentCount = currentToppings[toppingId] || 0
  const newCount = Math.max(0, currentCount + change)

  if (change > 0 && totalToppings >= maxToppings) return
  if (newCount === 0) {
    delete currentToppings[toppingId]
  } else {
    currentToppings[toppingId] = newCount
  }

  updateToppingsSelectionDisplay(productId)
}

function updateFlavorSelectionDisplay(productId) {
  const product = products.find((p) => p.id === productId)
  const maxFlavors = getMaxFlavors(product.name)
  const selections = tempSelections[productId] || { flavors: {}, toppings: {} }
  const totalFlavors = Object.values(selections.flavors).reduce((sum, count) => sum + count, 0)
  
  availableFlavors.forEach((flavor) => {
    const countElement = document.getElementById(`temp-flavor-${productId}-${flavor.id}`)
    const minusBtn = countElement?.previousElementSibling
    const plusBtn = countElement?.nextElementSibling

    if (countElement) {
      const count = selections.flavors[flavor.id] || 0
      countElement.textContent = count

      if (minusBtn) minusBtn.disabled = count === 0
      if (plusBtn) plusBtn.disabled = totalFlavors >= maxFlavors
    }
  })
}

function updateToppingsSelectionDisplay(productId) {
  const product = products.find((p) => p.id === productId)
  const maxToppings = getMaxToppings(product.name)
  const selections = tempSelections[productId] || { flavors: {}, toppings: {} }
  const totalToppings = Object.values(selections.toppings).reduce((sum, count) => sum + count, 0)

  availableToppings.forEach((topping) => {
    const countElement = document.getElementById(`temp-topping-${productId}-${topping.id}`)
    const minusBtn = countElement?.previousElementSibling
    const plusBtn = countElement?.nextElementSibling

    if (countElement) {
      const count = selections.toppings[topping.id] || 0
      countElement.textContent = count

      if (minusBtn) minusBtn.disabled = count === 0
      if (plusBtn) plusBtn.disabled = totalToppings >= maxToppings
    }
  })
}

  // Hide any other active flavor selection
function showFlavorSelection(productId) {
  if (activeFlavorSelection && activeFlavorSelection !== productId) {
    cancelFlavorSelection(activeFlavorSelection);
  }

  activeFlavorSelection = productId;
  tempSelections[productId] = { flavors: {}, toppings: {} };

  const product = products.find(p => p.id === productId);
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContent = document.getElementById("popupContent");

  // Generar dinámicamente la selección de sabores/toppings
  popupContent.innerHTML = `
    <h2 style="color:white; margin-bottom:10px;">${product.name}</h2>
    <p style="margin-bottom:15px; color:white;">${product.description}</p>
    ${generateProductFlavorSelection(product)}
  `;

  popupOverlay.style.display = "flex";

  updateFlavorSelectionDisplay(productId);
  updateToppingsSelectionDisplay(productId);
}

function cancelFlavorSelection(productId) {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.style.display = "none";

  delete tempSelections[productId];
  activeFlavorSelection = null;
}
/*
function saveOrderToHistory(order) {
  const history = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")
  history.push(order)
  localStorage.setItem("cremolatti_order_history", JSON.stringify(history))
}*/

function confirmAddToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const selections = tempSelections[productId] || { flavors: {}, toppings: {} };

  const newItem = {
    ...product,
    quantity: 1,
    instanceId: nextInstanceId++,
    flavors: { ...selections.flavors },
    toppings: { ...selections.toppings },
  };

  cart.push(newItem);

  // Cierra popup
  cancelFlavorSelection(productId);

  updateCartDisplay();
  renderProducts();

  showSuccessMessage(`${product.name} agregado al carrito`);
}
function showSuccessMessage(message) {
  // Create and show a temporary success message
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.textContent = message
  successDiv.style.cssText = `
    position: fixed;
    top: 40px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000) 
}

// Get product controls (add to cart or quantity controls)
function getProductControls(product) {
  if (hasFlavorSelection(product.name)) {
    const instances = cart.filter((item) => item.id === product.id)
    const totalQuantity = instances.length

    if (totalQuantity > 0) {
      return `
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="removeLastInstance(${product.id})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity-display">${totalQuantity}</span>
          <button class="quantity-btn" onclick="showFlavorSelection(${product.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      `
    } else {
      return `
        <button class="add-to-cart-btn" onclick="showFlavorSelection(${product.id})">
          Agregar
        </button>
      `
    }
  } else {
    const cartItem = cart.find((item) => item.id === product.id)

    if (cartItem) {
      return `
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="removeFromCart(${product.id})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity-display">${cartItem.quantity}</span>
          <button class="quantity-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      `
    } else {
      return `
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Agregar
        </button>
      `
    }
  }
}

// Filter products by category
function filterProducts(category) {
  currentCategory = category

  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  // Scroll to category section
  if (category !== "All") {
    const categoryMap = {
      Helado: "helado-section",
      Tortas: "tortas-section",
      "Desayunos/Meriendas": "desayunos-section",
      "Apto Celiacos": "celiacos-section",
      "Postres":"postres-section"
    }

    const sectionId = categoryMap[category]
    if (sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  renderProducts()
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)

  if (hasFlavorSelection(product.name)) {
    showFlavorSelection(productId)
    return
  }

  const existingItem = cart.find((item) => item.id === productId && !hasFlavorSelection(item.name))

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const newItem = { ...product, quantity: 1, instanceId: nextInstanceId++ }
    cart.push(newItem)
  }

  updateCartDisplay()
  renderProducts()
  showSuccessMessage(`${product.name} agregado al carrito`)
}

// Remove product from cart
function removeFromCart(productId, instanceId = null) {
  if (instanceId) {
    cart = cart.filter((item) => !(item.id === productId && item.instanceId === instanceId))
  } else {
    const existingItem = cart.find((item) => item.id === productId && !hasFlavorSelection(item.name))

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1
    } else {
      cart = cart.filter((item) => item.id !== productId || hasFlavorSelection(item.name))
    }
  }

  updateCartDisplay()
  renderProducts()
}

function removeLastInstance(productId) {
  const instances = cart.filter((item) => item.id === productId)
  if (instances.length > 0) {
    const lastInstance = instances[instances.length - 1]
    removeFromCart(productId, lastInstance.instanceId)
  }
}

function getCartItemDisplayName(item, itemIndex, sameProductItems) {
  if (hasFlavorSelection(item.name) && sameProductItems.length > 1) {
    return `${item.name} #${itemIndex + 1}`
  }
  return item.name
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count")
  const cartBadge = document.getElementById("cart-badge")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")
  const totalPrice = document.getElementById("total-price")
  const customerForm = document.getElementById("customer-form")

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0)

  // Update cart count
  cartCount.textContent = totalItems
  cartBadge.textContent = totalItems
  if (totalItems > 0) {
    cartBadge.classList.add("show")
  } else {
    cartBadge.classList.remove("show")
  }

  // Update cart items - simplified display
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito esta vacio</p>'
    cartTotal.style.display = "none"
    customerForm.style.display = "none"
  } else {
    const groupedItems = {}
    cart.forEach((item) => {
      if (!groupedItems[item.id]) {
        groupedItems[item.id] = []
      }
      groupedItems[item.id].push(item)
    })

    cartItems.innerHTML = cart
      .map((item) => {
        const sameProductItems = groupedItems[item.id]
        const itemIndex = sameProductItems.findIndex((i) => i.instanceId === item.instanceId)
        const displayName = getCartItemDisplayName(item, itemIndex, sameProductItems)

        let flavorText = ""
        if (item.flavors && Object.keys(item.flavors).length > 0) {
          const flavorList = Object.entries(item.flavors)
            .map(([flavorId, count]) => {
              const flavor = availableFlavors.find((f) => f.id === flavorId)
              return flavor ? `${flavor.name} x${count}` : ""
            })
            .filter(Boolean)
            .join(", ")
          flavorText = `<div class="cart-item-flavors">Sabores: ${flavorList}</div>`
        }

        let toppingsText = ""
        if (item.toppings && Object.keys(item.toppings).length > 0) {
          const toppingsList = Object.entries(item.toppings)
            .map(([toppingId, count]) => {
              const topping = availableToppings.find((t) => t.id === toppingId)
              return topping ? `${topping.name} x${count}` : ""
            })
            .filter(Boolean)
            .join(", ")
          toppingsText = `<div class="cart-item-toppings">Toppings: ${toppingsList}</div>`
        }

        return `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${displayName}</h4>
              ${flavorText}
              ${toppingsText}
              <div class="cart-item-price">$${formatPrice(item.price)} x ${item.quantity} = $${formatPrice(calculateItemTotal(item))}</div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id}, ${item.instanceId || "null"})">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `
      })
      .join("")

    cartTotal.style.display = "block"
    totalPrice.textContent = `$${formatPrice(totalCost)}`
    customerForm.style.display = "block"
  }

  updateWhatsAppButton()
}
function generateWhatsAppMessage() {
  let message = "*Nuevo pedido Heladería*\n\n";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;

    // Sabores
    if (item.flavors && Object.keys(item.flavors).length > 0) {
      message += "\n"
      message += " Sabores:\n";
      for (const [flavorId, count] of Object.entries(item.flavors)) {
        const flavor = availableFlavors.find(f => f.id === flavorId);
        if (flavor) {
          message += `   - ${flavor.name} x${count}\n`;
        }
      }
    }

    let itemPrice = 0;//se va a ir acumulando: mas que nada para el caso de helados con toppings.

    // Toppings
    if (item.toppings && Object.keys(item.toppings).length > 0) {
      message += "\n"
      message += "Toppings:\n";
      for (const [toppingId, count] of Object.entries(item.toppings)) {
        const topping = availableToppings.find(t => t.id === toppingId);
        if (topping) {
          message += `   - ${topping.name} x${count}\n`;
          itemPrice += topping.price;
        }
      }
    }

    if (item.price) {
      itemPrice += item.price;
      totalPrice += itemPrice;
      itemPrice = formatPrice(itemPrice);
      message += `\n Precio: $${itemPrice}\n`;
    }

    message += "\n";
  });

  //const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  message += "=====================\n";
  message += `*Total: $${formatPrice(totalPrice)}*\n`;

  const nameInput = document.getElementById("customer-name")?.value || "";
  const phoneInput = document.getElementById("customer-phone")?.value || "";
  const addressInput = document.getElementById("customer-address")?.value || "";
  const specialNotes = document.getElementById("special-notes")?.value || "";

  if (nameInput || phoneInput || addressInput) {
    message += `\n *Datos del cliente*\n`;
    if (nameInput) message += `- *Nombre*: ${nameInput}\n`;
    if (phoneInput) message += `- *Teléfono*: ${phoneInput}\n`;
    if (addressInput) message += `- *Dirección*: ${addressInput}\n`;
    if (specialNotes && specialNotes!='') message += `- *Notas*: ${specialNotes}\n`;
  }

  return message;
}


// Scroll to cart section
function scrollToCart() {
  const cartSection = document.getElementById("cart-section")
  cartSection.scrollIntoView({ behavior: "smooth" })
}

// Update WhatsApp button state
function updateWhatsAppButton() {
  const whatsappBtn = document.querySelector(".whatsapp-btn")

  if (whatsappBtn) {
    const isFormValid = validateForm()
    whatsappBtn.disabled = !isFormValid || cart.length === 0
  }
}

// Validate form
function validateForm() {
  return customerInfo.name && customerInfo.phone && customerInfo.address && customerInfo.paymentMethod
}


// Send WhatsApp order
function sendWhatsAppOrder() {
  const phoneInput = document.getElementById("customer-phone").value.trim();
  //const phoneRegex = /^(\d{10})$/;
  const flexiblePhoneRegex = /^(\+?54)?\s?\d{2,4}[-\s]?\d{6,8}$/;
  if (!validateForm() || cart.length === 0) {
    alert("Por favor completa los datos y agrega productos al carrito.");
    return;
  }
    if (!flexiblePhoneRegex.test(phoneInput)) {
    alert("Por favor ingresa un número de teléfono válido.");
    return;
  }
  // Save order before sending WhatsApp message
  saveOrderToHistory()
  saveCustomerInfo()

  const phoneNumber = "5493436235883"; // sin + ni espacios
  const message = generateWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}


// Open WhatsApp (for footer button)
function openWhatsApp() {
  const phoneNumber = "5493436235883"
  const message = encodeURIComponent("¡Hola! Me gustaría hacer un pedido en Heladeria.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  window.open(whatsappUrl, "_blank")
}

function saveCustomerInfo() {
  const customerData = {
    name: customerInfo.name,
    phone: customerInfo.phone,
    address: customerInfo.address,
    paymentMethod: customerInfo.paymentMethod,
    lastOrderDate: new Date().toISOString(),
    orderCount: getOrderCount() + 1,
  }

  localStorage.setItem("cremolatti_customer_info", JSON.stringify(customerData))
}
/*
function saveOrderToHistory() {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    customer: { ...customerInfo },
    items: cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      flavors: item.flavors || {},
      toppings: item.toppings || {},
      total: calculateItemTotal(item),
    })),
    total: cart.reduce((sum, item) => sum + calculateItemTotal(item), 0),
    notes: customerInfo.notes,
  }

  orderHistory.unshift(newOrder)

  if (orderHistory.length > 50) {
    orderHistory.splice(50)
  }

  localStorage.setItem("cremolatti_order_history", JSON.stringify(orderHistory))
}*/
function saveOrderToHistory() {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")
  const currentDate = new Date()

  const newOrder = {
    id: Date.now(),
    date: currentDate.toISOString(),
    dateFormatted: currentDate.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    customer: { ...customerInfo },
    items: cart.map((item) => {
      const sameProductItems = cart.filter((cartItem) => cartItem.id === item.id)
      const itemIndex = sameProductItems.findIndex((i) => i.instanceId === item.instanceId)
      const displayName = getCartItemDisplayName(item, itemIndex, sameProductItems)

      return {
        productName: displayName,
        quantity: item.quantity,
        unitPrice: item.price,
        flavors: item.flavors || {},
        toppings: item.toppings || {},
        flavorsList: formatFlavorsForExport(item.flavors),
        toppingsList: formatToppingsForExport(item.toppings),
        itemTotal: calculateItemTotal(item),
      }
    }),
    orderTotal: cart.reduce((sum, item) => sum + calculateItemTotal(item), 0),
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  }

  orderHistory.unshift(newOrder)

  const cm = currentDate.getMonth() + 1
  const cy = currentDate.getFullYear()

  const filteredHistory = orderHistory.filter(
    (o) => Number(o.year) === cy && Number(o.month) === cm
  )

  localStorage.setItem("cremolatti_order_history", JSON.stringify(filteredHistory))

    
  // Dejo solo pedidos del mes/año actual
 /* const cm = currentDate.getMonth() + 1
  const cy = currentDate.getFullYear()
  for (let i = orderHistory.length - 1; i >= 0; i--) {
    const o = orderHistory[i]
    if (o.year !== cy || o.month !== cm) {
      orderHistory.splice(i, 1)
    }
  }*/

  // Keep last 100 orders - VER SI DEJO ESTO POR SI SE HACE MUY PESADO
  /*if (orderHistory.length > 100) {
    orderHistory.splice(100)
  }*/

  //localStorage.setItem("cremolatti_order_history", JSON.stringify(orderHistory))
}

//de la otra version de cremolatti.js
function formatFlavorsForExport(flavors) {
  if (!flavors || Object.keys(flavors).length === 0) return ""

  return Object.entries(flavors)
    .map(([flavorId, count]) => {
      const flavor = availableFlavors.find((f) => f.id === flavorId)
      return flavor ? `${flavor.name} x${count}` : ""
    })
    .filter(Boolean)
    .join(", ")
}

function formatToppingsForExport(toppings) {
  if (!toppings || Object.keys(toppings).length === 0) return ""

  return Object.entries(toppings)
    .map(([toppingId, count]) => {
      const topping = availableToppings.find((t) => t.id === toppingId)
      return topping ? `${topping.name} x${count}` : ""
    })
    .filter(Boolean)
    .join(", ")
}

function getOrderCount() {
  const savedCustomer = JSON.parse(localStorage.getItem("cremolatti_customer_info") || "{}")
  return savedCustomer.orderCount || 0
}

function loadSavedCustomerInfo() {
  const savedCustomer = JSON.parse(localStorage.getItem("cremolatti_customer_info") || "{}")

  if (savedCustomer.name) {
    const nameField = document.getElementById("customer-name")
    const phoneField = document.getElementById("customer-phone")
    const addressField = document.getElementById("customer-address")
    const paymentField = document.getElementById("payment-method")

    if (nameField) {
      nameField.value = savedCustomer.name
      customerInfo.name = savedCustomer.name
    }
    if (phoneField) {
      phoneField.value = savedCustomer.phone
      customerInfo.phone = savedCustomer.phone
    }
    if (addressField) {
      addressField.value = savedCustomer.address
      customerInfo.address = savedCustomer.address
    }
    if (paymentField) {
      paymentField.value = savedCustomer.paymentMethod
      customerInfo.paymentMethod = savedCustomer.paymentMethod
    }

    updateWhatsAppButton()
  }
}

function clearCartAfterOrder() {
  cart = []
  updateCartDisplay()

  const notesField = document.getElementById("special-notes")
  if (notesField) {
    notesField.value = ""
    customerInfo.notes = ""
  }
}

function getCustomerOrderHistory() {
  return JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")
}

function clearCustomerData() {
  localStorage.removeItem("cremolatti_customer_info")
  localStorage.removeItem("cremolatti_order_history")

  const formFields = ["customer-name", "customer-phone", "customer-address", "payment-method", "special-notes"]
  formFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) field.value = ""
  })

  Object.keys(customerInfo).forEach((key) => {
    customerInfo[key] = ""
  })

  updateWhatsAppButton()
}

function savePageLoadTime() {
  const loadTime = new Date().toISOString()
  localStorage.setItem("cremolatti_page_load_time", loadTime)
}

function isStoreOpen() {
  const now = new Date()
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const currentDay = dayNames[now.getDay()]
  const currentHour = now.getHours()

  const todayHours = businessHours[currentDay]

  if (todayHours.close > 24) {
    return currentHour >= todayHours.open || currentHour < todayHours.close - 24
  } else {
    return currentHour >= todayHours.open && currentHour < todayHours.close
  }
}

function updateClosedNotice() {
  const closedNotice = document.getElementById("closed-notice")

  if (!isStoreOpen()) {
    closedNotice.style.display = "block"
  } else {
    closedNotice.style.display = "none"
  }
}

function openHoursModal() {
  const modal = document.getElementById("hours-modal")
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeHoursModal() {
  const modal = document.getElementById("hours-modal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}
window.addEventListener("click", (e) => {
  const popupOverlay = document.getElementById("popupOverlay");
  if (e.target === popupOverlay) {
    popupOverlay.style.display = "none";
    activeFlavorSelection = null;
  }
});
