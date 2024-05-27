/*import './paginationButton.css'
import { printEvents } from '../../pages/home/home';


export const renderButtons = () => {
    const section = document.querySelector('#principal'); 
    const contentContainer = document.querySelector('#divEvents'); 
    const moreEvents = document.createElement('div');
    moreEvents.className = "moreEvents";

    const previousButton = document.createElement('button');
    previousButton.textContent = "< Previous ";
    previousButton.id = "paginationPrevious";

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'currentPage';
    currentPageLabel.innerText = '1'; // Start with page 1

    const nextButton = document.createElement('button');
    nextButton.textContent = "Next >";
    nextButton.id = "paginationNext";

    section.appendChild(contentContainer); 
    section.appendChild(moreEvents); 
    moreEvents.appendChild(previousButton);
    moreEvents.appendChild(currentPageLabel);
    moreEvents.appendChild(nextButton);

    let currentPage = 1;
    const totalPages = 5;

    previousButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            currentPageLabel.innerText = currentPage;
            nextButton.disabled = false;
            await eventsPerPage(currentPage);
        }
        if (currentPage === 1) {
            previousButton.disabled = true;
        }
    });

    nextButton.addEventListener('click', async () => {
        if (currentPage < totalPages) {
            currentPage++;
            currentPageLabel.innerText = currentPage;
            previousButton.disabled = false;
            await eventsPerPage(currentPage);
        }
        if (currentPage === totalPages) {
            nextButton.disabled = true;
        }
    });

    const eventsPerPage = async (page) => {
        const limit = 10; 
        const res = await fetch(`http://localhost:30004api/events?page=${page}&limit=${limit}`);
        const data = await res.json(); 
        const divEvents = document.querySelector('#divEvents');
        divEvents.innerHTML = ""; 
        printEvents(data, divEvents); 
    }

    // Llama a eventsPerPage para cargar eventos iniciales
    eventsPerPage(currentPage);

    // Llama a updatePaginationButtons para establecer el estado inicial de los botones
    updatePaginationButtons(currentPage, totalPages);
};

*/



