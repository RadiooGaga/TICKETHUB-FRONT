import { sectionRegister } from './sectionRegister';
import { Header } from '../../components/header/header';
import { Account } from '../../account/myAccount/account';
import { errorWarning } from '../../utils/errores/errores';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { formData } from '../../components/forms/form';
import { helloByeFunc } from '../../components/saludos/saludos';
import './sectionLogin.css'; 
import { loading, removeLoader } from '../../components/loading/loading';



export const sectionLogin = () => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";
     
    Login(section);//dónde va a pintar el logueo
}

// FORMULARIO LOGIN
const Login = (parentNode) => {
    
    const divLogin = document.createElement('div');
    divLogin.id = "divLogin";
    const div = document.createElement('div');
    div.className = "registrarseDiv";
    const pNotRegistered = document.createElement('span');
    pNotRegistered.textContent = "¿Nuevo en TicketHub?";
    pNotRegistered.className = "newUserSpan";
    const aRegNewUser = document.createElement('a');
    aRegNewUser.textContent = "Regístrate";
    aRegNewUser.id = "registrateAqui";

    const fields = [
        { id: "inputUN", name: "usuario", placeholder: "usuario", type: "text", autocomplete: "userName" },
        { id: "inputPass", name: "contraseña", placeholder: "*****", type: "password", autocomplete: "password" }
      ];
    const userData = formData(divLogin, "loginForm", "loginH2", "LOGIN", fields )

    parentNode.appendChild(divLogin);
    divLogin.appendChild(userData);
    divLogin.appendChild(div);
    div.appendChild(pNotRegistered);
    div.appendChild(aRegNewUser);

    const buttonLog = document.createElement("button");
    buttonLog.id = "buttonLog";
    buttonLog.type = "submit";
    buttonLog.textContent = "Acceder";
    userData.appendChild(buttonLog);
 

    aRegNewUser.addEventListener('click', (e) => {
        sectionRegister();
    })
    
    userData.addEventListener("submit", (e) => {
        e.preventDefault()
        const inputUserName = document.getElementById("inputUN").value;
        const  inputPass = document.getElementById("inputPass").value;
        submit(inputUserName, inputPass, userData);
    })
    
}  
        
    
const submit = async  (userName,  password,  form) => {
        //si falta el nombre, el mail o el pass...
        if (!userName || !password) {
            errorWarning(form, "Complete el formulario", "rgb(244, 159, 128)")
            setTimeout(() => {
                const existingMessage = document.getElementById("statusMessage");
                if (existingMessage) {
                    form.removeChild(existingMessage);
                }
            }, 2000);
            return;
        }

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
        const container = document.getElementById('divLogin')
        loading(container)

    try {
        
        const res = await fetch(`${urlApi}/api/auth/login`, opciones);
        const respuestaFinal = await res.json();
        console.log(respuestaFinal); 

        switch (res.status) {
            case 200:
                console.log("login!");
                localStorage.setItem("token", respuestaFinal.token);
                localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
                const section = document.querySelector('#principal');
                Header()
                Account()  
                helloByeFunc(section, "helloByeDiv", "helloByeP", `Hola ${respuestaFinal.user.userName}!`);
                setTimeout(() => {
                    document.getElementById("helloByeDiv").style.display = "none";
                }, 1000);
                return;
            case 400:
                errorWarning(form, "Usuario y/o contraseña incorrectos", "rgb(244, 159, 128)")
                break;
                default: // else
                    console.log("Ocurrió un error inesperado");
        }
    } catch (error) {   
        console.error("Error al enviar la solicitud:", error);
    } finally {
        removeLoader()
    }

}