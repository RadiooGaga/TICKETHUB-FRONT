import { Account } from '../../account/myAccount/account';
import { Header } from '../../components/header/header';
import { errorWarning } from '../../utils/errores/errores';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { formData } from '../../components/forms/form';
import { helloByeFunc } from '../../components/saludos/saludos';
import './sectionRegister.css'; 


export const sectionRegister = () => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";
     
    Register(section);//dónde va a pintar el registro
};

// FORMULARIO REGISTRO
export const Register = (parentNode) => {
  
    const divRegister = document.createElement('div');
    divRegister.id = "divRegister";
    const selector = document.createElement('select');
    selector.id = "inputRol";
    const optionUser = document.createElement("option");
    optionUser.textContent = "user";
    const optionAdmin = document.createElement("option");
    optionAdmin.textContent = "admin";

    const fields = [
        { id: "inputUN", name: "nombre de usuario", placeholder: "usuario", type: "text", autocomplete: "username" },
        { id: "inputUE", name: "email",placeholder: "email", type: "email", autocomplete: "email"  },
        { id: "inputPass", name: "contraseña", type: "password", placeholder: "*****",  autocomplete: "current-password"}
      ];
 
    const registerData = formData(divRegister, "registerForm", "registerH2", "REGISTRO", fields )
     
    parentNode.appendChild(divRegister);
    divRegister.appendChild(registerData);
    registerData.appendChild(selector);
    selector.appendChild(optionUser);
    selector.appendChild(optionAdmin);

    const buttonReg = document.createElement("button");
    buttonReg.id = "buttonReg";
    buttonReg.textContent = "Registro";
    buttonReg.type = "submit";
    registerData.appendChild(buttonReg);

    
    registerData.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputUserName = document.getElementById("inputUN").value;
        const inputUserEmail = document.getElementById("inputUE").value;
        const inputPass = document.getElementById("inputPass").value;

        submitReg(
            inputUserName, 
            inputUserEmail, 
            inputPass, 
            selector.value, 
            registerData)
    })
    
};

const submitReg = async (userName, email, password, rol, form) => {

     //si falta el nombre, el mail o el pass...
     if (!userName || !email || !password) {
        errorWarning(form, "Complete el formulario", "rgb(244, 159, 128)")
        console.log("faltan datos")
        return;
    }

    const newUserData = JSON.stringify({
        userName,
        email,
        password,
        rol
    });

    const fetchOptions = {
        method: "POST",
        body: newUserData,
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await fetch(`${urlApi}/api/auth/register`, fetchOptions);
        const respuestaFinal = await res.json();
        console.log(respuestaFinal)
       
        // si va guay
        switch (res.status) {
            case 200:
                console.log("registro exitoso!");
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

            case 401: // si existe
            errorWarning(form, "El usuario ya existe", "lightblue");
            console.log("El usuario ya existe");
                break;
            default: // else
                console.log("Ocurrió un error inesperado");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    }

};


