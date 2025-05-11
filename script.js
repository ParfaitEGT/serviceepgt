document.addEventListener("DOMContentLoaded", function () {
    fetch('content/actualites.json')
        .then(response => response.json())
        .then(data => {
            const actuContainer = document.getElementById("actu-liste");
            if (actuContainer) {
                actuContainer.innerHTML = "";
                data.forEach(actu => {
                    const actuElement = document.createElement("div");
                    actuElement.innerHTML = `<h3>${actu.titre}</h3><img src="${actu.image}" alt="${actu.titre}" width="200"><p>${actu.contenu} (${actu.date})</p>`;
                    actuContainer.appendChild(actuElement);
                });
            }
        });
});