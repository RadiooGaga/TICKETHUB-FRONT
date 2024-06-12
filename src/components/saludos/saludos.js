import './saludos.css'

export const helloByeFunc = (parentDiv, id, PiD, text) => {

    const helloBye = document.createElement('div');
    helloBye.id = id;
    const helloByParagraph = document.createElement('p');
    helloByParagraph.id = PiD;
    helloByParagraph.textContent = text;
    
    parentDiv.appendChild(helloBye);
    helloBye.appendChild(helloByParagraph);
}

