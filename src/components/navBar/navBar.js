import { Home } from '../../pages/home/home';
import { reloadPages } from '../../pages/reloadPages/reloadPages.js';
import { Account } from '../../account/myAccount/account';
import { sectionLogin } from '../../pages/sectionLogReg/sectionLogin.js';
import { Header } from '../header/header.js';

import './navBar.css';


export const createNavbar = () => {
    
    const nav = document.createElement('nav'); 
    const ul = document.createElement('ul');
    ul.id = "list";

    const section = document.querySelector('#principal');
    const routes = [
        { id: 1, textContent: 'HOME', function: Home} ,
        { id: 2, textContent: 'CONCIERTOS', function: () => reloadPages(section, 'conciertos') },
        { id: 3, textContent: 'TEATRO', function: () => reloadPages(section, 'teatro') },
        { id: 4, textContent: 'EXPOSICIONES', function: () => reloadPages(section, 'exposiciones') },
        { id: 5, textContent: 'FERIAS', function: () => reloadPages(section, 'ferias') },
        { id: 6, textContent: 'TALLERES', function: () => reloadPages(section, 'talleres') },
        { id: 7, textContent: 'MI CUENTA', function: Account},
        { id: 8, textContent: 'LOGIN', function: sectionLogin}
    ];

    routes.forEach(route => {
        const a = document.createElement('a');
        a.textContent = route.textContent;
        a.id = route.id; // Asignar un ID único a cada elemento a
        ul.appendChild(a); 

        if (route.textContent === "LOGIN" && localStorage.getItem('token')) {
            a.textContent = "LOGOUT";
            a.addEventListener("click", () => {
                localStorage.clear();
                sectionLogin();
                Header();
            })
        } else {
            a.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });   

            route.function();
            const menuSmartphoneDisplay = document.querySelector('#divBurguer');
                if (menuSmartphoneDisplay) {
                    menuSmartphoneDisplay.classList.remove('visible');
                }
            });
        }

        if (route.id === 7) { // Verificar si el ID es 7 (MI CUENTA)
            if (!localStorage.getItem('token')) {
                a.style.display = 'none'; // Ocultar si no estás logueado
            } else {
                a.style.display = 'flex'; // Mostrar si estás logueado
            }
        }
    });
    
    nav.appendChild(ul)
    return nav;
}