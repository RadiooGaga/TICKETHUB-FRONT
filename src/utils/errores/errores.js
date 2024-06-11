
export const errorWarning = (parendiv, text, color, id = "statusMessage") => {

    const existingMessage = document.getElementById(id);
    if (existingMessage) {
        parendiv.removeChild(existingMessage);
    }

    const errorMessage = document.createElement('p');
    errorMessage.id = "statusMessage";
    errorMessage.style.color = color;
    errorMessage.textContent = text;

    parendiv.appendChild(errorMessage);
}








/*
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
*/
