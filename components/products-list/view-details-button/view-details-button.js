export function init(onClickHandler) {
  const button = renderButton();
  addEventListeners(button, onClickHandler);
  return button;
}

function renderButton() {
  const button = document.createElement("button");
  button.className = "view-details-button";
  button.innerHTML = `
        <span>Ver detalles</span>
    `;
  return button;
}

function addEventListeners(button, onClickHandler) {
  button.addEventListener("click", onClickHandler);
}
