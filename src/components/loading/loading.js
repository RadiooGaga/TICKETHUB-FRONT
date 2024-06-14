// Función para mostrar el loader
export const loading = (parentDiv = document.body) => {
    const loaderElement = document.createElement('div');
    const loaderP = document.createElement('p')
    loaderP.textContent = "Cargando...";
    loaderP.style.color = "red";
    loaderP.style.fontSize = "18px";
    loaderP.id = "loaderP"

    loaderElement.id = 'loader';
    loaderElement.className = 'loader';
    loaderElement.classList.add('loader'); 
    loaderElement.innerHTML = `
      <div class="spinner"></div>
    `;
    parentDiv.appendChild(loaderElement);
    parentDiv.appendChild(loaderP);
  };
  

  // Función para eliminar el loader
  export const removeLoader = (parentDiv = document.body) => {
    const loaderP = parentDiv.querySelector('#loaderP');
    if (loaderP) {
      loaderP.remove();
    }
  };



  

  

 