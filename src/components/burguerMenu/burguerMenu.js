import './burguerMenu.css';

export const createMenuBurguer = () => {

    const divIconBurguer = document.createElement('div');
    divIconBurguer.id = "divIconBurguer";
    const burguerIcon = document.createElement('img');
    burguerIcon.src = '/assets/pics/menuWhite.png';
    burguerIcon.id = "burguerIcon";
    const menuSmartphoneDisplay = document.createElement('div');
    menuSmartphoneDisplay.id = "divBurguer";
    menuSmartphoneDisplay.classList.add("visible");

    divIconBurguer.appendChild(burguerIcon);
    burguerIcon.appendChild(menuSmartphoneDisplay);


    // MENU HAMBURGUESA
    burguerIcon.addEventListener('click', (e) => {
        const menuSmartphone = document.querySelector('#divBurguer');
        menuSmartphone.classList.toggle('visible');

        const headerMobile = document.querySelector('header');
        const navList = document.querySelector('#list');
        headerMobile.appendChild(menuSmartphone);
        menuSmartphone.appendChild(navList);
    })

    return divIconBurguer;

}