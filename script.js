let cards = document.getElementById("cards");

const fetchData = async () => {
  let response = await fetch("./upcoming_compet.json", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response);
  if (response.status === 200 && response.statusText === "OK") {
    //   console.log(await response.json());

    return await response.json();
  } else {
    return null;
  }
};

const showCard = async () => {
  const data = await fetchData();
  if (!data) {
    cards.innerHTML = "not data available";
  } else {
    let output = ``;
    data.forEach((card) => {
      output += `
        <div class="card" id="card">
        <img class="img-card" src="${card.Image}" alt="${card.Titre}" />
        <div class="details-card">
          <h3 class="title-card">${card.Titre}</h3>
          <div class="date-card">
            <span class="date-event-card">Date : ${card.Date}</span>
            <span class="date-left-card">Evenement dans : ${
              card.JoursRestes.includes("days")
                ? card.JoursRestes.split("days")[0].trim() + " jours"
                : card.JoursRestes.includes("Today")
                ? "Aujourd'hui"
                : card.JoursRestes
            }</span>
          </div>
          <div class="location-card">
            <span class="city-card">Ville : ${card.Ville}</span>
            <span class="country-card">Pays : ${card.Pays}</span>
          </div>
          <a class="link-card" href="${
            card.Lien
          }" target="_blank">Voir l'evenement</a>
        </div>
      </div>
        `;
    });
    cards.innerHTML = output;
  }
};

showCard();
