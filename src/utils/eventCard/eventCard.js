
export const printCard = (divPadre, event, divCardDetails, 
    imgDivDetail, cardImg, divWithDetails, eventH3, dateId, locationId, categoryId, descriptionId) => {

        const divCardEvent = document.createElement('div');
        divCardEvent.id = divCardDetails;
        const divDetailsImg = document.createElement("div");
        divDetailsImg.id = imgDivDetail;
        const img = document.createElement('img');
        img.id = cardImg;
        const divDetailsCard = document.createElement("div");
        divDetailsCard.id = divWithDetails;

        
        const eventName = document.createElement('h3');
        eventName.id = eventH3;
        const date = document.createElement('span');
        date.id = dateId;
        const location = document.createElement('span');
        location.id = locationId;
        const aCategory = document.createElement('a');
        aCategory.id = categoryId;
        const description = document.createElement('p');
        description.id = descriptionId;

        img.src = event.img;
        eventName.textContent = event.eventName;
        date.textContent = `Fecha: ${event.date}`;
        location.textContent = event.location;
        aCategory.textContent = `${event.category}`;
        aCategory.id= "category";
        description.textContent = event.description;


        divCardEvent.appendChild(divDetailsImg);
        divDetailsImg.appendChild(img);
        divCardEvent.appendChild(divDetailsCard);
        divDetailsCard.appendChild(eventName);
        divDetailsCard.appendChild(date);
        divDetailsCard.appendChild(location);
        divDetailsCard.appendChild(aCategory);
        divDetailsCard.appendChild(description);

        divPadre.appendChild(divCardEvent);
        return { divCardEvent, divDetailsCard };     
}



