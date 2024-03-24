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
        <p class="tagline-header">${searchPhotographer.tagline}</p>`
    ;
    const photographHeader = document.querySelector(".presentation");
    const photographImage = 
        `<img src="${searchPhotographer.portrait}" alt="la photo de ${searchPhotographer.name}"/>`
    ;
    photographHeader.innerHTML += description;
    document.querySelector(".portraits").innerHTML+=photographImage;

    // récupérer les portrait du photographe
    const searchPhotos = result.media;
    const photos = searchPhotos.filter(item => item.photographerId === photographId);
    photos.forEach(function(photo){
        photo.liked = false;
    });

    import photographerMedia from "../templates/media.js";
    // Afficher les protrait du photographe 
    function displayWork (liste){
        const photographerWork = document.querySelector(".photographer-work");
        photographerWork.innerHTML=""
        for (let i=0; i<liste.length;i++){
            const workModel = photographerMedia(liste[i]);
            const workCard = workModel.createMediaElement();
            photographerWork.innerHTML+= workCard;
        }
        clickPhoto();
        manageLikes();
    }
    displayWork(photos);

    // Affichage de l'encart 
    // la somme des likes 
    function likesSum () {
        let nbrLikes = 0;
        let likes = document.querySelectorAll(".nbrLikes");
        likes.forEach(element => nbrLikes += parseInt(element.innerHTML));
        return nbrLikes;
    }
    // affichage du total des sommes
    function displaySum () {
        return `<div class="content" aria-label="prix par jour">
                    <p>${likesSum()}<i class="fa-solid fa-heart"></i></p>
                    <p>${searchPhotographer.price}€/jour</p>           
                </div>`
    }
    function afficheEncart () {
        document.querySelector(".sticker").innerHTML= displaySum();
    }
    afficheEncart();

    // affichage du LightBox
    function clickPhoto(){
        const photoClick = document.querySelectorAll(".hover-shadow");
        photoClick.forEach(event => event.addEventListener("click",function(){
            gererModalPhoto (event);
        }));
        photoClick.forEach(event => event.addEventListener("keypress",function(){
            gererModalPhoto (event);
        }));    
    }
    
    function gererModalPhoto (event){
        let indexPhoto = indexOfElement(photos,event.parentElement.querySelector(".title").innerHTML);
        openModalPhoto(indexPhoto);
        gererSwipe(indexPhoto);
        // fermer Modal
        document.querySelector(".close").addEventListener("click",closeLightBox );
        document.querySelector(".close").addEventListener("keypress",closeLightBox );
    }
    
    function openModalPhoto (indexPhoto){
        const modalPhoto = document.querySelector(".modal-photo");
        modalPhoto.style.display="flex";       
        // affichage du photo séléctionner dans un modal
        afficherModalPhoto(indexPhoto);
    }
    
    function gererSwipe (indexPhoto) {
        // image précédente
        const prev = document.querySelector(".prev");
        prev.addEventListener("click",function(){indexPhoto = previousSlide(indexPhoto);});
        prev.addEventListener("keypress",function(){indexPhoto = previousSlide(indexPhoto);});
        // image suivante
        const next = document.querySelector(".next");
        next.addEventListener("click",function(){indexPhoto = nextSlide(indexPhoto);});
        next.addEventListener("keypress",function(){indexPhoto = nextSlide(indexPhoto);});
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
                <source src="${photos[index].video}" type="video/mp4" alt="video de ${photos[index].title}"/>
            </video>`;
        }else{
            container.innerHTML=`<img src="${photos[index].image}" alt="photo de ${photos[index].title}"/>`;
        }
        container.innerHTML+=`<figcaption>${photos[index].title}</figcaption>`;
    }
    // fermer le lightbox
    function closeLightBox (){
        document.querySelector(".modal-photo").style.display="none";
    }

    // Trier les portraits 
    // navigation souris
    document.querySelector(".select-wrapper").addEventListener("click", function() {
        document.querySelector(".select").classList.toggle("open");
    });
    // navigation clavier
    document.querySelector(".select-wrapper").addEventListener("keypress", function() {
        this.querySelector(".select").classList.toggle("open");
    });

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener("click", function() {
            if (!this.classList.contains("selected")) {
                this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                this.classList.add("selected");
                this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
            }
            tri(option.innerText);
        });
    }
    //navigation clavier
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener("keypress", function() {
            if (!this.classList.contains("selected")) {
                this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                this.classList.add("selected");
                this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
            }
            tri(option.innerText);
        }); 
    }
    // trier les photos selon popularité, date ou titre
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
    function displayLikes (event) {
        let index = indexOfElement(photos,event.parentElement.parentElement.querySelector(".title").innerText); 
        if (photos[index].liked){
            photos[index].liked = false;
            photos[index].likes -= 1;
        }else{
            photos[index].liked = true;
            photos[index].likes += 1;
        }
    }

    function manageLikes () {
        const likes = document.querySelectorAll(".heart");
        likes.forEach(event=> event.addEventListener("click",function(){
            displayLikes(event);
            displayWork(photos);
            afficheEncart();
        }));  
        likes.forEach(event=> event.addEventListener("keypress",function(){
            displayLikes(event);
            displayWork(photos)
            afficheEncart();
        })); 
    }

   