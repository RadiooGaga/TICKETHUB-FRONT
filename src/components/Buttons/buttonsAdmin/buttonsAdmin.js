import './buttonsAdmin.css';

export const adminButtons = (parentDiv, buttonId, text ) => {

    const adminButton = document.createElement('button');
    adminButton.id = buttonId;
    adminButton.textContent = text;

    parentDiv.appendChild(adminButton);
    return adminButton;

}


export const attendeesCounter = (parentDiv, divId, divIdText, buttonId, imgSrc, imgId, divID, ulId  ) => {

    const divCounter = document.createElement('div');
    divCounter.id = divId;
    divCounter.textContent = divIdText;
    const counter = document.createElement('button');
    counter.id = buttonId;
    const counterImg = document.createElement('img');
    counterImg.src = imgSrc;
    counterImg.id = imgId;
    const counterDiv = document.createElement('div');
    counterDiv.id = divID;
    const participantsCounter = document.createElement('ul');
    participantsCounter.id = ulId;

    divCounter.appendChild(counter)
    counter.appendChild(counterImg)
    divCounter.appendChild(counterDiv)
    counterDiv.appendChild(participantsCounter)

    parentDiv.appendChild(divCounter)
    return { divCounter, counter, participantsCounter };

}

