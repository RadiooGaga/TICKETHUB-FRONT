
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


