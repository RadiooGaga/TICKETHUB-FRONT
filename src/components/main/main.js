import { Home } from '../../pages/home/home';
import './main.css';

export const Main = () => {

    const section = document.querySelector('#principal');
    section.style.backgroundImage = "url('/assets/pics/audience1.jpg')";
    section.innerHTML = "";
    const imagePromo = document.createElement('img');
    imagePromo.className = "imagePromo";
    imagePromo.src = '/assets/pics/ticket.png';

    imagePromo.addEventListener('click', (e => {
        Home()
    }))
  
    section.appendChild(imagePromo);
}