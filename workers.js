export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/a-propos") {
      return new Response(JSON.stringify({
        titre: "À Propos",
        description: "ServiceEPGT est un projet dynamique propulsé par Cloudflare.",
        auteur: "Parfait",
        contact: "parfaitesaie@gmail.com"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/avis") {
      return new Response(JSON.stringify([
        { nom: "Jean Dupont", message: "Super site ! Très intuitif.", date: "2025-05-10" },
        { nom: "Sophie Martin", message: "Interface moderne et efficace.", date: "2025-05-09" }
      ]), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/actualites") {
      return new Response(JSON.stringify([
        { titre: "Nouvelle mise à jour", contenu: "ServiceEPGT ajoute de nouvelles fonctionnalités.", date: "2025-05-08" },
        { titre: "Maintenance prévue", contenu: "Une maintenance sera effectuée demain.", date: "2025-05-07" }
      ]), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/images") {
      return new Response(JSON.stringify([
        { url: "https://serviceepgt.pages.dev/static/images/image1.jpg", description: "Image de démonstration 1" },
        { url: "https://serviceepgt.pages.dev/static/images/image2.jpg", description: "Image de démonstration 2" }
      ]), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/articles") {
      return new Response(JSON.stringify([
        { titre: "Premier article", body: "Bienvenue sur ServiceEPGT !", date: "2025-05-06" },
        { titre: "Article de test", body: "Nous testons l'intégration Cloudflare Workers.", date: "2025-05-05" }
      ]), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
        const { nom, email, message } = await request.json();
        console.log(`Nouveau message reçu de ${nom} (${email}) : ${message}`);

        return new Response(JSON.stringify({ success: true, message: "Message envoyé !" }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify({ error: "Route non trouvée" }), { status: 404 });
  }
};