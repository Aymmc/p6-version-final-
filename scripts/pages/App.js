// Définition de la classe App
class App {
    constructor() {
        // Sélection des éléments DOM nécessaires
        this.$photographersWrapper = document.querySelector('.photographer_section');
        this.photographersApi = new photographerApi('../data/photographers.json');
        this.getMedia = document.querySelector('.divgalerie');
        this.getHeader = document.querySelector('.photograph-header');
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
            });
        } else {
            console.log("Aucun média trouvé pour l'ID spécifié.");
        }
    }
}

// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();
