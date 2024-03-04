// Définition de la classe App
class App {
    constructor(media) {
        // Sélection des éléments DOM nécessaires
        this.$photographersWrapper = document.querySelector('.photographer_section');
        this.photographersApi = new photographerApi('../data/photographers.json');
        this.getMedia = document.querySelector('.divgalerie');
        this.getHeader = document.querySelector('.photograph-header');
        this.GetCompteurLike = document.querySelector('main')
        this.media = media
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
    urlImages(mediaItem, mediaList) {
        let images = document.querySelectorAll(".imagegalerie img");
        let mediaIndex = mediaList.findIndex(media => media === mediaItem);
    
        images.forEach((img) => {
            img.addEventListener("click", (e) => {
                e.preventDefault();
                if (!img.classList.contains("clicked")) {
                    console.log("Valeur de media avant de créer une instance de Lightbox :", mediaItem); 
                    console.log(e.target.src);
                    let url = e.target.src; 
                    let media = mediaItem; 
                    console.log(mediaList); // Vérifiez le contenu de mediaList ici
                    this.lightbox = new Lightbox(this.photographer, media, url, mediaIndex, mediaList);
                    this.lightbox.render();
                    console.log(media);
                    img.classList.add("clicked");
                }
            });
        });
    }
    
    

    
    
    attachCoeurEventListeners() {
        let likes = document.querySelectorAll(".coeur");
        likes.forEach((like) => {
            like.addEventListener("click", (e) => {
                if (!like.classList.contains("clicked")) { // Vérifie si le like n'a pas déjà été cliqué
                    const likeNumber = e.target.previousElementSibling;
                    let likeNumberValue = parseInt(likeNumber.textContent.trim().replace(/['"]+/g, ''));
                    let newLikeValue = likeNumberValue + 1;
                    likeNumber.textContent = newLikeValue;
                    like.classList.add("clicked"); // Ajoute une classe pour indiquer que le like a été cliqué
                }
            });
        });
    }
    displayModal() {
        const button = document.querySelector(".contact_button");
        button.addEventListener("click", (e) => {
            if (!button.classList.contains("clicked")) { // Vérifie si le like n'a pas déjà été cliqué
                this.Modal = new Modal();
                this.Modal.render()
                button.classList.add("clicked"); // Ajoute une classe pour indiquer que le like a été cliqué
            }
        });
    };
    CompteurLike(photographer, mediaItem) {
        const CompteurLike = new photographerCard(photographer, mediaItem);
        this.GetCompteurLike.appendChild(CompteurLike.GetCompteurLike());
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
            this.attachCoeurEventListeners();
            
            this.displayModal();
            this.CompteurLike();
        } else {
            console.log("Aucun média trouvé pour l'ID spécifié.");
        }
        this.SorterForm = new SorterForm(photographers, media);
        this.SorterForm.render()
    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();
