import { createLogos } from '../logos/logos.js';
import { createSearchBar } from '../searchBar/searchBar.js';
import { createMenuBurguer } from '../burguerMenu/burguerMenu.js';
import { createNavbar } from '../navBar/navBar.js';
import './header.css';


export const Header = () => {
    const header = document.querySelector('header');
    header.innerHTML = "";
    
    const logos = createLogos()
    const searchComp = createSearchBar()
    const menuBurguer = createMenuBurguer()
    const navBar = createNavbar()

    header.appendChild(logos);
    header.appendChild(searchComp);
    header.appendChild(menuBurguer);
    header.appendChild(navBar);
}

















