// Définit une classe nommée Lightbox
class Lightbox {
    // Constructeur de la classe Lightbox avec des paramètres
    constructor(photographer, media, url, mediaIndex, mediaList) {
        // Initialise les propriétés de la classe avec les valeurs passées en paramètres
        this.photographer = photographer; // Photographe
        this.media = media; // Média (image ou vidéo)
        this.url = url; // URL du média
        this.mediaIndex = mediaIndex; // Indice de l'image actuellement affichée
        this.mediaList = mediaList; // Liste des médias
        this.$wrapper = document.createElement('div'); // Crée un élément div pour la boîte de lumière
        this.$wrapper.classList.add('lightbox'); // Ajoute une classe 'lightbox' à l'élément div
        this.$wrapper.setAttribute('tabindex', '50'); // Définit un attribut tabindex sur l'élément div
        this.$filterFormWrapper = document.querySelector('body'); // Sélectionne l'élément body pour y attacher la boîte de lumière
        this.main = document.querySelector('main') // Sélectionne l'élément main
        this.main.style.display = "none"; // Cache l'élément main
        document.querySelector('main').classList.remove('block')
    }

    // Méthode pour fermer la boîte de lumière
    closeModal() {
        // Sélectionne tous les éléments avec la classe 'imggalerie'
        const removes = document.querySelectorAll('.imggalerie');
        // Sélectionne tous les éléments vidéo à l'intérieur des éléments avec la classe 'videogalerie'
        const removesvideos = document.querySelectorAll('.videogalerie video');
        // Parcourt tous les éléments vidéos sélectionnés
        removesvideos.forEach(removesvideo => {
            // Supprime la classe 'clicked' de chaque élément vidéo
            removesvideo.classList.remove('clicked');
            // Rétablit le tabindex des éléments dans la page principale
            this.$filterFormWrapper.setAttribute('tabindex', '0');
            this.main.setAttribute('tabindex', '0');
            // Affiche à nouveau l'élément main
            this.main.style.display = "block";
        });
        // Parcourt tous les éléments avec la classe 'imggalerie'
        removes.forEach(remove => {
            // Supprime la classe 'clicked' de chaque élément img
            remove.classList.remove('clicked');
            // Rétablit le tabindex des éléments dans la page principale
            this.$filterFormWrapper.setAttribute('tabindex', '0');
            this.main.setAttribute('tabindex', '0');
        });

        // Supprime la boîte de lumière de l'élément parent
        this.$filterFormWrapper.removeChild(this.$wrapper);
    }

    // Méthode pour définir l'URL du média
    setUrl(url) {
        this.url = url;
    }

    // Méthode pour définir le média
    setMedia(media) {
        this.media = media;
    }

    // Méthode pour définir l'indice du média
    setMediaIndex(index) {
        this.mediaIndex = index;
    }

    // Méthode pour rendre la boîte de lumière
    render() {
        // Définit le contenu du média en fonction de son type (image ou vidéo)
        let mediaContent;
        if (this.media.video) {
            // Si c'est une vidéo
            mediaContent = `
                <video controls>
                    <source src="${this.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            // Si c'est une image
            mediaContent = `
                <img src="${this.url}">
            `;
        }

        // Construit la structure HTML de la boîte de lumière avec le contenu du média
        const lightbox = `
            <div tabindex=50  class="divcontainer">
                <button tabindex=51 class="lightbox__close">Fermer</button>
                <button tabindex=52 class="lightbox__prev">Précédent</button>
                <button tabindex=53 class="lightbox__next">Suivant</button>
                <div tabindex=54 class="lightbox__container">
                    ${mediaContent}
                </div>
                <div tabindex=55 class="lightbox__name">
                    <h4>${this.media.title}</h4>
                </div>
            </div>
        `;

        // Ajoute le contenu HTML de la boîte de lumière à l'élément wrapper
        this.$wrapper.innerHTML = lightbox;
        // Attache la boîte de lumière à l'élément body
        this.$filterFormWrapper.appendChild(this.$wrapper);
        
        // Ajoute des écouteurs d'événements pour les boutons de fermeture, précédent et suivant
        this.$wrapper.querySelector(".lightbox__close").addEventListener("click", (e) => {
            e.preventDefault();
            this.closeModal();
        });
        this.$wrapper.querySelector(".lightbox__prev").addEventListener("click", (e) => {
            e.preventDefault();
            this.showPreviousMedia();
        });
        this.$wrapper.querySelector(".lightbox__next").addEventListener("click", (e) => {
            e.preventDefault();
            this.showNextMedia();
        });
    }

    // Méthode pour afficher le média précédent
    showPreviousMedia() {
        if (this.mediaIndex > 0) {
            this.mediaIndex--;
            this.updateMedia();
        }
    }

    // Méthode pour afficher le média suivant
    showNextMedia() {
        if (this.mediaList && this.mediaIndex < this.mediaList.length - 1) {
            this.mediaIndex++;
            this.updateMedia();
        }
    }

    // Méthode pour mettre à jour le média affiché
    updateMedia() {
        this.media = this.mediaList[this.mediaIndex];
        // Vérifie si le média est une vidéo
        if (this.media.video) {
            // Construit l'URL de la vidéo en utilisant le nom de fichier spécifié dans le média
            const urlParts = this.url.split("/"); // Décompose l'URL en parties séparées par "/"
            const parentPath = urlParts.slice(0, -1).join("/"); // Récupère toutes les parties de l'URL sauf la dernière (le nom du fichier)
            this.url = `${parentPath}/${this.media.video}`; // Construit la nouvelle URL en utilisant le nom de la vidéo
        } else {
            // Si ce n'est pas une vidéo, c'est une image
            const urlParts = this.url.split("/"); // Décompose l'URL en parties séparées par "/"
            const parentPath = urlParts.slice(0, -1).join("/"); // Récupère toutes les parties de l'URL sauf la dernière (le nom du fichier)
            this.url = `${parentPath}/${this.media.image}`; // Construit la nouvelle URL en utilisant le nom de l'image
        }
        // Re-render la boîte de lumière avec le nouveau média
        this.render();
    }
}
