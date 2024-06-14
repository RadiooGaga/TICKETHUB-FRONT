import { participantRegister } from '../../participants/participantForm/participantForm';
import { updateForm } from '../../account/eventsCreated/eventsCreated';
import { warning } from '../../account/eventsCreated/eventsCreated';
import { deleteEvent } from '../../account/eventsCreated/eventsCreated';
import { printCard } from '../../utils/eventCard/eventCard';
import { attendeesCounter } from '../../components/Buttons/buttonsAdmin/buttonsAdmin';
import { adminButtons } from '../../components/Buttons/buttonsAdmin/buttonsAdmin';
import { urlApi } from '../../utils/apiUrl/apiUrl';
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

  const res = await fetch(`${urlApi}/api/events`);
  const events = await res.json();

  section.appendChild(divEvents);
  divEvents.appendChild(flecha);
  printEvents(events, divEvents); 

}


//Función pintar los eventos de Home.
export const printEvents = (events, divPadre) => {

  for (const event of events) {

    const { divCardEvent, divDetailsCard } = printCard(
      divPadre,
      event,
      "cardEventHome",
      "divTop",
      "cardEventImg",
      "divBottom",
      "h3",
      "span",
      "span",
      "category",
      "description"
    );

    const description = divDetailsCard.querySelector('#description');
    if (description) {
      description.style.display = 'none';
    }

    const divBlueRedButtons = document.createElement('div');
    divBlueRedButtons.className = "divBlueRedButtons";

    const participantButton = document.createElement('button');
    participantButton.textContent = "TE APUNTAS?";
    participantButton.id = "participantButton";
    const seeDetailsButton = document.createElement('button');
    seeDetailsButton.id = "detailsButton";
    seeDetailsButton.textContent = "VER MÁS";
    
    divPadre.appendChild(divCardEvent);
    divCardEvent.appendChild(divBlueRedButtons);
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
      joinButton.id = `btn${event._id}`;
      
      divBlueRedButtons.appendChild(joinButton);
        

      //BOTÓN DE ASISTIR SI TIENES CUENTA (USER)
      joinButton.addEventListener("click", (e) => {
        const changeButton = addEvent(event._id)
        .then(changeButton => {
          if (changeButton === true) {
            joinButton.style.backgroundColor = "#b0a658";
            joinButton.textContent = "QUITAR";
          } else {
            joinButton.style.backgroundColor = "#9c4c46";
            joinButton.textContent = "ASISTIR";
          }
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

  const { divCardEvent, divDetailsCard } = printCard(
    divEvents,
    event,
    "divCardDetail",
    "divDetailImg",
    "cardImg",
    "divDetails",
    "h3",
    "span",
    "span",
    "category",
    "descriptionParagraph"
  );

    const xButton = document.createElement("button");
    xButton.id = "xButton";
    xButton.textContent = "X";

    xButton.addEventListener("click", (e) => {
        Home()
        window.scrollTo(0,0)
    })

    divEvents.appendChild(divCardEvent);
    divDetailsCard.appendChild(xButton);


    // BOTONES ADMIN: VERASISTENTES, EDITAR/BORRAR EVENTOS
    if (user && user.rol === 'admin') { 

      const divBottomDetails = document.createElement('div');
      divBottomDetails.id = "divBottomDetails";

      const { divCounter, counter, participantsCounter } = 
      attendeesCounter(divBottomDetails, "divCounter", "asistentes", "seeParticipantsButton",
      '/assets/pics/abajo.png', "counterImg", "counterDiv", "desplegarParticipantes")
      const editEventButton = adminButtons(divBottomDetails, "editAdminButton","EDITAR")
      const deleteEventButton = adminButtons(divBottomDetails, "deleteAdminButton","ELIMINAR")
     

      //BOTÓN PARA MOSTRAR ASISTENTES
      counter.addEventListener('click', async (e) => {
        const ulDisplay = document.querySelector('#counterDiv');
        console.log(ulDisplay, "donde está la listaaa")
    
        if ((ulDisplay.style.display === "none" || ulDisplay.style.display === "") && user.rol === "admin") {
          try { 
            const response = await fetch(`${urlApi}/api/participants/event/${event._id}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              }
            });
                if (!response.ok) {
                  throw new Error('Error en la respuesta del servidor');
                }

            const participants = await response.json();
            participantsCounter.innerHTML = '';
    
            for (const participant of participants.Asistentes) {
              const li = document.createElement('li');
              li.textContent = participant;
              participantsCounter.appendChild(li); 
            }
            ulDisplay.style.display = "flex";

          } catch (error) {
            console.error('Error al obtener los participantes:', error);
          }
        } else {
          ulDisplay.style.display = "none";
        }
      });

      //BOTÓN PARA EDITAR EVENTO
      editEventButton.addEventListener('click', (e) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        updateForm(event, divEvents)
      })
  
      //BOTÓN PARA BORRAR EVENTO
      deleteEventButton.addEventListener('click', (e) => {
        const texto =  "¿SEGURO QUE DESEA ELIMINAR EL EVENTO?";
        const container = document.getElementById('divYesNoButtons')
        loading(container);
        warning(divCardEvent, deleteEvent, event, texto)
      })
      
      
      divDetailsCard.appendChild(divBottomDetails)
      divBottomDetails.appendChild(divCounter);
      divBottomDetails.appendChild(editEventButton);
      divBottomDetails.appendChild(deleteEventButton);
    } 
  
    divEvents.appendChild(divCardEvent)
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
   console.log(eventIndex)
   user.myEvents.splice(eventIndex, 1);
   changeButton = false;
   console.log('Se eliminó el evento de Mis eventos', event);
 }
 
  const res = await fetch(`${urlApi}/api/user/update-user/${user._id}`,
  options
  
  );
  const respuesta = await res.json();
  console.log(respuesta);

  localStorage.setItem("user", JSON.stringify(user));
  return changeButton;
}