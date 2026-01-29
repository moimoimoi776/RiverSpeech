// app.js
// Objectif : pour chaque iframe YouTube, récupérer l'ID vidéo
// puis définir --thumb sur le <article> parent pour le fond flouté.

function getYouTubeIdFromSrc(src) {
  try {
    const url = new URL(src);
    // cas: https://www.youtube.com/embed/VIDEO_ID
    if (url.hostname.includes("youtube.com") && url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1]?.split("?")[0] || null;
    }
    // cas: https://youtu.be/VIDEO_ID (au cas où)
    if (url.hostname === "youtu.be") {
      return url.pathname.replace("/", "") || null;
    }
    return null;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#ecouter article");

  cards.forEach((card) => {
    const iframe = card.querySelector("iframe");
    if (!iframe) return;

    const id = getYouTubeIdFromSrc(iframe.getAttribute("src") || "");
    if (!id) return;

    // Miniature YouTube (bonne qualité et stable)
    // hqdefault: 480x360 (souvent le meilleur compromis)
    const thumbUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    // Injecte la variable CSS utilisée par ::before
    card.style.setProperty("--thumb", `url("${thumbUrl}")`);
  });
});
