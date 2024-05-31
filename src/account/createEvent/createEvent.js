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
    console.log(this)
    });

    const buttonCreateEvent = document.createElement('a');
    buttonCreateEvent.id = "createEventButton";
    buttonCreateEvent.textContent = "CREAR!";
    buttonCreateEvent.type = "submit";
    const pError = document.createElement('p');
    pError.id = "error";

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
    enterForm.appendChild(pError);
    

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
        submitEvent(
                inputEvent.value, 
                inputDate.value, 
                locationInput.value, 
                imgContent, 
                inputDescription.value, 
                selectedCategoryId,
                participants,
                creator,
                enterForm
            );
            console.log("lo pilla")
            //eventsCreated()
    });
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

      //si falta el nombre, la fecha, la localización...etc
      if (!eventName || !date || !location || !img || !description || !category) {
        const error = document.getElementById('error');
        error.textContent = "Faltan campos por rellenar";
        error.style = "color: rgb(244, 159, 128)";
    
        form.appendChild(error);
        console.log("faltan campos")

        } 
        switch (res.status) {
            case 400:
                console.log("Error al crear evento");
                break;
            case 200:
                console.log("Evento creado!");
                eventsCreated();
                break;
            default:
                console.log("Ocurrió un error inesperado");
        }
    
        
       
    
    const respuestaFinal = await res.json();
    console.log(respuestaFinal)

    localStorage.setItem("newEvent", respuestaFinal);
    localStorage.setItem("newEvent", JSON.stringify(respuestaFinal));
    
}






