// Définition de la classe App
class App {
    constructor(media) {
        // Sélection des éléments DOM nécessaires
        this.$photographersWrapper = document.querySelector('.photographer_section');
        this.photographersApi = new photographerApi('../data/photographers.json'); // Instanciation de l'API des photographes
        this.getMedia = document.querySelector('.divgalerie'); // Sélection de la section de la galerie
        this.getHeader = document.querySelector('.photograph-header'); // Sélection de l'en-tête du photographe
        this.GetCompteurLike = document.querySelector('main'); // Sélection de la zone pour afficher le compteur de likes
        this.media = media; // Stockage des médias
        // this.init= init()
    }
    
    // Fonction asynchrone pour récupérer les photographes
    async fetchPhotographers() {
        return await this.photographersApi.getPhotographers();
    }
    
    // Fonction asynchrone pour récupérer les médias
    async fetchMedias() {
        return await this.photographersApi.getMedias();
    }
    
    // Fonction asynchrone pour récupérer l'en-tête
    async fetchHeader() {
        return await this.photographersApi.getHeader();
    }
    
    // Fonction pour gérer les événements de clic sur les images
    urlImages(mediaItem, mediaList) {
        let images = document.querySelectorAll(".imagegalerie img"); // Sélection de toutes les images de la galerie
        let mediaIndex = mediaList.findIndex(media => media === mediaItem); // Index du média dans la liste
        
        // Parcourir toutes les images et ajouter un gestionnaire d'événements de clic
        images.forEach((img) => {
            img.addEventListener("click", (e) => {
                e.preventDefault(); // Empêcher le comportement par défaut du clic
                if (!img.classList.contains("clicked")) { // Vérifier si l'image n'a pas déjà été cliquée
                    let url = e.target.src; // URL de l'image cliquée
                    let media = mediaItem; // Média associé à l'image
                    this.lightbox = new Lightbox(this.photographer, media, url, mediaIndex, mediaList); // Instanciation de la Lightbox
                    this.lightbox.render(); // Affichage de la Lightbox
                    img.classList.add("clicked"); // Ajout d'une classe pour indiquer que l'image a été cliquée
                }
            });
        });
    }
    
    // Fonction pour attacher les gestionnaires d'événements de clic sur le bouton de like
    attachCoeurEventListeners() {
        let likes = document.querySelectorAll(".coeur"); // Sélection de tous les boutons de like
        likes.forEach((like) => {
            like.addEventListener("click", (e) => {
                if (!like.classList.contains("clicked")) { // Vérifier si le like n'a pas déjà été cliqué
                    const likeNumber = e.target.previousElementSibling; // Sélection du compteur de likes
                    let likeNumberValue = parseInt(likeNumber.textContent.trim().replace(/['"]+/g, '')); // Récupération de la valeur actuelle des likes
                    let newLikeValue = likeNumberValue + 1; // Incrémentation du nombre de likes
                    likeNumber.textContent = newLikeValue; // Mise à jour de l'affichage du nombre de likes
                    like.classList.add("clicked"); // Ajout d'une classe pour indiquer que le like a été cliqué
                }
            });
        });
    }
    
    // Fonction pour afficher la modal de contact
    displayModal() {
        const button = document.querySelector(".contact_button"); // Sélection du bouton de contact
        button.addEventListener("click", (e) => {
            if (!button.classList.contains("clicked")) { // Vérifier si la modal n'a pas déjà été ouverte
                this.Modal = new Modal(); // Instanciation de la modal de contact
                this.Modal.render(); // Affichage de la modal
                button.classList.add("clicked"); // Ajout d'une classe pour indiquer que la modal a été ouverte
            }
        });
    };
    
    // Fonction pour afficher le compteur de likes
    CompteurLike(photographer, mediaItem) {
        const CompteurLike = new photographerCard(photographer, mediaItem); // Instanciation du compteur de likes
        this.GetCompteurLike.appendChild(CompteurLike.GetCompteurLike()); // Ajout du compteur de likes au DOM
    }
    
    // Fonction principale asynchrone
    async main() {
        // Récupération des médias
        const media = await this.fetchMedias();
        // Récupération de l'ID depuis les paramètres d'URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        // Récupération des photographes
        const photographers = await this.fetchPhotographers();
        // Filtrage des médias par ID
        const elementsWithId = media.filter(mediaItem => mediaItem.photographerId === parseInt(id));
        
        //-------------------------------------------- INDEX --------------------------------------------------------
        if (window.location.pathname === '/') {
            // Création des cartes pour chaque photographe et ajout au DOM
            photographers.forEach((photographer) => {
                const Template = new photographerCard(photographer);
                this.$photographersWrapper.appendChild(Template.getUserCardDOM());
            });
        }
        
        // ------------------------------------Photographer------------------------------------------------------
        // ------------------------------------Header-------------------------------
        // Si un ID est présent dans l'URL
        if (id) {
            // Recherche du photographe correspondant à l'ID
            const photographer = photographers.find((p) => p.id == id);
            if (photographer) {
                // Création de l'en-tête du photographe et ajout au DOM
                const Header = new photographerCard(photographer);
                this.getHeader.appendChild(Header.getHeader());
            } else {
                console.log("Aucun photographe trouvé avec l'ID spécifié.");
            }
        }
        
        // ------------------------------------Media-------------------------------
        // Si des médias sont associés à l'ID
        if (elementsWithId.length > 0) {
            console.log(elementsWithId);
            // Création des cartes médias pour chaque média et ajout au DOM
            elementsWithId.forEach(mediaItem => {
                const photographer = photographers.find(p => p.id === mediaItem.photographerId);
                const template = new photographerCard(photographer, mediaItem, photographer.name);
                this.getMedia.appendChild(template.getUserCardMedia());
                this.urlImages(mediaItem, elementsWithId); // Passer mediaItem à urlImages
            });
            this.attachCoeurEventListeners(); // Attacher les gestionnaires d'événements pour les likes
            this.displayModal(); // Afficher la modal de contact
   
        } else {
            console.log("Aucun média trouvé pour l'ID spécifié.");
        }
        
        this.SorterForm = new SorterForm(photographers, media); // Instanciation du formulaire de tri
        this.SorterForm.render(); // Affichage du formulaire de tri
    }
    
}

// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();
