export const LOADING = (parentDiv) => {
    parentDiv.innerHTML ="";

    for (let i = 0; i < 10; i++) {
        const spinnerDiv = document.createElement('div');
        spinnerDiv.classList.add('spinner');
        parentDiv.innerHTML += `
        <div class="spinner">
        </div>
        `
    }
}
