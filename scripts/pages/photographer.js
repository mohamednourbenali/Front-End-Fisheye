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
                    <video controls>
                        <source src="${liste[i].video}" class="hover-shadow" type="video/mp4">
                    </video>
                    <div class="description-likes">
                        <p class="title">${liste[i].title}</p>
                        <div class="like">
                            <p class="nbrLikes">${liste[i].likes}</p>
                            <div class="heart">
                                <i class="fa-regular fa-heart dislike"></i>
                            </div>
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
                            <p class="nbrLikes">${liste[i].likes}</p>
                            <div class="heart">
                                <i class="fa-regular fa-heart dislike"></i>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
        clickPhoto();
        manageLikes();
    }
    displayWork(photos);

    // Affichage de l'encart 
    let nbrlikes = 0;
    for (let i=0;i<photos.length;i++){
        nbrlikes += parseInt(photos[i].likes)
    }
    let sticker = document.querySelector(".sticker");
    sticker.innerHTML+="";
    sticker.innerHTML+= `<div class="content">
                            <p>${nbrlikes}<i class="fa-solid fa-heart"></i></p>
                            <p>${searchPhotographer.price}€/jour</p>           
                        </div>`
    ;

    // affichage du LightBox
    function clickPhoto (){
        const photoClick = document.querySelectorAll(".hover-shadow");
        photoClick.forEach(event => event.addEventListener("click",function(){
            const modalPhoto = document.querySelector(".modal-photo");
            modalPhoto.style.display="flex";
            let indexPhoto = indexOfElement(photos,event.parentElement.querySelector(".title").innerHTML);
            afficherModalPhoto(indexPhoto);
            const prev = document.querySelector(".prev");
            prev.addEventListener("click",function(){indexPhoto = previousSlide(indexPhoto);});
            const next = document.querySelector(".next");
            next.addEventListener("click",function(){indexPhoto = nextSlide(indexPhoto);});
            document.querySelector(".close").addEventListener("click",closeLightBox );
        }));
    }
    // photo précédente 
    function previousSlide (index){
        if((index-1)<0){
            index = photos.length-1; 
        }else{
            index--;
        }
        afficherModalPhoto(index);
        return index;
    }
    // photo sivante 
    function nextSlide (index){
        if((index+1)>=photos.length){
            index=0;
        }else{
            index++;
        }
        afficherModalPhoto(index);
        return index;
    }
    // trouver l'indice d'un élément dans une liste 
    function indexOfElement (liste,element){
        let index = 0;
        while((index<liste.length)&&(liste[index].title!==element)){
            index++;
        }
        return index;
    }

    // afficher le lightbox d'une image passer en paramétres
    function afficherModalPhoto (index){
        const container = document.querySelector(".container");
        if((photos[index].image)==undefined){
            container.innerHTML=`
            <video controls>
                <source src="${photos[index].video}" type="video/mp4" />
            </video>`;
        }else{
            container.innerHTML=`<img src="${photos[index].image}"/>`;
        }
        container.innerHTML+=`<p>${photos[index].title}</p>`;
    }
    // fermer le lightbox
    function closeLightBox (){
        document.querySelector(".modal-photo").style.display="none";
    }

    // Trier les portraits 
    document.querySelector('.select-wrapper').addEventListener('click', function() {
        this.querySelector('.select').classList.toggle('open');
    })
    
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
            }
            tri(option.innerText);
        });
    }

    // trier les photos selon
    function tri (chaine){
        let liste = photos;
        switch(chaine){
            case "Popularité" :{
                displayWork(trierPopulaire(liste));
                clickPhoto();
                break;
            }case "Date" : {
                displayWork(triDate(liste));
                clickPhoto();
                break;
            }case "Titre" : {
                displayWork(triTitre(liste));
                clickPhoto();
                break;
            }    
        }
    }

    // trier une liste selon la popularité
    function trierPopulaire (liste) {
        return liste.sort(function(a,b){
            return a.likes-b.likes;
        });
    }

    // trier une liste selon le titre
    function triTitre (liste) {
        return liste.sort (function(a,b){
            return comapreByTitle(a,b);
        });
    }

    // trier une liste selon la date
    function triDate (liste) {
        return liste.sort(function(a,b){
            return comapreByDate(a,b);
        });
    }
    
    // comparer deux chaine 
    function comapreByTitle (a,b) {
        const titreA = a.title.toUpperCase();
        const titreB = b.title.toUpperCase();
        if (titreA < titreB) { return -1}
        if (titreA > titreB) { return 1}
        return 0;
    }
    
    // comparer seux dates 
    function comapreByDate (a,b) {
        if (a.date < b.date) { return -1}
        if (a.date > b.date) { return 1}
        return 0;
    }

    // gerer les likes

    function manageLikes(){
        const likes = document.querySelectorAll(".heart");
        likes.forEach(event=> event.addEventListener("click",function(){
            console.log(event.parentElement.innerHTML);
            const nbrLikes = parseInt(event.parentElement.querySelector(".nbrLikes").innerText);
            let index = indexOfElement(photos,event.parentElement.parentElement.querySelector(".title").innerText);
            if(nbrLikes==photos[index].likes){
                event.innerHTML=`<i class="fa-solid fa-heart"></i>`;
                event.parentElement.querySelector(".nbrLikes").innerText=`${nbrLikes+1}`;
            }else{
                event.innerHTML=`<i class="fa-regular fa-heart"></i>`;
                event.parentElement.querySelector(".nbrLikes").innerText=`${nbrLikes-1}`;
            }
        }));
    }