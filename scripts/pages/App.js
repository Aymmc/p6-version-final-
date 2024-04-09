// Définition de la classe App
class App {
    constructor(media) {
        // Sélection des éléments DOM nécessaires
        this.$photographersWrapper = document.querySelector('.photographer_section');
        this.photographersApi = new photographerApi('../data/photographers.json'); // Instanciation de l'API des photographes
        this.getMedia = document.querySelector('.divgalerie'); // Sélection de la section de la galerie
        this.getHeader = document.querySelector('.photograph-header'); // Sélection de l'en-tête du photographe
        this.Main = document.querySelector('main'); // Sélection de la zone pour afficher le compteur de likes
        this.body = document.querySelector('body');
        this.media = media; // Stockage des médias
    }
    // Fonction asynchrone pour récupérer les photographes
    async fetchPhotographers() {
        return await this.photographersApi.getPhotographers();
    }
    // Fonction asynchrone pour récupérer les médias
    async fetchMedias() {
        return await this.photographersApi.getMedias();
    }
    // Fonction pour gérer les événements de clic sur les images
    urlImages(mediaItem, mediaList) {
        let mediaIndex = mediaList.findIndex(media => media === mediaItem); // Index du média dans la liste
        let elements = document.querySelectorAll(".imagegalerie img, .videogalerie video"); // Sélection de toutes les images et vidéos de la galerie
        
        elements.forEach((element) => {
            element.addEventListener("click", (e) => {
                e.preventDefault(); // Empêcher le comportement par défaut du clic
                if (!element.classList.contains("clicked")) { // Vérifier si l'élément n'a pas déjà été cliqué
                    let url = element.tagName === 'IMG' ? e.target.src : e.target.currentSrc; // URL de l'élément cliqué
                    this.body.setAttribute('tabindex', '-1')
                    this.Main.setAttribute('tabindex', '-1')

                    let media = mediaItem; // Média associé à l'élément
                    this.lightbox = new Lightbox(this.photographersApi, media, url, mediaIndex, mediaList); // Instanciation de la Lightbox
                    this.lightbox.render(); // Affichage de la Lightbox
                    element.classList.add("clicked"); // Ajout d'une classe pour indiquer que l'élément a été cliqué
                }
            });
        });
    }

    
        // Fonction pour enregistrer le nombre initial de likes
    updateTotalLikes() {
        const Template = new photographerCard();
        this.Main.appendChild(Template.getCompteurLike());
        const likeElements = document.querySelectorAll(".nombrelike"); // Sélectionne tous les éléments affichant les likes
        // let totalLikes = 0;
            let totalLikes = null;
        likeElements.forEach(likeElement => {
            totalLikes += parseInt(likeElement.textContent); // Additionne le nombre de likes de chaque élément
        });
        this.totalLikes = totalLikes; // Met à jour le total des likes dans l'instance de la classe App
        // Affichez le total des likes dans la console
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
                    this.updateTotalLikes(); // Met à jour le total des likes à chaque clic de like  
                    like.classList.add("clicked"); // Ajout d'une classe pour indiquer que le like a été cliqué
                    this.updateTotalLikes(); // Met à jour le total des likes à chaque clic de like  
                }   
            });
        });
    }
    // Fonction pour afficher la modal de contact
    displayModal() {
        const contactButton = document.querySelector(".contact_button"); // Sélection du bouton de contact  
        // Vérifier si le bouton de contact existe avant d'ajouter un gestionnaire d'événements
        if (contactButton) {
            contactButton.addEventListener("click", () => {
                // Création d'une instance de la classe Modal
                const modal = new Modal();
                // Rendre la fenêtre modale
                modal.render();
                const close = document.querySelector('.fermermodale')
                // Afficher la fenêtre modale
                modal.$wrapper.style.display = "block";
                this.Main.classList.add('none')
                // Empêcher le défilement de la page derrière la fenêtre modale
                modal.body.classList.add('no-scroll');
                close.focus()

            });
        } else {
            console.log("Le bouton de contact n'a pas été trouvé.");
        }
    }
    // Fonction pour afficher le compteur de likes
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
        // Calculer le total des likes uniquement pour les médias affichés

        //-------------------------------------------- INDEX --------------------------------------------------------
        if (window.location.pathname === '/') {
            // Création des cartes pour chaque photographe et ajout au DOM
            photographers.forEach((photographer) => {
                const Template2 = new photographerCard(photographer);
                this.$photographersWrapper.appendChild(Template2.getUserCardDOM());
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
                let price = 0
                let name = null 
                name = photographer.name
                this.name = name
                price = photographer.price
                this.totalLikes = elementsWithId.reduce((acc, curr) => acc + curr.likes, 0);
                this.price = price
            } else {
                console.log("Aucun photographe trouvé avec l'ID spécifié.");
            }
        }
        // ------------------------------------Media-------------------------------
        // Si des médias sont associés à l'ID
        if (elementsWithId.length > 0) {
            // Création des cartes médias pour chaque média et ajout au DOM
            elementsWithId.forEach(mediaItem => {
                const photographer = photographers.find(p => p.id === mediaItem.photographerId);
                const template = new photographerCard(photographer, mediaItem, photographer.name);
                this.getMedia.appendChild(template.getUserCardMedia());
                this.urlImages(mediaItem, elementsWithId); // Passer mediaItem à urlImages
                // console.log(elementsWithId)
            });
   

        } else {
            console.log("Aucun média trouvé pour l'ID spécifié.");
        }
        this.SorterForm = new SorterForm(photographers, media, app); // Instanciation du formulaire de tri
        this.SorterForm.render(); // Affichage du formulaire de tri 
        this.updateTotalLikes()
        this.attachCoeurEventListeners()
        this.displayModal(); // Afficher la modal de contact
        
    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();


