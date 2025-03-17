const cacheKey = "cacheData";

function readCache() {
  try {
    const data = localStorage.getItem(cacheKey);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("No cache found for display.");
    return null;
  }
}

async function displayTopPlays() {
  const cachedData = readCache();
  if (!cachedData) return; 

  const container = document.getElementById("osuScores");
  if (!container) return console.error("Error: Element with ID 'osuScores' not found.");

  container.innerHTML = "";

  cachedData.forEach((score) => {
    if (!score.url) return;

    const link = document.createElement("a");
    link.href = score.url;
    link.target = "_blank";

    const section = document.createElement("section");
    const box = document.createElement("div");
    box.className = "box";

    const title = document.createElement("h3");
    title.textContent = score.beatmap;

    const mods = document.createElement("p");
    mods.textContent = score.mods;

    box.append(title, mods);
    section.appendChild(box);
    link.appendChild(section);
    container.appendChild(link);
  });
}

// export { displayTopPlays };
