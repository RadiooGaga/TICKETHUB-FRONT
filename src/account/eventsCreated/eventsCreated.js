import { printDetails } from '../../pages/home/home';
import { Account } from '../myAccount/account';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { printCard } from '../../utils/eventCard/eventCard';
import { adminButtons } from '../../components/Buttons/buttonsAdmin/buttonsAdmin';
import { attendeesCounter } from '../../components/Buttons/buttonsAdmin/buttonsAdmin';
import './eventsCreated.css';
import '../../pages/home/home.css';


//RECARGA DE PÁGINA "EVENTOS CREADOS"
export const eventsCreated = async () => {
  Account();
  const divEventsCreated = document.createElement('div');
  divEventsCreated.id = 'divEventsCreated';

  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`${urlApi}/api/event/creator/${user._id}`);
  const events = await res.json();

      // aviso si no hay eventos creados
    if (events.length === 0) {
      noCreatedEvents(divEventsCreated)
    }

    printEventsCreated (events, divEventsCreated);
};



// PINTAR LOS EVENTOS CREADOS EN "EVENTOS CREADOS"
const printEventsCreated = (events, parentDiv) => {

  const section = document.querySelector('#principal');

  const flecha = document.createElement('img');
  flecha.src = './assets/pics/flecha1.png';
  flecha.id = "flechaArriba";

  let eventCounter = 0;

  for (const event of events) {
    const { divCardEvent, divDetailsCard } = printCard(
      parentDiv,
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

    const divBottomDetails = document.createElement('div');
    divBottomDetails.id = "divBottomDetails";

    const { divCounter, counter, participantsCounter } = 
    attendeesCounter(divBottomDetails, "divCounter", "asistentes", "seeParticipantsButton",
      '/assets/pics/abajo.png', "counterImg", "counterDiv", "desplegarParticipantes")
    const editEventButton = adminButtons(divBottomDetails, "editAdminButton","EDITAR")
    const deleteEventButton = adminButtons(divBottomDetails, "deleteAdminButton","ELIMINAR")

    const joinButton = document.createElement('button');
    joinButton.className = "joinButton";
    joinButton.id = `btn${eventCounter}`;
    eventCounter++;

    const user = JSON.parse(localStorage.getItem("user"));

      if (user.createdEvents) {
        joinButton.style.display = "none";
      }

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

      // CLICK EDITAR
      editEventButton.addEventListener("click", (e) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        updateForm(event, parentDiv);
      })

      // CLICK ELIMINAR EVENTO
      deleteEventButton.addEventListener("click", (e) => {
        const texto =  "¿SEGURO QUE DESEA ELIMINAR EL EVENTO?";
        warning(divCardEvent, deleteEvent, event, texto)
        
      })  
     
      
    parentDiv.appendChild(divCardEvent);
    divCardEvent.appendChild(divDetailsCard);
    divDetailsCard.appendChild(divBottomDetails);
    divBottomDetails.appendChild(divCounter);
    divBottomDetails.appendChild(editEventButton);
    divBottomDetails.appendChild(deleteEventButton);
   
  }
  section.appendChild(parentDiv);
}



// FUNCIÓN DECISIONES
export const warning = (parentDiv, funcion, event, text) => {

  const warningPopup = document.createElement('div');
  warningPopup.id= "warningDiv";
  warningPopup.style.display = "flex";
  const pWarning = document.createElement('p');
  pWarning.id = "warningP";
  pWarning.textContent = text;
  const divYesNoButtons = document.createElement('div');
  divYesNoButtons.id = "divYesNoButtons";
  const noButton = document.createElement('button');
  noButton.id = "noButton";
  noButton.textContent = "NO";
  const yesButton = document.createElement('button');
  yesButton.id = "yesButton";
  yesButton.textContent = "SI";

  warningPopup.appendChild(pWarning);
  warningPopup.appendChild(divYesNoButtons);
  divYesNoButtons.appendChild(noButton);
  divYesNoButtons.appendChild(yesButton);

      //NO
      noButton.addEventListener('click', (e) => {
        warningPopup.remove();  
      })
  
      //SI
      yesButton.addEventListener('click', (e) => {
        warningPopup.remove();
        funcion(event);
        //deleteEvent(event);
      })

      parentDiv.appendChild(warningPopup)
}




// FORMULARIO ESCONDIDO PARA ACTUALIZAR EVENTO
export const updateForm = (event, parentDiv) => {

  const divEventFormUpdate = document.createElement('div');
  divEventFormUpdate.id = "divEventFormularioUpdate";
  const updateForm = document.createElement('form');
  updateForm.id = "enterEventFormUpdate";
  const h3UpdateEvent = document.createElement('h3');
  h3UpdateEvent.id = "h3updateEvent";
  h3UpdateEvent.textContent = "ACTUALIZA TU EVENTO";
  const noteToUpdate = document.createElement('span');
  noteToUpdate.id = "noteToUpdate";
  noteToUpdate.textContent = "Actualiza los campos que necesites";
  const inputUpdateEvent = document.createElement('input');
  inputUpdateEvent.placeholder = "actualizar nombre";
  inputUpdateEvent.type = "text";
  inputUpdateEvent.id = "inputUpdateEventId";
  inputUpdateEvent.value = event.eventName;
  const inputUpdateDate = document.createElement('input');
  inputUpdateDate.placeholder = "día";
  inputUpdateDate.type = "text";
  inputUpdateDate.id = "inputUpdateDate";
  inputUpdateDate.value = event.date;
  const locationUpdateInput = document.createElement('input');
  locationUpdateInput.placeholder = "ubicación";
  locationUpdateInput.id = "locationUpdateInput";
  locationUpdateInput.type = 'text';
  locationUpdateInput.value = event.location;
  const fileUpdateInput = document.createElement('input');
  fileUpdateInput.id = "fileUpdateInput";
  fileUpdateInput.type = 'file';
  const inputUpdateDescription = document.createElement('textarea');
  inputUpdateDescription.id = "inputUpdateDescription";
  inputUpdateDescription.placeholder = "nueva descripcion";
  //inputUpdateDescription.rows = 10; 
  inputUpdateDescription.value = event.description;

  const categorySelector = document.createElement('select');
  categorySelector.id = "selectUpdateCategories";
  const categories = [
      { id:1, value: "conciertos", textContent: "conciertos"},
      { id:2, value: "teatro", textContent: "teatro" },
      { id:3, value: "exposiciones", textContent: "exposiciones" },
      { id:4, value: "ferias", textContent: "ferias" },
      { id:5, value: "talleres", textContent: "talleres" }
  ]
  for (const category of categories) {
    const option = document.createElement('option');
      option.id = category.id;
      option.value = category.value;
      option.textContent = category.textContent;
      if (category.value === event.category) {
        option.selected = true;
      }
      categorySelector.appendChild(option);
  }
  let selectedCategoryId = categories[0].value;

  // EVENTO DE CAMBIO DE CATEGORÍA.
  categorySelector.addEventListener('change', function() {
  selectedCategoryId = this.value; //value seleccionado
  });


    //BOTONES DE EDIT Y VOLVER A LA PÁGINA DE EVENTOS CREADOS
    const buttonUpdateEvent = document.createElement('a');
    buttonUpdateEvent.id = "updateEventButton";
    buttonUpdateEvent.textContent = "ACTUALIZAR!";
  
    const buttonGoBack = document.createElement('a');
    buttonGoBack.id = "buttonGoBack";
    buttonGoBack.textContent = "VOLVER AL EVENTO";
  
    buttonGoBack.addEventListener('click', (e) => {
      const backToEventsCreated = document.getElementById('divEventFormularioUpdate');
      backToEventsCreated.remove()
    })

    console.log(parentDiv)
    console.log(divEventFormUpdate)
    parentDiv.appendChild(divEventFormUpdate);
    divEventFormUpdate.appendChild(updateForm);
    updateForm.appendChild(h3UpdateEvent);
    updateForm.appendChild(noteToUpdate);
    updateForm.appendChild(inputUpdateEvent);
    updateForm.appendChild(inputUpdateDate);
    updateForm.appendChild(locationUpdateInput);
    updateForm.appendChild(fileUpdateInput);
    updateForm.appendChild(inputUpdateDescription);
    updateForm.appendChild(categorySelector);
    updateForm.appendChild(buttonUpdateEvent);
    updateForm.appendChild(buttonGoBack);


    //imagen para subir al evento
    let imgContent;
    const fileUpdateInputId = document.getElementById('fileUpdateInput');
    fileUpdateInputId.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const contenido = e.target.result;
        imgContent = contenido;
    };
    reader.readAsDataURL(file);
    }); 



 // BOTÓN DE ACTUALIZAR EVENTO
  buttonUpdateEvent.addEventListener('click', (e) => {
    
    const updatedEvent = {
      eventName: inputUpdateEvent.value,
      date: inputUpdateDate.value,
      location: locationUpdateInput.value,
      description: inputUpdateDescription.value,
      category: selectedCategoryId
    };

    if (imgContent !== null) {
      updatedEvent.img = imgContent
    }

    updateEvent(event._id, updatedEvent)
    .then((returned) => {
      if (returned === null) {
        alert('HA HABIDO UN ERROR AL INTENTAR ACTUALIZAR EL EVENTO');
      }
      printDetails(returned, parentDiv.id) 
      // este es el evento actualizado recibido por la API
    })
  });

}



// ACTUALIZAR EVENTO
const updateEvent = async (id, event) => {
  
  const finalObject = JSON.stringify(event);
  const token = localStorage.getItem("token");

  const fetchOptions = {
    method: "PUT",
    body: finalObject,
    headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
    }
  }
  
  const res = await fetch(`${urlApi}/api/update-event/${id}`, fetchOptions);

  const respuestaFinal = await res.json();
  console.log(respuestaFinal)

  if (res.ok) {
      localStorage.setItem("updatedEvent", JSON.stringify(respuestaFinal));
      console.log('Evento actualizado!'); 
      return respuestaFinal;

    } else if (res.status === 400) {
        console.log('Error en la petición'); 
        return null;
    } else {
        console.log('Error:', res.statusText); 
        return null;
    }
  
}




// BORRAR EVENTO 
export const deleteEvent = async (event) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const options = {
     method: "DELETE",
     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
     }
  };

  try {
    const res = await fetch(`${urlApi}/api/delete-event/${event._id}`, options);
    const data = await res.json();

    if (res.ok) {
        console.log("Evento eliminado!!!!!!!");  
        localStorage.setItem("user", JSON.stringify(user));
        eventsCreated()
    }

    if (!res.ok) {
      console.log("Error al eliminar el evento:", data);
    }
       
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }

};



// FUNCION "NO HAY EVENTOS CREADOS"
const noCreatedEvents = (parentDiv) => {
  
  const div = document.createElement('div');
  div.id = "createdEventsEmpty"
  const p = document.createElement('p');
  p.id = "mycreatedEventsEmpty";
  div.style.display = 'flex'; 
  p.textContent = "No tienes eventos creados";
  p.id = "eventsCreatedEmpty";

  parentDiv.appendChild(div)
  div.appendChild(p);
}