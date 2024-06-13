import './createEvent.css';
import { Account } from '../myAccount/account';
import { eventsCreated } from '../eventsCreated/eventsCreated';
import { formCrearEvento } from '../../components/forms/createEvForm';
import { errorWarning } from '../../utils/errores/errores';
import { urlApi } from '../../utils/apiUrl/apiUrl';



//FORMULARIO PARA PODER CREAR UN EVENTO
export const eventForm = async () => {

    const section = document.querySelector("#principal");
    section.innerHTML = "";
    Account();

    const divEnter = document.createElement('div');
    divEnter.id = "divEventFormulario";  
    const user = JSON.parse(localStorage.getItem("user"));
    const creator = `${user._id}`;
    let participants = [];

    const fields = [
        { id: "inputEventId", type: "text",  placeholder: "tu evento" },
        { id: "inputeEventDate", type: "text", placeholder: "día"},
        { id: "locationInput", type: "text", placeholder: "ubicación" },
        { id: "fileInput", type: "file" },
        { id: "inputDescription", type: "text", placeholder: "describe tu evento"}
      ];
    
    const { enterForm, categorySelector, categories } = formCrearEvento(divEnter,"enterEventForm", "h3createEvent", "CREA TU EVENTO",
    fields, "selectCategories")
    
    let selectedCategoryId = categories[0].value;

    // EVENTO DE CAMBIO DE CATEGORÍA.
    categorySelector.addEventListener('change', function() {
    selectedCategoryId = this.value; //value seleccionado
    console.log(this)
    });

    const buttonCreateEvent = document.createElement('a');
    buttonCreateEvent.id = "createEventButton";
    buttonCreateEvent.textContent = "CREAR!";
    buttonCreateEvent.type = "submit";

    section.appendChild(divEnter);
    divEnter.appendChild(enterForm);
    enterForm.appendChild(categorySelector);
    enterForm.appendChild(buttonCreateEvent);
    

    //imagen para subir al evento
    let imgContent;
    const fileInputId = document.getElementById('fileInput');

    fileInputId.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => { // lee el contenido de archivos almacenados en el cliente
        const contenido = e.target.result; // La imagen se cargará como una URL
        imgContent = contenido;
    };

    reader.readAsDataURL(file);
    // Lee el contenido del archivo como una URL de datos.
    }); 

    //BOTÓN "CREAR EVENTO"
    buttonCreateEvent.addEventListener("click", (e) => {
        e.preventDefault();
        const inputEvent = document.getElementById("inputEventId").value;
        const inputDate = document.getElementById("inputeEventDate").value;
        const locationInput = document.getElementById("locationInput").value;
        const inputDescription = document.getElementById("inputDescription").value;
        submitEvent(
                inputEvent, 
                inputDate, 
                locationInput, 
                imgContent, 
                inputDescription, 
                selectedCategoryId,
                participants,
                creator,
                enterForm
        ); 
    });
}


//FUNCIÓN SUBMIT DE "CREAR EVENTO"
const submitEvent = async (eventName, date, location, img, description, category, participants,  creator, form) => {

       //si falta el nombre, la fecha, la localización...etc
       if (!eventName || !date || !location || !img || !description || !category) {
        errorWarning(form, "faltan campos por rellenar", "#054444")
        console.log("faltan campos")
        return;
        } 

    const finalObject = JSON.stringify({
        eventName,
        date,
        location,
        img,
        description,
        category,
        participants,
        creator
    });

    const token = localStorage.getItem("token"); 
    console.log(creator, "id del creador")

    const fetchOptions = {
        method: "POST",
        body: finalObject,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const res = await fetch(`${urlApi}/api/new-event`, fetchOptions);
        const respuestaFinal = await res.json();
        console.log(respuestaFinal)

        if (res.status === 201) {
            console.log("Evento creado!");
                localStorage.setItem("newEvent", JSON.stringify(respuestaFinal));
                eventsCreated();
                return;
        } else {
            console.log("Error al crear evento");
        }
        
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    }
    
}






