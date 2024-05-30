console.log(data);

// You can start simple and just render a single pokemon card from the first element
console.log(data[0]);

// List of color names to exclude
const colorNames = [
  "red",
  "blue",
  "yellow",
  "gold",
  "silver",
  "crystal",
  "ruby",
  "sapphire",
  "emerald",
  "firered",
  "leafgreen",
  "diamond",
  "pearl",
  "platinum",
  "heartgold",
  "soulsilver",
  "black",
  "white",
  "black-2",
  "white-2",
]; // Function to create a single Pokemon card
function createCard(pokemon) {
  const card = document.createElement("li");
  card.className = "card";

  // Card Title
  const title = document.createElement("h2");
  title.className = "card--title";
  title.textContent = pokemon.name;
  card.appendChild(title);

  // Card Image
  const img = document.createElement("img");
  img.className = "card--img";
  img.src = pokemon.sprites.other["official-artwork"].front_default;
  img.width = 256;

  // Toggle images on click
  let isDefaultImage = true;
  img.addEventListener("click", () => {
    isDefaultImage = !isDefaultImage;
    img.src = isDefaultImage
      ? pokemon.sprites.other["official-artwork"].front_default
      : pokemon.sprites.front_default;
  });

  card.appendChild(img);

  // Card Stats
  const stats = document.createElement("ul");
  stats.className = "card--text";
  const statsArray = [
    `HP: ${pokemon.stats[0].base_stat}`,
    `ATTACK: ${pokemon.stats[1].base_stat}`,
    `DEFENSE: ${pokemon.stats[2].base_stat}`,
    `SPECIAL-ATTACK: ${pokemon.stats[3].base_stat}`,
    `SPECIAL-DEFENSE: ${pokemon.stats[4].base_stat}`,
    `SPEED: ${pokemon.stats[5].base_stat}`,
  ];
  statsArray.forEach((stat) => {
    const statItem = document.createElement("li");
    statItem.textContent = stat;
    stats.appendChild(statItem);
  });
  card.appendChild(stats);

  // Games Appeared In (Extended Requirement)
  const games = document.createElement("ul");
  games.className = "card--games";
  pokemon.game_indices
    .map((game) => game.version.name)
    .filter((gameName) => !colorNames.includes(gameName.toLowerCase()))
    .forEach((gameName) => {
      const gameItem = document.createElement("li");
      gameItem.textContent = gameName;
      games.appendChild(gameItem);
    });
  card.appendChild(games);

  return card;
}

// Main Function to Render All Cards
function renderCards() {
  const cardContainer = document.querySelector(".cards");
  data.forEach((pokemon) => {
    const card = createCard(pokemon);
    cardContainer.appendChild(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", renderCards);
