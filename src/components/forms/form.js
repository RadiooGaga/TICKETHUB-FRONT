
export const formData = (parentDiv, formId, ID, formTitle, fields) => {

    const div = document.createElement('div');
    const form = document.createElement('form');
    form.id = formId;
    const h3 = document.createElement('h3');
    h3.id = ID;
    h3.textContent = formTitle;
    div.appendChild(form);
    form.appendChild(h3);

    fields.forEach(field => {
        const input = document.createElement('input');
        input.id = field.id || "";
        input.type = field.type || 'text'; 
        input.placeholder = field.placeholder || ''; 
        input.name = field.name || '';
        form.appendChild(input);
    });

    parentDiv.appendChild(div);
    return form;
}

