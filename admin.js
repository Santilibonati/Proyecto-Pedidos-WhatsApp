// Admin functionality for order management
/*
const availableFlavors = [
  { id: "chocolate", name: "Chocolate" },
  { id: "dulce-de-leche", name: "Dulce de Leche" },
  { id: "strawberry-cream", name: "Frutilla a la Crema" },
  { id: "americana-cream", name: "Americana a la Crema" },
  { id: "lemon", name: "Limón" },
  { id: "coconut", name: "Coco" },
  { id: "mint-chip", name: "Menta Granizada" },
  { id: "cookies-cream", name: "Cookies & Cream" },
]

const availableToppings = [
  { id: "chocolate-chips", name: "Chips de Chocolate", price: 50 },
  { id: "nuts", name: "Nueces", price: 75 },
  { id: "caramel", name: "Caramelo", price: 60 },
  { id: "whipped-cream", name: "Crema Batida", price: 40 },
]
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
}*/
/*
async function exportOrdersToExcel(exportType = "current_month", buttonEl = null) {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  let filteredOrders = orderHistory
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  if (exportType === "current_month") {
    filteredOrders = orderHistory.filter((order) => order.month === currentMonth && order.year === currentYear)
  } else { // exportType === "current_day"
    const currentDay = currentDate.getDate()
    filteredOrders = orderHistory.filter((order) => order.day === currentDay && order.month === currentMonth && order.year === currentYear)
  }

  if (filteredOrders.length === 0) {
    alert("No hay pedidos para exportar en el período seleccionado.")
    return
  }

  try {
    if (buttonEl) {
      var originalText = buttonEl.textContent
      buttonEl.textContent = "Generando Excel..."
      buttonEl.disabled = true

      // Crear formulario oculto
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "http://localhost:8000/export_orders.php"; // Asegurate del puerto correcto
      form.target = "_blank"; // Para que se abra en una nueva pestaña
      form.style.display = "none";

      // Crear input oculto con los datos
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "payload";
      input.value = JSON.stringify(payload);

      // Adjuntar input al formulario
      form.appendChild(input);
      document.body.appendChild(form);

      // Enviar formulario
      form.submit();

      // Opcional: eliminar el formulario del DOM después de enviarlo
      document.body.removeChild(form);

      alert("Archivo Excel generado y descargado exitosamente!")
    }  

  } catch (error) {
    console.error("Error exporting to Excel:", error)
    alert("Error al generar el archivo Excel: " + error.message)
  } finally {
    if (buttonEl) {
      buttonEl.textContent = originalText
      buttonEl.disabled = false
    }
  }
}*/

async function exportOrdersToExcel(exportType = "current_month", buttonEl = null) {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  let filteredOrders = orderHistory
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  if (exportType === "current_month") {
    filteredOrders = orderHistory.filter((order) => order.month === currentMonth && order.year === currentYear)
  } else {
    const currentDay = currentDate.getDate()
    filteredOrders = orderHistory.filter((order) => order.day === currentDay && order.month === currentMonth && order.year === currentYear)
  }

  if (filteredOrders.length === 0) {
    alert("No hay pedidos para exportar en el período seleccionado.")
    return
  }

  try {
    if (buttonEl) {
      var originalText = buttonEl.textContent
      buttonEl.textContent = "Generando Excel..."
      buttonEl.disabled = true
    }
    const slimOrders = filteredOrders.map((order) => {
      return {
        ...order,
        items: (order.items || []).map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          itemTotal: item.itemTotal
        })),
      }
    })

    const payload = {
      orders: slimOrders,
      exportType: exportType
    }

    // Crear formulario oculto - lo que se envia al backend
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "http://localhost:8000/export_orders.php"
    //form.action = "export_orders.php"
    form.target = "_blank"
    form.style.display = "none"

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "payload"
    input.value = JSON.stringify(payload)

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    alert("Archivo Excel generado y descargado exitosamente!")
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    alert("Error al generar el archivo Excel: " + error.message)
  } finally {
    if (buttonEl) {
      buttonEl.textContent = originalText
      buttonEl.disabled = false
    }
  }
}


function getPaymentMethodName(method) {
  const paymentMethods = {
    cash: "Efectivo",
    card: "Tarjetas de Débito/Crédito",
    digital: "Mercado Pago",
    bank: "Transferencia",
  }
  return paymentMethods[method] || method
}
/*
function getOrderStatistics(month = null, year = null) {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  let filteredOrders = orderHistory
  if (month && year) {
    filteredOrders = orderHistory.filter((order) => order.month === month && order.year === year)
  }

  const stats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, order) => sum + order.orderTotal, 0),
    averageOrderValue: 0,
    topProducts: {},
    topFlavors: {},
    paymentMethods: {},
  }

  if (stats.totalOrders > 0) {
    stats.averageOrderValue = stats.totalRevenue / stats.totalOrders
  }

  // Calculate top products and flavors
  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      // Count products
      stats.topProducts[item.productName] = (stats.topProducts[item.productName] || 0) + item.quantity

      // Count flavors
      Object.entries(item.flavors || {}).forEach(([flavorId, count]) => {
        const flavor = availableFlavors.find((f) => f.id === flavorId)
        if (flavor) {
          stats.topFlavors[flavor.name] = (stats.topFlavors[flavor.name] || 0) + count
        }
      })
    })

    // Count payment methods
    const paymentMethod = getPaymentMethodName(order.customer.paymentMethod)
    stats.paymentMethods[paymentMethod] = (stats.paymentMethods[paymentMethod] || 0) + 1
  })

  return stats
}*/

/* esto me interesa verlo, por eso no lo borro - cande
function showOrderStatistics() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const todayStats = getOrderStatistics(day, month, year)
  const monthStats = getOrderStatistics(null, month, year)

  const statsMessage = `
  📊 ESTADÍSTICAS DE PEDIDOS

  📅 Hoy (${day}/${month}/${year}):
  • Total pedidos: ${todayStats.totalOrders}
  • Ingresos totales: $${todayStats.totalRevenue.toFixed(2)}
  • Promedio por pedido: $${todayStats.averageOrderValue.toFixed(2)}

  📅 Este mes (${month}/${year}):
  • Total pedidos: ${monthStats.totalOrders}
  • Ingresos totales: $${monthStats.totalRevenue.toFixed(2)}
  • Promedio por pedido: $${monthStats.averageOrderValue.toFixed(2)}

  🍦 Productos más vendidos (hoy):
  ${Object.entries(todayStats.topProducts)
    .sort(([,a],[,b]) => b-a)
    .slice(0,3)
    .map(([p,c]) => `• ${p}: ${c} u.`).join("\n")}
    `
  alert(statsMessage)
}

function getOrderStatistics(day = null, month = null, year = null) {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  let filteredOrders = orderHistory
  if (day && month && year) {
    filteredOrders = orderHistory.filter((order) => 
      order.day === day && order.month === month && order.year === year
    )
  } else if (month && year) {
    filteredOrders = orderHistory.filter((order) => order.month === month && order.year === year)
  }

  const stats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, order) => sum + order.orderTotal, 0),
    averageOrderValue: 0,
    topProducts: {},
    topFlavors: {},
    paymentMethods: {},
  }

  if (stats.totalOrders > 0) {
    stats.averageOrderValue = stats.totalRevenue / stats.totalOrders
  }

  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      stats.topProducts[item.productName] = (stats.topProducts[item.productName] || 0) + item.quantity
      Object.entries(item.flavors || {}).forEach(([flavorId, count]) => {
        const flavor = availableFlavors.find((f) => f.id === flavorId)
        if (flavor) stats.topFlavors[flavor.name] = (stats.topFlavors[flavor.name] || 0) + count
      })
    })
    const paymentMethod = getPaymentMethodName(order.customer.paymentMethod)
    stats.paymentMethods[paymentMethod] = (stats.paymentMethods[paymentMethod] || 0) + 1
  })

  return stats
}*/

function showOrderStatistics() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const todayStats = getOrderStatistics(day, month, year)
  const monthStats = getOrderStatistics(null, month, year)

  const statsMessage = `
📊 ESTADÍSTICAS DE PEDIDOS

📅 Hoy (${day}/${month}/${year}):
• Total pedidos: ${todayStats.totalOrders}
• Ingresos totales: $${todayStats.totalRevenue.toFixed(2)}
• Promedio por pedido: $${todayStats.averageOrderValue.toFixed(2)}

📅 Este mes (${month}/${year}):
• Total pedidos: ${monthStats.totalOrders}
• Ingresos totales: $${monthStats.totalRevenue.toFixed(2)}
• Promedio por pedido: $${monthStats.averageOrderValue.toFixed(2)}

🍦 Productos más vendidos (hoy):
${Object.entries(todayStats.topProducts)
  .sort(([,a],[,b]) => b-a)
  .slice(0,3)
  .map(([p,c]) => `• ${p}: ${c} u.`)
  .join("\n")}
  `
  alert(statsMessage)
}

function getOrderStatistics(day = null, month = null, year = null) {
  const raw = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")

  // Normaliza cada pedido: rellena day/month/year si faltan y normaliza el total
  const orders = raw.map((order) => {
    let d = order.day, m = order.month, y = order.year

    if (d == null || m == null || y == null) {
      let parsed = null
      if (order.date) {
        const t = new Date(order.date)
        if (!Number.isNaN(t.getTime())) parsed = t
      }
      if (!parsed && order.dateFormatted) {
        // Espera "dd/mm/yyyy ..." -> usa solo la parte de fecha
        const onlyDate = String(order.dateFormatted).split(" ")[0]
        const [dd, mm, yyyy] = (onlyDate || "").split("/")
        if (dd && mm && yyyy) {
          const t = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
          if (!Number.isNaN(t.getTime())) parsed = t
        }
      }
      if (parsed) {
        if (d == null) d = parsed.getDate()
        if (m == null) m = parsed.getMonth() + 1
        if (y == null) y = parsed.getFullYear()
      }
    }

    const totalNumber = Number(order.orderTotal ?? order.total ?? 0)
    return {
      ...order,
      day: d,
      month: m,
      year: y,
      __total: Number.isNaN(totalNumber) ? 0 : totalNumber,
    }
  })

  // Filtrado robusto por día/mes/año
  const filtered = orders.filter((o) => {
    if (day != null && o.day !== day) return false
    if (month != null && o.month !== month) return false
    if (year != null && o.year !== year) return false
    return true
  })

  const stats = {
    totalOrders: filtered.length,
    totalRevenue: filtered.reduce((sum, o) => sum + o.__total, 0),
    averageOrderValue: 0,
    topProducts: {},
    topFlavors: {},
    paymentMethods: {},
  }

  if (stats.totalOrders > 0) {
    stats.averageOrderValue = stats.totalRevenue / stats.totalOrders
  }

  // Acumula productos / sabores / métodos de pago (con defensas)
  filtered.forEach((order) => {
    (order.items || []).forEach((item) => {
      const name = item.productName || item.name || "Producto"
      const qty = Number(item.quantity) || 0
      stats.topProducts[name] = (stats.topProducts[name] || 0) + qty

      Object.entries(item.flavors || {}).forEach(([flavorId, count]) => {
        let flavorName = flavorId
        try {
          if (typeof availableFlavors !== "undefined") {
            const f = availableFlavors.find((x) => x.id === flavorId)
            if (f) flavorName = f.name
          }
        } catch {}
        stats.topFlavors[flavorName] = (stats.topFlavors[flavorName] || 0) + (Number(count) || 0)
      })
    })

    let method = "Desconocido"
    try {
      const rawMethod = order.customer?.paymentMethod
      method = (typeof getPaymentMethodName === "function"
        ? getPaymentMethodName(rawMethod)
        : rawMethod) || "Desconocido"
    } catch {}
    stats.paymentMethods[method] = (stats.paymentMethods[method] || 0) + 1
  })

  return stats
}


function loadOrderHistory() {
  const orderHistory = JSON.parse(localStorage.getItem("cremolatti_order_history") || "[]")
  const ordersList = document.getElementById("orders-list")

  if (orderHistory.length === 0) {
    ordersList.innerHTML = "<p>No hay pedidos registrados.</p>"
    return
  }
    ordersList.innerHTML = orderHistory
    .slice(0, 10)
    .map(
      (order) => `
        <div class="order-item">
            <h4>Pedido #${order.id}</h4>
            <p><strong>Fecha:</strong> ${order.dateFormatted}</p>
            <p><strong>Cliente:</strong> ${order.customer.name}</p>
            
            <div class="order-products">
              <strong>Productos:</strong>
              <ul>
                ${order.items
                  .map(
                    (item) => `
                      <li>
                        ${item.productName} (x${item.quantity})
                        ${item.flavorsList ? `<br><em>Sabores:</em> ${item.flavorsList}` : ""}
                        ${item.toppingsList ? `<br><em>Toppings:</em> ${item.toppingsList}` : ""}
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
                  <br>
            <p class="order-total"><strong>Total:</strong> $${(order.orderTotal ?? order.total ?? 0).toFixed(2)}</p>
        </div>
    `,
    )
    .join("")
    //para agregar en le renglon de item.productName tatata: - $${item.itemTotal.toFixed(2)} se rompe por el toFixed xq no todos los pedidos guardados tienen itemTotal
}

// Load order history on page load
document.addEventListener("DOMContentLoaded", () => {
  loadOrderHistory()
})
