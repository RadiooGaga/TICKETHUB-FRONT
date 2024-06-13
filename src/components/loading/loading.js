export const LOADING = (parentDiv) => {

    for (let i = 0; i < 10; i++) {
        const spinnerDiv = document.getElementById('spinnerContainer');
        spinnerDiv.classList.add('spinner');
        parentDiv.innerHTML += `
        <div class="spinner">
        </div>
        `
    }
}
