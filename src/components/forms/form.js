
export const formData = (parentDiv, formId, ID, formTitle, fields) => {

    const div = document.createElement('div');
    const form = document.createElement('form');
    form.id = formId;
    const h3 = document.createElement('h3');
    h3.id = ID;
    h3.textContent = formTitle;
    div.appendChild(form);
    form.appendChild(h3);

    fields.forEach(field => {
        const input = document.createElement('input');
        input.id = field.id || "";
        input.type = field.type || 'text'; 
        input.placeholder = field.placeholder || ''; 
        input.name = field.name || '';
        form.appendChild(input);
    });

    parentDiv.appendChild(div);
    return form;
}


/*
export const details = (parentDiv, cardId, divImg, image, divDetail, xButtonId, cards) => {

    const cardEvent = document.createElement("div");
    cardEvent.id = cardId;
    const divDetailImg = document.createElement("div");
    divDetailImg.id = divImg;
    const img = document.createElement("img");
    img.src = image;
    const divDetails = document.createElement("div");
    divDetails.id = divDetail;
    const buttonX = document.createElement("button");
    buttonX.id = xButtonId;
    buttonX.textContent = "X";

    cards.forEach(card => {

        const eventTitle = document.createElement('h3');
        eventTitle.id = card.eventName;
        const dateTitle = document.createElement('span');
        dateTitle.id = card.date;
        const locationTitle = document.createElement('span');
        locationTitle.id = card.location;
        const aCategoryTitle = document.createElement('a');
        aCategoryTitle.id = card.category;
        const descriptionFull = document.createElement('p'); 
        descriptionFull.id = card.description;
      
    });

    cardEvent.appendChild(divDetailImg);
    divDetailImg.appendChild(img);
    cardEvent.appendChild(divDetails);
    divDetails.appendChild()
    cardEvent.appendChild(buttonX);


    parentDiv.appendChild(cardEvent); 
     
    
    //cardEvent.id = "divCardDetail"; 
    //divDetailImg.id = "divDetailImg";
    //divDetails.id = "divDetails";
    //buttonX.id = "xButton";
   
    
   /*
    eventTitle.textContent = event.name;
    dateTitle.textContent = `Fecha: ${event.date}`;
    locationTitle.textContent = `${event.location}`;
    aCategoryTitle.textContent = `${event.category}`;
    aCategoryTitle.id = "category";
    descriptionFull.textContent = event.description;
    descriptionFull.id = "descriptionParagraph";

   

      


}
*/