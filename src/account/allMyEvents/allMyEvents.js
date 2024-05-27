import { Account } from '../myAccount/account';
import './allMyEvents.css';


//RECARGAR LA PÁGINA "TODOS MIS EVENTOS"
export const allMyEvents = async () => {
  Account();
  const divAllEvents = document.createElement('div');
  divAllEvents.id = 'divAllEvents';
  
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`http://localhost:3004/api/user/${user._id}`);
  const usuario = await res.json();

  let myEvents = []; // *

  // aviso si no hay eventos añadidos
  if (!usuario.myEvents || usuario.myEvents.length === 0) {
    noEventsAdded(divAllEvents)
    } else {
      for (const idEvent of usuario.myEvents) {
        const response = await fetch(`http://localhost:3004/api/events/${idEvent}`);
        const evento = await response.json();
        myEvents.push(evento) // si hay, se meten en *
      }
  }
  printMyEvents(myEvents, divAllEvents);
};


// PINTAR LOS EVENTOS DE LA PÁGINA "TODOS MIS EVENTOS"
export const printMyEvents = (events, divPadre) => {

  const section = document.querySelector('#principal')

  let eventCounter = 0;

  for (const event of events) {
   
      const divCardEvent = document.createElement('div');
      divCardEvent.id = "divCardDetail";
      const divDetailImg = document.createElement("div");
      divDetailImg.id = "divDetailImg";
      const img = document.createElement('img');
      const divDetails = document.createElement("div");
      divDetails.className = "divDetails";
      const eventName = document.createElement('h3');
      const date = document.createElement('span');
      const location = document.createElement('span');
      const aCategory = document.createElement('a');
      const description = document.createElement('p');
      description.id = "descriptionParagraph";
      const joinButton = document.createElement('button');

      eventName.textContent = event.eventName/*.toUpperCase()*/;
      date.textContent = `Fecha: ${event.date}`;
      location.textContent = `${event.location}`;
      img.src = event.img;
      aCategory.textContent = `${event.category}`;
      aCategory.id = "category";
      description.textContent = event.description;
      joinButton.textContent = "ASISTIR";
      joinButton.className = "joinButton";
      joinButton.id = `btn${eventCounter}`;
      eventCounter++;

      divPadre.appendChild(divCardEvent);
      divCardEvent.appendChild(divDetailImg);
      divDetailImg.appendChild(img);
      divCardEvent.appendChild(divDetails);
      divDetails.appendChild(eventName);
      divDetails.appendChild(date);
      divDetails.appendChild(location);
      divDetails.appendChild(aCategory);
      divDetails.appendChild(description);
      divDetails.appendChild(joinButton);

      const user = JSON.parse(localStorage.getItem("user"));

      // si hay usuario y en sus eventos se incluye un evento, el botón cambia.
      if (user.myEvents.includes(event._id)) {
        joinButton.textContent = "QUITAR";
        joinButton.style.backgroundColor = "#b0a658";
      } 

      joinButton.addEventListener('click', (e) => {
        const removeCard = removeEvent(event._id);
        console.log(removeCard, "evento quitado");
        if (user.myEvents.length === 0 || removeCard === false) {
          const allEvents = document.querySelector('#divAllEvents');
          noEventsAdded(allEvents);
        }
       
      })
  }
  section.appendChild(divPadre);
}



//RETIRAR EL EVENTO DE "TODOS MIS EVENTOS"
const removeEvent = async (event) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const objetoFinal = JSON.stringify({
    myEvents: [event]
  });

  const options = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  };

  // Verificar si el evento ya está en user.myEvents. Si hay, borrarlo.
  let removeCard;
  const eventCard = document.querySelector('#divCardDetail');
  const index = user.myEvents.indexOf(event); 
  if (index !== -1) {
      user.myEvents.splice(index, 1);
      eventCard.remove();//si "Mis eventos" no está vacío, se elimina el evento del DOM
      removeCard = true;
    
      console.log('Se eliminó el evento de "Mis eventos"', event);
  } else {
      removeCard = false;
      console.log('Nada que borrar', event);
  }
  
   const res = await fetch(`http://localhost:3004/api/user/update-user/${user._id}`, options);

   const respuesta = await res.json();
   console.log(respuesta);

   localStorage.setItem("user", JSON.stringify(user));
   return removeCard;
};

 
// FUNCION "NO HAY EVENTOS AÑADIDOS"
const noEventsAdded = (parentDiv) => {
  
  const divEventsEmpty = document.createElement('div');
  divEventsEmpty.id = "eventsEmpty"
  const p = document.createElement('p');
  p.id = "myEventsEmpty";
  divEventsEmpty.style.display = 'flex'; 
  p.textContent = "Aún no tienes eventos añadidos";

  parentDiv.appendChild(divEventsEmpty)
  divEventsEmpty.appendChild(p);
}

