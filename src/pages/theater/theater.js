import { printEvents } from "../home/home";
import '../home/home.css';

//Recarga de página "Teatro".
export const Theater = async () => {
 
  const section = document.querySelector('#principal');  
  section.innerHTML = "";
  const divEvents = document.createElement('div');
  divEvents.id = "divEvents";
  const res = await fetch('http://localhost:3004/api/events/category/teatro');
  const events = await res.json();

  section.appendChild(divEvents);
  printEvents(events, divEvents);  
}