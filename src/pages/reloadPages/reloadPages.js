import { printEvents } from "../../pages/home/home";

// Función de recarga de cada página/categoría
export const reloadPages = async (parentDiv, category) => {
    parentDiv.innerHTML = "";
    
    const divEvents = document.createElement('div')
    divEvents.id = "divEvents";

    const url = `http://localhost:3004/api/events/category/${category}`;
    const events = await loadEvents(url);

    parentDiv.appendChild(divEvents);
    printEvents(events, divEvents);
}

const loadEvents = async (url) => {
    const res = await fetch(url);
    return await res.json();
}