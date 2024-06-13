import { Account } from "../myAccount/account";
import { urlApi } from "../../utils/apiUrl/apiUrl";
import { printCard } from "../../utils/eventCard/eventCard";
import "./allMyEvents.css";


//RECARGAR LA PÁGINA "TODOS MIS EVENTOS"
export const allMyEvents = async () => {
  Account();
  const divAllEvents = document.createElement("div");
  divAllEvents.id = "divAllEvents";

  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`${urlApi}/api/user/${user._id}`);
  const usuario = await res.json();

  let myEvents = [];

  // aviso si no hay eventos añadidos
  if (usuario.myEvents.length === 0) {
    noEventsAdded(divAllEvents);
  } else {
    for (const idEvent of usuario.myEvents) {
      const response = await fetch(`${urlApi}/api/events/${idEvent}`);
      const evento = await response.json();
      myEvents.push(evento);
    }
  }
  printMyEvents(myEvents, divAllEvents);
};



// PINTAR LOS EVENTOS DE LA PÁGINA "TODOS MIS EVENTOS"
export const printMyEvents = (events, divPadre) => {

  const section = document.querySelector('#principal');

  for (const event of events) {
    const { divCardEvent, divDetailsCard } = printCard(
      divPadre,
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

    const joinButton = document.createElement("button");
    joinButton.textContent = "ASISTIR";
    joinButton.className = "joinButton";
    joinButton.id = `btn${event._id}`;

    //divPadre.appendChild(divCardEvent)
    divDetailsCard.appendChild(joinButton);

    const user = JSON.parse(localStorage.getItem("user"));

    // si hay usuario y en sus eventos se incluye un evento, el botón cambia.
    if (user.myEvents.includes(event._id)) {
      joinButton.textContent = "QUITAR";
      joinButton.style.backgroundColor = "#b0a658";
    }

    // Añadir el evento de clic al botón
    joinButton.addEventListener("click", (e) => {
      const removeCard = removeEvent(event._id, divCardEvent);
      console.log(removeCard, "evento quitado");
      if (!removeCard) {
        const allEvents = document.querySelector("#divAllEvents");
        noEventsAdded(allEvents);
      }
    });
  }
  section.appendChild(divPadre);
};

///RETIRAR EL EVENTO DE "TODOS MIS EVENTOS"
const removeEvent = async (event, divCard) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const objetoFinal = JSON.stringify({
    myEvents: [event],
  });

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: objetoFinal,
  };

  // Si el evento ya existe en user.myEvents, se borra.
  let removeCard;

  const index = user.myEvents.indexOf(event);
  if (index !== -1) {
    user.myEvents.splice(index, 1);
    divCard.remove(); //si "Mis eventos" no está vacío, elimino el evento del DOM
    removeCard = true;
    console.log('Se eliminó el evento de "Mis eventos"', event);
  } else {
    removeCard = false;
    console.log("Nada que borrar", event);
  }

  const res = await fetch(
    `${urlApi}/api/user/update-user/${user._id}`,
    options
  );
  const respuesta = await res.json();
  console.log(respuesta);

  localStorage.setItem("user", JSON.stringify(user));
  return removeCard;
};

// FUNCION "NO HAY EVENTOS AÑADIDOS"
const noEventsAdded = (parentDiv) => {
  const divEventsEmpty = document.createElement("div");
  divEventsEmpty.id = "eventsEmpty";
  const p = document.createElement("p");
  p.id = "myEventsEmpty";
  divEventsEmpty.style.display = "flex";
  p.textContent = "Aún no tienes eventos añadidos";

  parentDiv.appendChild(divEventsEmpty);
  divEventsEmpty.appendChild(p);
};
