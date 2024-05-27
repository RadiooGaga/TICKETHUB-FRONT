import './sectionRegister.css'; 
import { sectionLogin } from './sectionLogin';

export const sectionRegister = () => {
    const section = document.querySelector("#principal");
    section.innerHTML = "";
     
    Register(section);//dónde va a pintar el registro
}

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
    const pError = document.createElement('p');
    pError.id = "error";
    
    inputPass.type = "password";
    inputPass.autocomplete = "current-password";
    inputUserName.placeholder = "usuario";
    inputUserEmail.placeholder = "yourname@email.com";
    inputPass.placeholder = "*****";
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
    registerForm.appendChild(pError);
    
    registerForm.addEventListener('submit', (e) => {
        submitReg(
            inputUserName.value, 
            inputUserEmail.value, 
            inputPass.value, 
            userTypeSelect.value, 
            registerForm)
            // Si el envío del formulario es exitoso, redirigir a la página de inicio
            console.log("Hecho registro");
            sectionLogin()
    })
    
};

const submitReg = async (userName, email, password, rol, form) => {

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

    const res = await fetch("http://localhost:3004/api/auth/register", fetchOptions);

    if (res.status === 400) {
        const error = document.getElementById('error');
        error.textContent = "El usuario ya existe";
        error.style = "color: rgb(244, 159, 128)";
    
        form.appendChild(error);
        return;
    }

    const respuestaFinal = await res.json();
    console.log(respuestaFinal)

    localStorage.setItem("newUserData", JSON.stringify(respuestaFinal.user));

}


