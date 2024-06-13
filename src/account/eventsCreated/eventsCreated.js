import { Account } from '../myAccount/account';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { printCard } from '../../utils/eventCard/eventCard';
import { adminButtons } from '../../components/Buttons/buttonsAdmin/buttonsAdmin';
import { formCrearEvento } from '../../components/forms/createEvForm';
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
    const editEventButton = adminButtons(divBottomDetails, "editAdminButton","EDITAR")
    const deleteEventButton = adminButtons(divBottomDetails, "deleteAdminButton","ELIMINAR")

    parentDiv.appendChild(divCardEvent);
    divCardEvent.appendChild(divDetailsCard);
    divDetailsCard.appendChild(divBottomDetails);
    divBottomDetails.appendChild(editEventButton);
    divBottomDetails.appendChild(deleteEventButton);

    const joinButton = document.createElement('button');
    joinButton.className = "joinButton";
    joinButton.id = `btn${eventCounter}`;
    eventCounter++;

    const user = JSON.parse(localStorage.getItem("user"));

      if (user.createdEvents) {
        joinButton.style.display = "none";
      }

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

  const fields = [
    { id: "inputUpdateEventId", type: "text",  placeholder: "actualizar nombre", value: event.eventName},
    { id: "inputUpdateDate", type: "text", placeholder: "día", value:event.date },
    { id: "locationUpdateInput", type: "text", placeholder: "ubicación", value: event.location },
    { id: "fileUpdateInput", type: "file" },
    { id: "inputUpdateDescription", type: "text", placeholder: "nueva descripción", value: event.description}
  ];
  const { enterForm, categorySelector, categories } = 
  formCrearEvento(divEventFormUpdate, "enterEventFormUpdate", "h3updateEvent", "ACTUALIZA TU EVENTO",
    fields, "selectUpdateCategories")

  const noteToUpdate = document.createElement('span');
  noteToUpdate.id = "noteToUpdate";
  noteToUpdate.textContent = "Actualiza los campos que necesites";

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

    parentDiv.appendChild(divEventFormUpdate);
    divEventFormUpdate.appendChild(enterForm);
    enterForm.appendChild(noteToUpdate);
    enterForm.appendChild(categorySelector);
    enterForm.appendChild(buttonUpdateEvent);
    enterForm.appendChild(buttonGoBack);


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
    const inputEvent = document.getElementById("inputUpdateEventId").value;
    const inputDate = document.getElementById("inputUpdateDate").value;
    const locationInput = document.getElementById("locationUpdateInput").value;
    const inputDescription = document.getElementById("inputUpdateDescription").value;
    
    const updatedEvent = {
      eventName: inputEvent,
      date: inputDate,
      location: locationInput,
      description: inputDescription,
      category: selectedCategoryId
    };

    if (imgContent !== null) {
      updatedEvent.img = imgContent
    }

    updateEvent(event._id, updatedEvent)
    .then((returned) => {
      if (returned === null) {
        alert('HA HABIDO UN ERROR AL INTENTAR ACTUALIZAR EL EVENTO');
      } else {
        eventsCreated(returned, parentDiv.id) 
        // este es el evento actualizado recibido por la API
      }
      
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