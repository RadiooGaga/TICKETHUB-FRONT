import './participantForm.css';
import { Home } from '../../pages/home/home';
import { successfulNotice} from '../../utils/success/success';
import { errorWarning } from '../../utils/errores/errores';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { formData } from '../../components/forms/form';

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
    const participantForm = document.createElement("form");


    const fields = [
        { id: "participantName", name: "nombre", placeholder: "tu nombre", type: "text" },
        { id: "participantSurname", name: "apellidos", placeholder: "tus apellidos", type: "text" },
        { id: "participantEmail", name: "email", placeholder: "tu-email@email.com", type: "email" }
      ];
      
    const participantData = formData( participantForm , "participantForm","h2Participant", "RELLENA TUS DATOS", fields);

    section.appendChild(beautydiv);
    beautydiv.appendChild(divParticipant);
    divParticipant.appendChild(participantData);

    const buttonSend = document.createElement("button");
    buttonSend.id = "buttonSend";
    buttonSend.textContent = "Enviar";
    buttonSend.type = "submit";

    participantData.appendChild(buttonSend);


    //BOTON SUBMIT REGISTRO DEL PARTICIPANTE
    participantData.addEventListener('submit', (e)=> {
        e.preventDefault()
        const participantName = document.getElementById('participantName').value;
        const participantSurname = document.getElementById('participantSurname').value;
        const participantEmail = document.getElementById('participantEmail').value;

        submitParticipantReg(
        participantName,
        participantSurname,
        participantEmail,
        eventId, 
        participantData)  
        console.log("Participante registrado");
    })
}


//SUBMIT DEL REGISTRO DEL PARTICIPANTE
const submitParticipantReg = async (name, surname, email, eventId, form) => {
    console.log(name, surname,email, eventId, form )

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

    const res = await fetch(`${urlApi}/api/participant/register`, opciones);

    if (res.status === 200) {
        successfulNotice(form, "Gracias! Ya tienes los detalles del evento en tu mail 😁","green")
        setTimeout(() => {
            Home()
        }, 3000);

    } else if (res.status === 409) {
        errorWarning(form, "Ya estás inscrito en este evento", "lightblue");
        setTimeout(() => {
            Home()
        }, 3000);

    } else if (res.status === 400) {
        errorWarning(form, "Faltan campos por rellenar", "lightblue");
        setTimeout(() => {
            var errorElement = document.querySelector('#statusMessage')
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }, 1000);
        
    } else {
        errorWarning(form, "Ha ocurrido un error", "red");
        setTimeout(() => {
            Home()
        }, 3000);
    }
        
    const respuestaFinal = await res.json();
    console.log(respuestaFinal)

    //localStorage.setItem("participant", JSON.stringify(respuestaFinal.participant));
}



    
