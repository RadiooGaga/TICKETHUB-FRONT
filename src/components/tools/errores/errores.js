import './errores.css';

//ERROR AL CREAR EL EVENTO

export const errorCreate = (parentDiv) => {
    const eventForm = document.querySelector('#enterEventForm');
    eventForm.innerHTML = "";
    const divError = document.createElement('div');
    divError.classList.add('divError');
    const pError = document.createElement("p");
    pError.classList.add("error")
    pError.textContent = "error al crear el evento";
    pError.style = "color: red";


    parentDiv.appendChild(divError);
    divError.appendChild(pError);

}

export const errorUpdate = (parentDiv) => {
    const eventForm = document.querySelector('#enterEventForm');
    eventForm.innerHTML = "";
    const divError = document.createElement('div');
    divError.classList.add('divError');
    const pError = document.createElement("p");
    pError.classList.add("errorUpdate")
    pError.textContent = "error al actualizar el evento";
    pError.style = "color: red";

    parentDiv.appendChild(divError);
    divError.appendChild(pError);

}

