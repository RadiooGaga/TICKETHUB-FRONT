import { Account } from '../myAccount/account';
import { warning } from '../eventsCreated/eventsCreated';
import { sectionLogin } from '../../pages/sectionLogReg/sectionLogin';
import { urlApi } from '../../utils/apiUrl/apiUrl';
import { helloByeFunc } from '../../components/saludos/saludos';
import { formData } from '../../components/forms/form';
import './myData.css';



//Recarga de página Mis Datos.
export const myData = async () => {
  
    const section = document.querySelector('#principal');  
    section.innerHTML = "";
    Account();
    const divData = document.createElement('div');
    divData.id = "divData";

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`${urlApi}/api/user/${user._id}`);
    const usuario= await res.json();
  
    section.appendChild(divData);
    printMyData(usuario, divData);  
  
}



const printMyData = (user, parentDiv) => {

  const divMyData = document.createElement('div');
  divMyData.id = "divMyData";

  const fields = [
    { id: "pUserName", name: "nombre", placeholder: user.userName, type: "text" },
    { id: "pUserEmail", name: "email", placeholder: user.email, type: "email" },
    { id: "pPass", name: "contraseña", placeholder: "Tu contraseña", type: "password" }
  ];

    const misDatos = formData( divMyData, "dataForm", "h3MyData", "MIS DATOS", fields);

    const divButtonsData = document.createElement('div');
    divButtonsData.id = 'divButtonsData';
    const buttonDeleteAccount = document.createElement("button");
    buttonDeleteAccount.id = "buttonDeleteAccount";
    buttonDeleteAccount.textContent = "ELIMINAR CUENTA";

    buttonDeleteAccount.addEventListener('click', (e) => {
      const texto = "¿SEGURO QUE DESEA ELIMINAR SU CUENTA?";
      warning(divMyData, deleteUser, user, texto);
      loading(divMyData)
    })  

    parentDiv.appendChild(divMyData);
    divMyData.appendChild(misDatos);
    divMyData.appendChild(divButtonsData);
    divButtonsData.appendChild(buttonDeleteAccount);

}



export const deleteUser = async (user) => {

  const options = {
     method: "DELETE",
     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
     }
  };

  try {
    const res = await fetch(`${urlApi}/api/user/delete-user/${user._id}`, options);
    const data = await res.json();

    if (res.ok) {
      const divData = document.getElementById('divData');
        const myData = document.getElementById('divMyData');
        myData.remove()
        helloByeFunc( divData, "helloByeDiv", "helloByeP", "USUARIO ELIMINADO")
        localStorage.clear();
        const backToInit = document.getElementById('8');
        setTimeout(() => {
          sectionLogin()
          backToInit.textContent = "LOGIN";
      }, 1200);
    }

    if (!res.ok) {
      console.log("Error al eliminar el usuario:", data);
    }
       
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }

};