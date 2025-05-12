const WORKER_URL = "https://serviceepgt.workers.dev/api";

// 📌 Fonction pour charger les données dynamiques
async function chargerDonnees(endpoint, containerId, template) {
    try {
        const response = await fetch(`${WORKER_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

        const data = await response.json();
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        if (Array.isArray(data)) {
            data.forEach(item => {
                container.innerHTML += template(item);
            });
        } else {
            container.innerHTML = template(data);
        }
    } catch (error) {
        console.error(`Erreur lors du chargement de ${endpoint}:`, error);
    }
}

// 📜 Charger "À propos"
chargerDonnees("a-propos", "a-propos-description", data => `<p>${data.description}</p>`);

// ⭐ Charger les avis utilisateurs
chargerDonnees("avis", "avis-liste", avis => `<p><strong>${avis.nom} :</strong> ${avis.message} (${avis.date})</p>`);

// 📰 Charger les actualités
chargerDonnees("actualites", "actu-liste", actu => `<h3>${actu.titre}</h3><p>${actu.contenu} (${actu.date})</p>`);

// 🖼️ Charger les images
chargerDonnees("images", "images-container", image => `<img src="${image.url}" alt="${image.description}" width="200">`);

// ✍️ Charger les articles
chargerDonnees("articles", "articles-liste", article => `<h3>${article.titre}</h3><p>${article.body} (${article.date})</p>`);

// 📩 Envoyer le formulaire de contact
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch(`${WORKER_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, email, message })
        });

        if (!response.ok) throw new Error("Erreur lors de l'envoi du message.");

        document.getElementById("confirmation-message").style.display = "block";
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("Erreur contact:", error);
    }
});