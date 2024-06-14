import './participantForm.css';
import { Home } from '../../pages/home/home';
import { successfulNotice} from '../../utils/success/success';
import { errorWarning } from '../../utils/errores/errores';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { formData } from '../../components/forms/form';
import { loading, removeLoader } from '../../components/loading/loading';
//import { LOADING } from '../../components/loading/loading';


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

    })
}


//SUBMIT DEL REGISTRO DEL PARTICIPANTE
const submitParticipantReg = async (name, surname, email, eventId, form) => {
    console.log(name, surname, email, eventId, form )

     ///si falta el nombre, el mail o el pass...
      if (!name || !surname || !email) {
        errorWarning(form, "Complete el formulario", "rgb(244, 159, 128)")
        setTimeout(() => {
            const existingMessage = document.getElementById("statusMessage");
            if (existingMessage) {
                form.removeChild(existingMessage);
            }
        }, 2000);
        return;
        }

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

    const container = document.getElementById('participantForm')
    
   
    try {
        const res = await fetch(`${urlApi}/api/participant/register`, opciones);
        const respuestaFinal = await res.json();
        console.log(respuestaFinal)
    
        switch (res.status) {
            case 200:
                loading(container)
                console.log("participante apuntado")
            successfulNotice(form, "Gracias! Ya tienes los detalles del evento en tu mail 😁","green")
            setTimeout(() => {
                Home()
            }, 3000);
            return;
            case 409:
            loading(container)
            errorWarning(form, "Ya estás inscrito en este evento", "lightblue");
            setTimeout(() => {
                Home()
            }, 3000);  
            break;  
            default: // else
            console.log("Ocurrió un error inesperado");
            errorWarning(form, "Ha ocurrido un error, revisa los campos", "red");
        }
            
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    } finally {
        removeLoader()
    }

}



    
