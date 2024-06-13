export const formCrearEvento = (parentDiv, formId, h3, h3Text, fields, select) => {

    const enterForm = document.createElement('form');
    enterForm.innerHTML = "";
    enterForm.id = formId;
    const h3createEvent = document.createElement('h3');
    h3createEvent.id= h3;
    h3createEvent.textContent = h3Text;
    enterForm.appendChild(h3createEvent);

    fields.forEach(field => {
        const input = document.createElement('input');
        input.id = field.id || "";
        input.type = field.type || 'text'; 
        input.placeholder = field.placeholder || ''; 
        input.value = field.value || "";
        enterForm.appendChild(input);
    });

    const categorySelector = document.createElement('select');
    categorySelector.id = select;
    const categories = [
        { id: 1, value: "conciertos", textContent: "conciertos" },
        { id: 2, value: "teatro", textContent: "teatro" },
        { id: 3, value: "exposiciones", textContent: "exposiciones" },
        { id: 4, value: "ferias", textContent: "ferias" },
        { id: 5, value: "talleres", textContent: "talleres" }
    ];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.textContent;
        categorySelector.appendChild(option);
    });

    enterForm.appendChild(categorySelector);
    parentDiv.appendChild(enterForm);

    return { enterForm, categorySelector, categories };
}