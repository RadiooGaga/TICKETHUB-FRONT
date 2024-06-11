import './sectionRegister.css'; 
import { Account } from '../../account/myAccount/account';
import { Header } from '../../components/header/header';
import { errorWarning } from '../../utils/errores/errores';

export const sectionRegister = () => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";
     
    Register(section);//dónde va a pintar el registro
};

export const Register = (parentNode) => {
  
    const divRegister = document.createElement('div');
    divRegister.id = "divRegister";
    const newReg = document.createElement('h2');
    newReg.textContent = "REGISTRO";
    newReg.id = "registerH2";
    const registerForm = document.createElement("form");
    registerForm.id = "loginForm";
    const inputUserName = document.createElement("input");
    inputUserName.className = "inputUN";
    const inputUserEmail = document.createElement('input');
    inputUserEmail.className = "inputUE";
    const inputPass = document.createElement("input");
    inputPass.className = "inputPass";
    const userTypeSelect = document.createElement('select');
    userTypeSelect.id = "typeUser";
    const optionUser = document.createElement("option");
    optionUser.textContent = "user";
    const optionAdmin = document.createElement("option");
    optionAdmin.textContent = "admin";
    const buttonReg = document.createElement("button");
    buttonReg.id = "buttonReg";
    
    inputUserName.placeholder = "usuario";
    inputUserName.type = "text";
    inputUserName.autocomplete = "username";
    inputUserEmail.placeholder = "yourname@email.com";
    inputUserEmail.type = "email";
    inputUserEmail.autocomplete = "email";
    inputPass.placeholder = "*****";
    inputPass.type = "password";
    inputPass.autocomplete = "current-password";
    buttonReg.textContent = "Registro";
    buttonReg.type = "submit";
        
  
    parentNode.appendChild(divRegister);
    divRegister.appendChild(newReg);
    divRegister.appendChild(registerForm);
    registerForm.appendChild(inputUserName);
    registerForm.appendChild(inputUserEmail);
    registerForm.appendChild(inputPass);
    registerForm.appendChild(userTypeSelect);
    userTypeSelect.appendChild(optionUser);
    userTypeSelect.appendChild(optionAdmin);
    registerForm.appendChild(buttonReg);
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        submitReg(
            inputUserName.value, 
            inputUserEmail.value, 
            inputPass.value, 
            userTypeSelect.value, 
            registerForm)
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
        const res = await fetch("http://localhost:3004/api/auth/register", fetchOptions);
        const respuestaFinal = await res.json();
        console.log(respuestaFinal)
       
        // si va guay
        switch (res.status) {
            case 200:
                console.log("registro exitoso!");
                localStorage.setItem("token", respuestaFinal.token);
                localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
                Header()
                Account()
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


