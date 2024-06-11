import { printEvents } from "../../pages/home/home";
import './searchBar.css';
  
export const createSearchBar = () => {  

    const divSearchBar = document.createElement('div');
    divSearchBar.id = "search";
    const searchForm = document.createElement('form');
    searchForm.className = "searchForm";
    searchForm.action= "buscar";
    searchForm.method = "GET";
    const inputSearch = document.createElement('input');
    inputSearch.id = "inputBuscar";
    inputSearch.type = "text";
    inputSearch.placeholder = "busca tu evento";
    const searchButton = document.createElement('a');
    searchButton.id = "lupita";
    const imgLupita = document.createElement('img');
    imgLupita.src = "/assets/pics/lupa.png";

   
    divSearchBar.appendChild(searchForm);
    searchForm.appendChild(inputSearch);
    searchForm.appendChild(searchButton);
    searchButton.appendChild(imgLupita);

        //HABILITAR BOTON DE BÚSQUEDA DE EVENTOS tanto para keyEnter como click
        searchButton.addEventListener("click", (e) => {
            const busqueda = inputSearch.value.trim();
            searchInfo(busqueda)
        });
    
        inputSearch.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const busqueda = inputSearch.value.trim();
                searchInfo(busqueda);
            }
        });
        return divSearchBar;
}

const searchInfo = (data) => {

    const section = document.querySelector('#principal');
    section.innerHTML = "";
    section.style.backgroundColor = "black";

    const busqueda = data;  console.log(busqueda);

    if (busqueda.length > 2) {
    
        fetch(`http://localhost:3004/api/events/search/${busqueda}`)
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    noResultsFound(section);
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(busqueda => {
                if (busqueda.length === 0) { 
                    noResultsFound(section);
                } else {
                    console.log("evento de", busqueda);
                    printEvents(busqueda, section);
                }  
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                noResultsFound(section); 
            });
    }
}


const noResultsFound = (parentDiv) => {
    
    const div = document.createElement('div');
    div.id = "noResults";
    const p = document.createElement('p');
    p.id = "noResultsParagraph";
    p.textContent = "No se encontraron resultados";
  
    parentDiv.appendChild(div);
    div.appendChild(p);
}