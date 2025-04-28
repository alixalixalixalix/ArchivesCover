const fetchData = async () => {
  try {
    const responseCovers = await fetch("data.json");
    const dataCovers = await responseCovers.json();

    const responseTags = await fetch("data-tags.json");
    const dataTags = await responseTags.json();

    function generatorCovers(dataCovers) {
      const containerCover = document.querySelector("#containerCover");
      containerCover.innerHTML = "";

      newDataCovers = dataCovers.slice(0);
      function randomTirage(tab) {
        const randomIndex = Math.floor(Math.random() * tab.length);
        return tab.splice(randomIndex, 1)[0];
      }

      for (let i = 0; i < dataCovers.length; i++) {
        const tirage = randomTirage(newDataCovers);
        const div = document.createElement("div");
        div.classList.add("cardCover");
        div.classList.add("grid3");
        const img = document.createElement("img");
        const divTitre = document.createElement("div");
        const titre = document.createElement("h2");
        const auteur = document.createElement("p");
        const divDateTag = document.createElement("div");
        const date = document.createElement("p");
        const graphiste = document.createElement("a");

        containerCover.appendChild(div);
        div.appendChild(img);
        div.appendChild(divTitre);
        divTitre.appendChild(titre);
        divTitre.appendChild(auteur);
        div.appendChild(divDateTag);
        divDateTag.appendChild(date);
        div.appendChild(graphiste);

        img.src = tirage.cover;
        auteur.innerText = tirage.auteur;
        titre.innerText = tirage.titre;
        date.innerText = tirage.date;
        if (tirage.lienGraphiste === "") {
          graphiste.innerHTML = "p";
        } else {
          graphiste.href = tirage.lienGraphiste;
          graphiste.target = "_blank";
        }
        if (tirage.graphiste === "") {
          graphiste.innerText = "";
        } else {
          graphiste.innerText = "→ " + tirage.graphiste;
        }

        // Affichage des tags dans les cards
        tirage.tags.map((lesTags) => {
          const tags = document.createElement("button");
          divDateTag.appendChild(tags);
          tags.innerText = lesTags;
        });
      }
    }

    // Affichage des boutton Tags
    for (i = 0; i < dataTags.length; i++) {
      const containerButton = document.querySelector("#containerButton");
      const boutonTag = document.createElement("button");
      boutonTag.classList.add("bouton");
      containerButton.appendChild(boutonTag);
      boutonTag.innerText = dataTags[i].tag;
    }

    // Tri tag fonctionnel
    let allButtonsFilters = document.querySelectorAll(
      "#containerButton button"
    );
    let buttonAll = document.getElementById("all").innerText;
    for (let i = 0; i < allButtonsFilters.length; i++) {
      allButtonsFilters[i].addEventListener("click", function () {
        document.querySelector(".tagActif").classList.remove("tagActif"); //suppr la class active
        allButtonsFilters[i].classList.add("tagActif"); //ajoute la class sur élément cliqué
        let filtreAction = dataCovers.filter(function (covers) {
          if (allButtonsFilters[i].innerText === buttonAll) {
            return covers.tags;
          } else {
            return covers.tags.includes(allButtonsFilters[i].innerText);
          }
        });
        generatorCovers(filtreAction);
        applyGridToCovers();
      });
    }

    let currentGridClass = "grid5";
    let allButtonsGrid = document.querySelectorAll("#containerGrid button");
    let gridClasses = ["grid2", "grid3", "grid4", "grid5"];
    
    allButtonsGrid.forEach((button, index) => {
      button.addEventListener("click", function () {
        const actifButton = document.querySelector(".gridActif");
        if (actifButton) {
          actifButton.classList.remove("gridActif"); // supprime l'ancien actif
        }
        button.classList.add("gridActif"); // ajoute la classe sur l'élément cliqué
    
        currentGridClass = gridClasses[index]; // met à jour la grille active
        applyGridToCovers();
      });
    });
    
    // Fonction pour appliquer la classe de grille actuelle
    function applyGridToCovers() {
      let cardCover = document.querySelectorAll("#containerCover > div");
      cardCover.forEach(div => {
        // On retire les anciennes classes
        gridClasses.forEach(cls => div.classList.remove(cls));
        // On ajoute la classe actuelle
        div.classList.add(currentGridClass);
      });
    }
    
    /*
    // Tri date fonctionnel sans random
    const boutonDate = document.getElementById("date");
    boutonDate.addEventListener("click", function () {
      dataCovers.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse()); // Convertir "dd/mm/yyyy" en "yyyymmdd"
        const dateB = new Date(b.date.split("/").reverse());
        return dateA - dateB;
      });
      generatorCovers(dataCovers);
    });
*/
    generatorCovers(dataCovers);
    applyGridToCovers();

  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

fetchData();

/* fetch("data.json") // Chemin vers le fichier JSON
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json(); // Conversion en objet JavaScript
  })
  .then((data) => {
    for (i = 0; i < data.length; i++) {
      const containerCover = document.querySelector("#containerCover");
      const div = document.createElement("div");
      div.classList.add("cardCover");
      const img = document.createElement("img");
      const auteur = document.createElement("h2");
      const titre = document.createElement("p");

      containerCover.appendChild(div);
      div.appendChild(img);
      div.appendChild(auteur);
      div.appendChild(titre);

      img.src = data[i].cover;
      auteur.innerText = data[i].auteur;
      titre.innerText = data[i].titre;

      data[i].tags.map((lesTags) => {
        const tags = document.createElement("button");
        div.appendChild(tags);
        tags.innerText = lesTags;
      });

      // console.log(data[1].tags.includes("montage"));
    }
  });

fetch("data-tags.json") // Chemin vers le fichier JSON
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json(); // Conversion en objet JavaScript
  })
  .then((dataTags) => {
    for (i = 0; i < dataTags.length; i++) {
      const containerButton = document.querySelector("#containerButton");
      const boutonTag = document.createElement("button");
      containerButton.appendChild(boutonTag);
      boutonTag.innerText = dataTags[i].tag;
    }

    let allButtonsFilters = document.querySelectorAll(
      "#containerButton button"
    );
    console.log(allButtonsFilters);
    for (let i = 0; i < allButtonsFilters.length; i++) {
      allButtonsFilters[i].addEventListener("click", function () {
        // filter
        // document.getElementById("gallery").innerHTML = "";
        // galleryGenerator(filtreAction);
      });
    }
  });

// bouton de filtres date
// enlever le random au clic sur filtre ? 

*/
