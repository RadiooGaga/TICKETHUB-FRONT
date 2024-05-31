import { myData} from '../myData/myData';
import { eventForm } from '../createEvent/createEvent';
import { allMyEvents } from '../allMyEvents/allMyEvents';
import { eventsCreated } from '../eventsCreated/eventsCreated';
import './account.css';

export const Account = () => {

        const section = document.querySelector('#principal');
        section.innerHTML = "";
        const divOptionUser = document.createElement('div');
        divOptionUser.id = "divOptionUser";
        const buttonMisEventos = document.createElement('button');
        buttonMisEventos.textContent = "TODOS MIS EVENTOS";
        buttonMisEventos.id = "buttonMisEventos";
        const buttonEventosCreados = document.createElement('button');
        buttonEventosCreados.textContent = "EVENTOS CREADOS";
        buttonEventosCreados.id = "buttonEventosCreados";
        const buttonCrearEvento = document.createElement('button');
        buttonCrearEvento.textContent = "CREAR EVENTO";
        buttonCrearEvento.id = "buttonCrearEvento";
        const buttonMisDatos = document.createElement('button');
        buttonMisDatos.textContent = "MIS DATOS";
        buttonMisDatos.id = "buttonMisDatos";
    
        section.appendChild(divOptionUser);
        divOptionUser.appendChild(buttonMisEventos);
        divOptionUser.appendChild(buttonEventosCreados);
        divOptionUser.appendChild(buttonCrearEvento);
        divOptionUser.appendChild(buttonMisDatos);
    
        buttonMisEventos.addEventListener('click', (e) => {
            allMyEvents();
        })
        buttonEventosCreados.addEventListener('click', (e) => {
            eventsCreated();
        })
        buttonCrearEvento.addEventListener('click', (e) => {
            eventForm();
        })
        buttonMisDatos.addEventListener('click', (e) => {
            myData();
        })

}



    

 

    
    