import { Main } from '../main/main.js';
import { Home, printEvents } from '../../pages/home/home.js';
import { Concerts } from '../../pages/concerts/concerts';
import { Theater } from '../../pages/theater/theater.js';
import { Expo } from '../../pages/expo/expo.js';
import { Ferias } from "../../pages/ferias/ferias";
import { Talleres } from '../../pages/talleres/talleres.js';
import { Account } from '../../account/myAccount/account';
import { sectionLogin } from '../../pages/sectionLogReg/sectionLogin.js';

import './header.css';

export const Header = () => {
    const header = document.querySelector('header');
    header.innerHTML = "";
    const divLogos = document.createElement('div');
    divLogos.className = "logos";
    const logo1 = document.createElement('img');
    logo1.id = "logo1";
    logo1.src = '/assets/pics/logo.png';
    const logo2 = document.createElement('img');
    logo2.className = "logo2";
    logo2.src = '/assets/pics/logo2.png';
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
    const divIconBurguer = document.createElement('div');
    divIconBurguer.id = "divIconBurguer";
    const burguerIcon = document.createElement('img');
    burguerIcon.src = '/assets/pics/menuWhite.png';
    burguerIcon.id = "burguerIcon";
    const menuSmartphoneDisplay = document.createElement('div');
    menuSmartphoneDisplay.id = "divBurguer";
    menuSmartphoneDisplay.classList.add("visible");

    const nav = document.createElement('nav'); 
    const ul = document.createElement('ul');
    const routes = [
        { id: 1, textContent: 'HOME', function: Home } ,
        { id: 2, textContent: 'CONCIERTOS', function: Concerts},
        { id: 3, textContent: 'TEATRO', function: Theater },
        { id: 4, textContent: 'EXPOSICIONES',function: Expo },
        { id: 5, textContent: 'FERIAS', function: Ferias},
        { id: 6, textContent: 'TALLERES', function: Talleres},
        { id: 7, textContent: 'MI CUENTA', function: Account },
        { id: 8, textContent: 'LOGIN', function: sectionLogin }
    ];

    for (const route of routes) {
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
        }
        if (route.id === 7) { // Verificar si el ID es 7 (MI CUENTA)
            if (!localStorage.getItem('token')) {
                a.style.display = 'none'; // Ocultar si no estás logueado
            } else {
                a.style.display = 'flex'; // Mostrar si estás logueado
            }
        }
    } 
    

    header.appendChild(divLogos);
    divLogos.appendChild(logo1);
    divLogos.appendChild(logo2);
    header.appendChild(divSearchBar);
    divSearchBar.appendChild(searchForm);
    searchForm.appendChild(inputSearch);
    searchForm.appendChild(searchButton);
    searchButton.appendChild(imgLupita);
    header.appendChild(divIconBurguer);
    header.appendChild(nav);
    nav.appendChild(ul);
    divIconBurguer.appendChild(burguerIcon);
    burguerIcon.appendChild(menuSmartphoneDisplay);
   
    

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


    logo1.addEventListener('click', (e) => {
        Main()
    })


    // MENU HAMBURGUESA
    burguerIcon.addEventListener('click', (e) => {
        const menuSmartphone = document.querySelector('#divBurguer');
        menuSmartphone.classList.toggle('visible');

        const headerMobile = document.querySelector('header');
        headerMobile.appendChild(menuSmartphone);
        menuSmartphone.appendChild(ul);
    })


    // ACCESO A PÁGINAS EN TABLET Y PC

    const homeItem = document.getElementById('1');
    const concertsItem = document.getElementById('2');
    const theaterItem = document.getElementById('3');
    const expoItem = document.getElementById('4');
    const feriasItem = document.getElementById('5');
    const talleresItem = document.getElementById('6');
    const accountItem = document.getElementById('7');
    const loginItem = document.getElementById('8');

    const menuLinks = [
        { link: homeItem, handler: Home },
        { link: concertsItem, handler: Concerts },
        { link: theaterItem, handler: Theater },
        { link: expoItem, handler: Expo },
        { link: feriasItem, handler: Ferias },
        { link: talleresItem, handler: Talleres },
        { link: accountItem, handler: Account },
        { link: loginItem, handler: sectionLogin },
    ]


    menuLinks.forEach(item => {
        item.link.addEventListener('click', (e)  => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            item.handler();
            
            menuSmartphoneDisplay.classList.remove('visible');

        })
        
    });

    
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