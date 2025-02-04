const fetchData = async () => {
  let response = await fetch("./upcoming_compet.json", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
};

// date transform
function getFirstDate(dateRange) {
  const firstDatePart = dateRange.split(" - ")[0]; // Extraire la première partie avant '-'
  const date = new Date(`${firstDatePart}, ${new Date().getFullYear()}`); // Ajouter l'année actuelle

  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, "0"); // Récupérer le jour avec deux chiffres
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois (+1 car indexé à 0)
    return `${day}/${month}`;
  } else {
    return "--/--";
  }
}

const showCard = async () => {
  let cards = document.getElementById("cards");
  const data = await fetchData();
  if (!data) {
    cards.innerHTML = "not data available";
  } else {
    let output = ``;
    data.forEach((card) => {
      output += `
        <div class="card" id="card">
        <img class="img-card" src="${card.image}" alt="${card.titre}" />
        <div class="details-card">
          <h3 class="title-card">${card.titre}</h3>
          <div class="date-card">
            <span class="date-event-card">Date : ${getFirstDate(
              card.date
            )}</span>
          </div>
          <div class="location-card">
            <span class="city-card">Ville : ${card.ville}</span>
            <span class="country-card">Pays : ${card.pays}</span>
          </div>
          <a class="link-card" href="${
            card.lien
          }" target="_blank">Voir l'evenement</a>
        </div>
      </div>
        `;
    });
    cards.innerHTML = output;
  }
};

showCard();
