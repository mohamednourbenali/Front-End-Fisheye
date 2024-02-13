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

    // récupérer les portrait du photographe
    const searchPhotos = result.media;
    const photos = searchPhotos.filter(item => item.photographerId === photographId);

    // Afficher les protrait du photographe
    function displayWork (liste){
        const photographerWork = document.querySelector(".photographer-work");
        photographerWork.innerHTML="";
        for (let i=0; i<liste.length;i++){
            if(liste[i].image==undefined){
                photographerWork.innerHTML+=`
                <div class="portrait">
                    <video controls style="width : 100%"; height:100%;">
                        <source src="${liste[i].video}" type="video/mp4">
                    </video>
                    <div class="description-likes">
                        <p class="title">${liste[i].title}</p>
                        <div class="like">
                            <p>${liste[i].likes}</p>
                            <i class="fa-solid fa-heart"></i>
                        </div>
                    </div>
                </div>`;
            }else{
                photographerWork.innerHTML+=`
                <div class="portrait">
                    <img src="${liste[i].image}" class="hover-shadow">
                    <div class="description-likes">
                        <p class="title">${liste[i].title}</p>
                        <div class="like">
                            <p>${liste[i].likes}</p>
                            <i class="fa-solid fa-heart"></i>
                        </div>
                    </div>
                </div>`;
            }
        }
    }
    displayWork(photos);