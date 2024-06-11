
export const successfulNotice = (parendiv, text, color) => {
    const successMessage = document.createElement('p');
    successMessage.style.color = color;
    successMessage.textContent = text;

    parendiv.appendChild(successMessage);
}