    //Mettre le code JavaScript lié à la page photographer.html

    // Récuperer l'ID d'un photographe séléctionnées
    function getPhotographerId(){
        const queryString = window.location.search;
        const urlParam = new URLSearchParams(queryString);
        return urlParam.get("photographeId");
    }
    const photographId = parseInt(getPhotographerId());
    // Récupérer les données
    const response = await fetch("./data/photographers.json");
    const result = await response.json();
    const photographers =  result.photographers;
    const searchPhotographer = photographers.find(item => item.id === photographId);

    // Afficher la description du photographe
    const description = 
        `<h1>${searchPhotographer.name}</h1>
        <p class="city">${searchPhotographer.city}, ${searchPhotographer.country}</p>
        <p>${searchPhotographer.tagline}</p>`
    ;
    const photographHeader = document.querySelector(".presentation");
    const photographImage = 
        `<img src="${searchPhotographer.portrait}" />`
    ;
    photographHeader.innerHTML += description;
    document.querySelector(".portraits").innerHTML+=photographImage;

