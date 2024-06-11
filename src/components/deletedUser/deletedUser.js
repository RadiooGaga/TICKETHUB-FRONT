import './deletedUser.css'

export const warningUserDeleted = () => {
    
    const divData = document.getElementById('divData');
    const divUserDeleted = document.createElement('div');
    divUserDeleted.id = "divUserDeleted";
    const pUserDeleted = document.createElement('p');
    pUserDeleted.id = "pUserDeleted";
    pUserDeleted.textContent = "USUARIO ELIMINADO";
    console.log("Usuario eliminado");  
    
    divData.appendChild(divUserDeleted);
    divUserDeleted.appendChild(pUserDeleted);
}

