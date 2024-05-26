import './createEvent.css';
import { Account } from '../myAccount/account';
import { eventsCreated } from '../eventsCreated/eventsCreated';



//FORMULARIO PARA PODER CREAR UN EVENTO
export const eventForm = async () => {

    const section = document.querySelector("#principal");
    section.innerHTML = "";
    Account();
    const divEnter = document.createElement('div');
    divEnter.id = "divEventFormulario";  
    const h3createEvent = document.createElement('h3');
    h3createEvent.className = "h3createEvent";
    h3createEvent.textContent = "CREA TU EVENTO";
    const enterForm = document.createElement('form');
    enterForm.innerHTML = "";
    enterForm.id = "enterEventForm";
    const inputEvent = document.createElement('input');
    inputEvent.placeholder = "tu evento";
    inputEvent.type = "text";
    inputEvent.id = "inputEventId";
    const inputDate = document.createElement('input');
    inputDate.placeholder = "día";
    inputDate.type = "text";
    inputDate.id = "inputeEventDate";
    const locationInput = document.createElement('input');
    locationInput.placeholder = "ubicación";
    locationInput.id = "locationInput";
    locationInput.type = 'text';
    const fileInput = document.createElement('input');
    fileInput.id = "fileInput";
    fileInput.type = 'file';
    const inputDescription = document.createElement('input');
    inputDescription.id = "inputDescription";
    inputDescription.placeholder = "describe tu evento";
    inputDescription.type = "text";
    let participants = [];
    const user = JSON.parse(localStorage.getItem("user"));
    const creator = `${user._id}`;
    const categorySelector = document.createElement('select');
    categorySelector.id = "selectCategories";
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
        categorySelector.appendChild(option);
    }
    let selectedCategoryId = categories[0].value;


    // EVENTO DE CAMBIO DE CATEGORÍA.
    categorySelector.addEventListener('change', function() {
    selectedCategoryId = this.value; //value seleccionado
    });

    const buttonCreateEvent = document.createElement('a');
    buttonCreateEvent.id = "createEventButton";
    buttonCreateEvent.textContent = "CREAR!";

    section.appendChild(divEnter);
    divEnter.appendChild(enterForm);
    enterForm.appendChild(h3createEvent)
    enterForm.appendChild(inputEvent);
    enterForm.appendChild(inputDate);
    enterForm.appendChild(locationInput);
    enterForm.appendChild(fileInput);
    enterForm.appendChild(inputDescription);
    enterForm.appendChild(categorySelector);
    enterForm.appendChild(buttonCreateEvent);

    //imagen para subir al evento
    let imgContent;
    const fileInputId = document.getElementById('fileInput');

    fileInputId.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const contenido = e.target.result; // La imagen se cargará como una URL
        imgContent = contenido;
    };

    reader.readAsDataURL(file);
    // Lee el contenido del archivo como una URL de datos.
    }); 

    
    //BOTÓN "CREAR EVENTO"
    buttonCreateEvent.addEventListener("click", (e) => {
        
        submitEvent(
            inputEvent.value, 
            inputDate.value, 
            locationInput.value, 
            imgContent, 
            inputDescription.value, 
            selectedCategoryId,
            participants,
            creator,
            enterForm)
        .then(() => {
        // Si el envío del formulario es exitoso, redirigimos la página a "eventos creados"
            eventsCreated();         
            console.log("Evento subido");
        })
        .catch(error => {
            console.error("Error al subir el evento:", error);
        });
    })
}


//FUNCIÓN SUBMIT DE "CREAR EVENTO"
const submitEvent = async (eventName, date, location, img, description, category, participants, creator, form) => {

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

    console.log(creator, "id del creador")

    const fetchOptions = {
        method: "POST",
        body: finalObject,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch("http://localhost:3004/api/user/new-event", fetchOptions);

    if (res.ok) {
        console.log('Evento creado!'); 
    }

    if (res.status === 400) {
        console.log('Error en la petición'); 
    } 

    const respuestaFinal = await res.json();
    console.log(respuestaFinal)

    localStorage.setItem("newEvent", respuestaFinal);
    localStorage.setItem("newEvent", JSON.stringify(respuestaFinal));
}






