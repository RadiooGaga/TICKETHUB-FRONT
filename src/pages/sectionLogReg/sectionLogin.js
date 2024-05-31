import { sectionRegister } from './sectionRegister';
import { Header } from '../../components/header/header';
import { Account } from '../../account/myAccount/account';
import './sectionLogin.css'; 


export const sectionLogin = () => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";
     
    Login(section);//dónde va a pintar el logueo
}


const Login = (parentNode) => {
    
    const divLogin = document.createElement('div');
    divLogin.id = "divLogin";
    const newLog = document.createElement('h2');
    newLog.textContent = "LOGIN";
    newLog.id = "loginH2";
    const div = document.createElement('div');
    div.className = "registrarseDiv";
    const pNotRegistered = document.createElement('span');
    pNotRegistered.textContent = "¿Nuevo en TicketHub?";
    pNotRegistered.className = "newUserSpan";
    const aRegNewUser = document.createElement('a');
    aRegNewUser.textContent = "Regístrate";
    aRegNewUser.id = "registrateAqui";

    const loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    const inputUserName = document.createElement("input");
    inputUserName.className = "inputUN";
    inputUserName.type = "text";
    inputUserName.placeholder = "usuario";
    inputUserName.autocomplete = "userName";
    const inputPass = document.createElement("input");
    inputPass.className = "inputPass";
    inputPass.placeholder = "*****";
    inputPass.type = "password";
    inputPass.autocomplete = "password";
    const buttonLog = document.createElement("button");
    buttonLog.id = "buttonLog";
    buttonLog.textContent = "Acceder";
    const pError = document.createElement('p');
    pError.id = "error";
    
    parentNode.appendChild(divLogin);
    divLogin.appendChild(newLog);
    divLogin.appendChild(div);
    div.appendChild(pNotRegistered);
    div.appendChild(aRegNewUser);
    divLogin.appendChild(loginForm);
    loginForm.appendChild(inputUserName);
    loginForm.appendChild(inputPass);
    loginForm.appendChild(buttonLog);
    loginForm.appendChild(pError);

    aRegNewUser.addEventListener('click', (e) => {
        sectionRegister();
    })
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        submit(inputUserName.value, inputPass.value, loginForm);
        console.log("he hecho submit");
    })
    
}  
        
    
const submit = async  (userName,  password,  form) => {

    const objetoFinal = JSON.stringify({
        userName,
        password
   
    });

    const opciones = {
        method: "POST",
        body: objetoFinal,
        headers: {
            "Content-Type": "application/json"
        }
    }

   const res = await fetch('http://localhost:3004/api/auth/login', opciones); 

   if (res.status === 400) {
        const error = document.getElementById('error');
        error.textContent = "Usuario y/o contraseña incorrectos";
        error.style = "color: rgb(244, 159, 128)";

        form.appendChild(error);
        return;
    }

    const respuestaFinal = await res.json();
    console.log(respuestaFinal);

    localStorage.setItem("token", respuestaFinal.token);
    localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
    Header();
    Account();
}