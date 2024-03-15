// fonction pour ouvrir le formulaire
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

// fonction pour fermer le formulaire
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


const formulaire = document.querySelector(".contact_button");
formulaire.addEventListener("click",function(){
    displayModal();
})

const btnFermer = document.getElementById("btn-fermer");
btnFermer.addEventListener("click",function(){
    closeModal();
});

btnFermer.addEventListener("keypress",function(){
    closeModal();
});

// affichage du message récupérer depuis le formulaire 
function gererFormulaire () {
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log( `Nom : ${prenom} ${nom}, mail : ${email}, message : ${message}`);
}

const submit = document.querySelector(".envoyer");
submit.addEventListener("click",function(event){
    event.preventDefault();
    gererFormulaire();
    closeModal();
});