    async function getPhotographers() {
        const response = await fetch("./data/photographers.json");
        const result = await response.json();
        const photographers =  result.photographers;
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers;
    }

    // importer la fonction photographerTemplate du fichier photographer.js
    import photographerTemplate from "../templates/photographer.js";
 

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
    
    async function init() {
        // Récupère les datas des photographes
        const photographers =  await getPhotographers();
        displayData(photographers);
    }
    
    init();
