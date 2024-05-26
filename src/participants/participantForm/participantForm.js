import './participantForm.css';
import { Home } from '../../pages/home/home';

export const participantRegister = (eventId) => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";

    ParticipantForm(eventId);
}


const ParticipantForm = (eventId) => {

    const section = document.querySelector("#principal");
    section.innerHTML = "";
    const beautydiv = document.createElement('div');
    beautydiv.id = "beautyDiv";
    const divParticipant = document.createElement('div');
    divParticipant.id = "divParticipant";
    const h2Participant = document.createElement('h2');
    h2Participant.textContent = "RELLENA TUS DATOS";
    h2Participant.id = "h2Participant";
    const spanParticipant = document.createElement('span');
    spanParticipant.textContent = "Te mandaremos un email de confirmación";
    spanParticipant.id = "aviso";
    const participantForm = document.createElement("form");
    participantForm.id = "participantForm";
    const participantName = document.createElement("input");
    participantName.id = "participantName";
    participantName.placeholder = "tu nombre";
    participantName.type = "text";
    const participantSurname = document.createElement("input");
    participantSurname.id = "participantSurname";
    participantSurname.placeholder = "tu apellido";
    participantSurname.type = "text";
    const participantEmail = document.createElement('input');
    participantEmail.id = "participantEmail";
    participantEmail.placeholder = "tumail@email.com";
    participantName.type = "text";
    const buttonSend = document.createElement("button");
    buttonSend.id = "buttonSend";
    buttonSend.textContent = "Enviar";
    buttonSend.type = "submit";

    section.appendChild(beautydiv);
    section.appendChild(divParticipant);
    divParticipant.appendChild(participantForm);
    participantForm.appendChild(h2Participant);
    participantForm.appendChild(spanParticipant);
    participantForm.appendChild(participantName);
    participantForm.appendChild(participantSurname);
    participantForm.appendChild(participantEmail);
    participantForm.appendChild(buttonSend);
   


    //BOTON FORMULARIO REGISTRO DEL PARTICIPANTE
    participantForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        submitParticipantReg(
        participantName.value, 
        participantSurname.value, 
        participantEmail.value, 
        eventId, 
        participantForm)  
        console.log("Participante registrado");
    })
}


//SUBMIT DEL REGISTRO DEL PARTICIPANTE
const submitParticipantReg = async (name, surname, email, eventId, form) => {

    const newParticipant = JSON.stringify({
        name,
        surname,
        email,
        events: eventId

    });

    const opciones = {
        method: "POST",
        body: newParticipant,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch("http://localhost:3004/api/participant/register", opciones);

   
    if (res.status === 200) {
        const successMessage = document.createElement('p');
        successMessage.style.color = "green";
        successMessage.textContent = "Gracias! Ya tienes los detalles del evento en tu mail 😁";
        form.appendChild(successMessage);
        setTimeout(() => {
            Home()
        }, 2000);

    } else if (res.status === 400) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Ya estás inscrito en este evento";
        errorMessage.style.color = "lightblue";
        form.appendChild(errorMessage);
        setTimeout(() => {
            Home()
        }, 4000);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Ha ocurrido un error";
        errorMessage.style.color = "red";
        form.appendChild(errorMessage);
        setTimeout(() => {
            Home()
        }, 4000);
    }
        
    const respuestaFinal = await res.json();
    console.log(respuestaFinal)

    //localStorage.setItem("participant", JSON.stringify(respuestaFinal.participant));
}



    
