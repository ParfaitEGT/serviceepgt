document.addEventListener("DOMContentLoaded", function () {
    console.log("Le site est chargé !");

    fetch('content/actualites.json')
        .then(response => response.json())
        .then(data => {
            const actuContainer = document.getElementById("actu-liste");

            // Vérifie que la div existe avant d'ajouter des éléments
            if (actuContainer) {
                data.forEach(actu => {
                    const actuElement = document.createElement("div");
                    actuElement.innerHTML = `<h3>${actu.titre}</h3><p>${actu.contenu} (${actu.date})</p>`;
                    actuContainer.appendChild(actuElement);
                });
            } else {
                console.error("Erreur : élément 'actu-liste' introuvable.");
            }
        })
        .catch(error => console.error("Erreur lors du chargement des actualités :", error));
});