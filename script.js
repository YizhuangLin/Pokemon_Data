function createApp() {
    const app = document.getElementById("app");
    const title = document.createElement("h1");
    title.innerText = "Pokedex";
    app.appendChild(title);


    const nav = document.createElement("nav");
    const navList = document.createElement("ul");
    navList.id = "type-nav";
    nav.appendChild(navList);
    app.appendChild(nav);

    const typeSum = document.createElement("section");
    typeSum.id = "type-sum";
    app.appendChild(typeSum);
}

function createTypeNav(types) {
    const nav = document.getElementById("type-nav");
    types.forEach((type) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#type-${type}`;
        a.innerText = type;
        li.appendChild(a);
        nav.appendChild(li);
    });
}

function createTypeSum(types) {
    const sumContainer = document.getElementById("type-sum");

    types.forEach((type) => {
        const typeContainer = document.createElement("div");
        typeContainer.id = `type-${type}`;
        typeContainer.className = "type-summary";

        const title = document.createElement("h2");
        title.innerText = `${type} (${getTypeCount(type)})`;
        typeContainer.appendChild(title);

        const stats = document.createElement("p");
        stats.innerText = `Total HP: ${getTotalStat(type, "HP")}, Total Attack: ${getTotalStat(type, "Attack")}`;
        typeContainer.appendChild(stats);

        const backToTop = document.createElement("a");
        backToTop.href = "#";
        backToTop.innerText = "Back to top";
        typeContainer.appendChild(backToTop);

        const typePokedexContainer = document.createElement("div");
        typePokedexContainer.className = "pokedex";
        typeContainer.appendChild(typePokedexContainer);

        pokedex
            .filter((pokemon) => pokemon.type.includes(type))
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((pokemon) => {
                const card = createPokemonCard(pokemon);
                typePokedexContainer.appendChild(card);
            });

        sumContainer.appendChild(typeContainer);
    });
}

function getTypeCount(type) {
    return pokedex.filter((pokemon) => pokemon.type.includes(type)).length;
}

function getTotalStat(type, stat) {
    return pokedex
        .filter((pokemon) => pokemon.type.includes(type))
        .reduce((sum, pokemon) => sum + pokemon.base[stat], 0);
}

function getUniqueTypes() {
    const types = new Set();
    pokedex.forEach((pokemon) => {
        pokemon.type.forEach((type) => {
            types.add(type);
        });
    });

    const typesArray = Array.from(types);
    return typesArray.sort();
}

function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "pokemon-card";

    const title = document.createElement("h2");
    title.innerText = `${pokemon.name}`; // Removed the ID number
    card.appendChild(title);

    const imageLink = document.createElement("a");
    imageLink.href = pokemon.url;
    imageLink.target = "_blank";
    card.appendChild(imageLink);

    const image = document.createElement("img");
    image.src = pokemon.sprite;
    imageLink.appendChild(image);

    const baseAttributes = pokemon.base;
    const column1 = document.createElement("div");
    const column2 = document.createElement("div");
    column1.className = "base-attributes-column";
    column2.className = "base-attributes-column";

    let count = 0;
    for (const attribute in baseAttributes) {
        const attributeElement = document.createElement("p");
        attributeElement.innerText = `${attribute}: ${baseAttributes[attribute]}`;

        if (count % 2 === 0) {
            column1.appendChild(attributeElement);
        } else {
            column2.appendChild(attributeElement);
        }

        count++;
    }

    card.appendChild(column1);
    card.appendChild(column2);

    return card;
}

createApp();
const uniqueTypes = getUniqueTypes();
createTypeNav(uniqueTypes);
createTypeSum(uniqueTypes);