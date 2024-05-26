import { allMyEvents } from '../../account/allMyEvents/allMyEvents';
import { participantRegister } from '../../participants/participantForm/participantForm';
import { updateForm } from '../../account/eventsCreated/eventsCreated';
import { warning } from '../../account/eventsCreated/eventsCreated';
import { deleteEvent } from '../../account/eventsCreated/eventsCreated';
import './home.css';


//Recarga de página Home.
export const Home = async () => {
  
  const section = document.querySelector('#principal');  
  section.innerHTML = "";
  const divEvents = document.createElement('div');
  divEvents.id = "divEvents";
  const flecha = document.createElement('img');
  flecha.src = './assets/pics/flecha1.png';
  flecha.id = "flechaArriba";
  flecha.addEventListener("click", (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })

  const res = await fetch('http://localhost:3004/api/user/events');
  const events = await res.json();

  section.appendChild(divEvents);
  divEvents.appendChild(flecha);
  printEvents(events, divEvents); 

}


//Función pintar los eventos de Home.
export const printEvents = (events, divPadre) => {
  
  let eventCounter = 0;

  for (const event of events) {

    const divCardEvent = document.createElement('div');
    divCardEvent.id = "cardEventHome";
    const divTop = document.createElement('div');
    divTop.className = "divTop";
    const img = document.createElement('img');
    img.id = "cardEventImg";
    const divBottom = document.createElement('div');
    divBottom.className = "divBottom";
    const eventName = document.createElement('h3');
    const divMiddle = document.createElement('div');
    divMiddle.className = "divMiddle";
    const date = document.createElement('span');
    const location = document.createElement('span');
    const aCategory = document.createElement('a');
    const description = document.createElement('p');
    description.id = "descriptionParagraph";
    
    eventName.textContent = event.eventName.toUpperCase();
    date.textContent = `Fecha: ${event.date}`;
    location.textContent = `${event.location}`;
    img.src = event.img;
    aCategory.textContent = `${event.category}`;
    aCategory.id = "category";

    const divBlueRedButtons = document.createElement('div');
    divBlueRedButtons.className = "divBlueRedButtons";

    const participantButton = document.createElement('button');
    participantButton.textContent = "TE APUNTAS?";
    participantButton.id = "participantButton";
    const seeDetailsButton = document.createElement('button');
    seeDetailsButton.id = "detailsButton";
    seeDetailsButton.textContent = "VER MÁS";
    
    divPadre.appendChild(divCardEvent);
    divCardEvent.appendChild(divTop);
    divCardEvent.appendChild(divBottom);
    divTop.appendChild(img);
    divBottom.appendChild(eventName);
    divBottom.appendChild(divMiddle);
    divMiddle.appendChild(date);
    divMiddle.appendChild(location);
    divMiddle.appendChild(aCategory);
    divBottom.appendChild(divBlueRedButtons);
    divBlueRedButtons.appendChild(seeDetailsButton)
    divBlueRedButtons.appendChild(participantButton);

    // BOTÓN DE VER DETALLES
    seeDetailsButton.addEventListener('click', (e)=> {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
        printDetails(event, divPadre.id)
      })

    const user = JSON.parse(localStorage.getItem("user"));

    // Si es un participante (es decir, si no hay user)
    if (!user) {
      participantButton.style.display = "flex";
    } else {
      participantButton.style.display = "none";
    }

    //BOTÓN DE APUNTARSE SI NO SE TIENE CUENTA (PARTICIPANT);
    participantButton.addEventListener('click', (e)=> {
      const eventId = event._id;
      participantRegister(eventId);
      })

    //Si hay user (si el usuario está logueado...)
    if (user) {
      const joinButton = document.createElement('button');
      joinButton.textContent = "ASISTIR";
      joinButton.className = "joinButton";
      joinButton.id = `btn${eventCounter}`;
      eventCounter++;
      divBlueRedButtons.appendChild(joinButton);
        

      //BOTÓN DE ASISTIR SI TIENES CUENTA (USER)
      joinButton.addEventListener("click", (e) => {
      console.log(`hay ${eventCounter++} eventos en la web`);
        const changeButton = addEvent(event._id)
        .then(changeButton => {
          if (changeButton === true) {
            joinButton.style.backgroundColor = "#b0a658";
            joinButton.textContent = "QUITAR";
          } else {
            joinButton.style.backgroundColor = "#9c4c46";
            joinButton.textContent = "ASISTIR";
          }
          allMyEvents();
        });
        console.log(changeButton)
      }) 

      //si está el usuario logueado y hay evento en "Todos mis eventos"
      if (user?.myEvents?.includes(event._id)) {
        joinButton.textContent = "AÑADIDO";
        joinButton.style.backgroundColor = "#b0a658";
      } else {
        joinButton.style.backgroundColor = "#9c4c46";
        joinButton.textContent = "ASISTIR";
      }
    }      
  }
  
}


//ver detalles
export const printDetails = (event, div) => {

  const divEvents = document.getElementById(div);
  divEvents.innerHTML = "";


  const user = JSON.parse(localStorage.getItem("user"));

    const cardEvent = document.createElement("div");
    cardEvent.id = "divCardDetail"; 
    const divDetailImg = document.createElement("div");
    divDetailImg.id = "divDetailImg";
    const img = document.createElement("img");
    const divDetails = document.createElement("div");
    divDetails.className = "divDetails";
    const eventName = document.createElement('h3');
    const date = document.createElement('span');
    const location = document.createElement('span');
    const aCategory = document.createElement('a');
    const description = document.createElement('p'); 
    const xButton = document.createElement("button");
    xButton.id = "xButton";
    xButton.textContent = "X";

    img.src = event.img;
    eventName.textContent = event.eventName/*.toUpperCase()*/;
    date.textContent = `Fecha: ${event.date}`;
    location.textContent = `${event.location}`;
    aCategory.textContent = `${event.category}`;
    aCategory.id = "category";
    description.textContent = event.description;
    description.id = "descriptionParagraph";

    xButton.addEventListener("click", (e) => {
        Home()
        window.scrollTo(0,0)
    })

    cardEvent.appendChild(divDetailImg);
    cardEvent.appendChild(divDetails);
    divDetailImg.appendChild(img);
    divDetails.appendChild(xButton)
    divDetails.appendChild(eventName);
    divDetails.appendChild(date);
    divDetails.appendChild(location);
    divDetails.appendChild(aCategory);
    divDetails.appendChild(description); 

    /* Si hay usuario admin, se habilitan los botones para editar o borrar cualquier evento */
    if (user && user.rol === 'admin') {
    
      const divBottomDetails = document.createElement('div');
      divBottomDetails.className = "divBottomDetails";
      const editAdminButton = document.createElement('button');
      editAdminButton.id = "editAdminButton";
      editAdminButton.textContent = "EDITAR";
      const deleteAdminButton = document.createElement('button');
      deleteAdminButton.id = "deleteAdminButton";
      deleteAdminButton.textContent = "ELIMINAR";
      const divCounter = document.createElement('div');
      divCounter.id = "divCounter";
      divCounter.textContent = "asistentes";
      const counter = document.createElement('button');
      counter.id = "seeParticipantsButton";
      const counterImg = document.createElement('img');
      counterImg.src = '/assets/pics/abajo.png';
      counterImg.id = "counterImg";
      const ulCounterDiv = document.createElement('div');
      ulCounterDiv.id = "ulCounterDiv";
      const ulCounter = document.createElement('ul');
      ulCounter.id = "desplegarParticipantes";
      
      counter.addEventListener('click', (e) => {
        const ulDisplay = document.querySelector('#ulCounterDiv');
        if (ulDisplay.style.display === "none" || ulDisplay.style.display === "") {
          ulDisplay.style.display = "flex";
        } else {
            ulDisplay.style.display = "none";
        }
        
       
      })
      
      editAdminButton.addEventListener('click', (e) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        updateForm(event, divEvents)
      })
  
      deleteAdminButton.addEventListener('click', (e) => {
        const texto =  "¿SEGURO QUE DESEA ELIMINAR EL EVENTO?";
        warning(cardEvent, deleteEvent, event, texto)
      })
      
      divDetails.appendChild(divBottomDetails)
      divBottomDetails.appendChild(divCounter);
      divCounter.appendChild(counter);
      counter.appendChild(counterImg);
      counter.appendChild(ulCounterDiv);
      ulCounterDiv.appendChild(ulCounter);
      divBottomDetails.appendChild(editAdminButton);
      divBottomDetails.appendChild(deleteAdminButton);
    } 
  
    divEvents.appendChild(cardEvent)
}  


// Función para añadir evento desde el joinButton y almacenarlo en localstorage.
export const addEvent = async (event) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const objetoFinal = JSON.stringify({
    myEvents: event
  });

  const options = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  };

  // Changebutton es una variable donde almacenaré el resultado del return, que será 
  // true o false. True, si se añade el evento a la lista del usuario. False, si se elimina.
  let changeButton;
  if (!user.myEvents.includes(event)) { //Si no hay evento, lo añado.
   user.myEvents.push(event);
   changeButton = true;
   console.log('Se añadió el event a Mis eventos', event);
 } else {
   const eventIndex = user.myEvents.indexOf(event); // Si hay, elimino.
   user.myEvents.splice(eventIndex, 1);
   changeButton = false;
   console.log('Se eliminó el evento de Mis eventos', event);
 }
 
  const res = await fetch(`http://localhost:3004/api/user/update-user/${user._id}`,
  options
  
  );
  const respuesta = await res.json();
  console.log(respuesta);

  localStorage.setItem("user", JSON.stringify(user));
  return changeButton;
}

  



  

 

 






    

