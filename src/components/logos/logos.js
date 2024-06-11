import { Main } from "../main/main";
import './logos.css';

export const createLogos = () => {
    const divLogos = document.createElement('div');
    divLogos.className = "logos";
    const logo1 = document.createElement('img');
    logo1.id = "logo1";
    logo1.src = '/assets/pics/logo.png';
    const logo2 = document.createElement('img');
    logo2.className = "logo2";
    logo2.src = '/assets/pics/logo2.png';

    divLogos.appendChild(logo1);
    divLogos.appendChild(logo2);

    logo1.addEventListener('click', (e) => {
        Main()
    })

    return divLogos;
}
