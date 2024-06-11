import { Account } from '../myAccount/account';
import { warning } from '../eventsCreated/eventsCreated';
import { sectionLogin } from '../../pages/sectionLogReg/sectionLogin';
import './myData.css';


//Recarga de página Mis Datos.
export const myData = async () => {
  
    const section = document.querySelector('#principal');  
    section.innerHTML = "";
    Account();
    const divData = document.createElement('div');
    divData.id = "divData";

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`http://localhost:3004/api/user/${user._id}`);
    const usuario= await res.json();
  
  
    section.appendChild(divData);
    printMyData(usuario, divData);  
  
}



const printMyData = (user, parentDiv) => {

 
    const divMyData = document.createElement('div');
    divMyData.id = "divMyData";
    const dataForm = document.createElement('form');
    dataForm.id = 'dataForm';
    const h3MyData = document.createElement('h3');
    h3MyData.className = "h3MyData";
    h3MyData.textContent = "MIS DATOS";
    const pUserName = document.createElement("input");
    pUserName.id = "pUserName";
    pUserName.placeholder = user.userName;
    pUserName.type = "text";
    const pUserEmail = document.createElement('input');
    pUserEmail.id = "pUserEmail";
    pUserEmail.placeholder = user.email;
    pUserEmail.type = "email";
    const pPass = document.createElement("input");
    pPass.id = "pPass";
    pPass.placeholder = "Tu contraseña";
    pPass.type = "text";
   
    const divButtonsData = document.createElement('div');
    divButtonsData.id = 'divButtonsData';
    const buttonDeleteAccount = document.createElement("button");
    buttonDeleteAccount.id = "buttonDeleteAccount";
    buttonDeleteAccount.textContent = "ELIMINAR CUENTA";

    buttonDeleteAccount.addEventListener('click', (e) => {
      const texto = "¿SEGURO QUE DESEA ELIMINAR SU CUENTA?";
      warning(divMyData, deleteUser, user, texto);
    })
   

    parentDiv.appendChild(divMyData);
    divMyData.appendChild(dataForm);
    dataForm.appendChild(h3MyData);
    dataForm.appendChild(pUserName);
    dataForm.appendChild(pUserEmail);
    dataForm.appendChild(pPass);
    divMyData.appendChild(divButtonsData);
    divButtonsData.appendChild(buttonDeleteAccount);
    
}



export const deleteUser = async (user) => {

  const options = {
     method: "DELETE",
     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
     }
  };

  try {
    const res = await fetch(`http://localhost:3004/api/user/delete-user/${user._id}`, options);
    const data = await res.json();

    if (res.ok) {
        const myData = document.getElementById('divMyData');
        myData.remove()
        const divData = document.getElementById('divData');
        const divUserDeleted = document.createElement('div');
        divUserDeleted.id = "divUserDeleted";
        const pUserDeleted = document.createElement('p');
        pUserDeleted.id = "pUserDeleted";
        pUserDeleted.textContent = "USUARIO ELIMINADO";
        console.log("Usuario eliminado");  

        divData.appendChild(divUserDeleted);
        divUserDeleted.appendChild(pUserDeleted);

        localStorage.clear();
        setTimeout(() => {
          sectionLogin()
      }, 2000);
        
    }

    if (!res.ok) {
      console.log("Error al eliminar el usuario:", data);
    }
       
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }

};