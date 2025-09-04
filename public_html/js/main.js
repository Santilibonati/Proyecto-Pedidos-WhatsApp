/*MENSAJES DE TEXTO TEMPORALES */
function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.textContent = message
  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000) 
}

function showWarningMessage(message) {
  console.log("entraaa");
  const warningDiv = document.createElement("div")
  warningDiv.className = "warning-message"
  warningDiv.textContent = message
  document.body.appendChild(warningDiv)

  setTimeout(() => {
    warningDiv.remove()
  }, 4000) 
}
/* FIN MENSAJES DE TEXTO TEMPORALES */