class Lightbox {
    constructor(photographer, media, url, mediaIndex, mediaList) {
        this.photographer = photographer;
        this.media = media;
        this.url = url;
        this.mediaIndex = mediaIndex; // Indice de l'image actuellement affichée
        this.mediaList = mediaList; // Liste des médias
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('lightbox');
        this.$filterFormWrapper = document.querySelector('body');
    }
    closeModal(){
        this.$filterFormWrapper.removeChild(this.$wrapper);
    }
    setUrl(url) {
        this.url = url;
    }
    setMedia(media) {
        this.media = media;
    }
    setMediaIndex(index) {
        this.mediaIndex = index;
    }
    render() {
        const lightbox =
            `
            <div class="divcontainer">
               <button class="lightbox__close">Fermer</button>
               <button class="lightbox__prev">Précédent</button>
               <button class="lightbox__next">Suivant</button>
               <div class="lightbox__container">
                   <img src="${this.url}">
               </div>
               <div class="lightbox__name">
                 <h4>  ${this.media.title} </h4>
               </div>
            </div>
            `;
        this.$wrapper.innerHTML = lightbox;
        this.$filterFormWrapper.appendChild(this.$wrapper);
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
    showPreviousMedia() {
        if (this.mediaIndex > 0) {
            this.mediaIndex--;
            this.updateMedia();
        }
    }
    showNextMedia() {
        if (this.mediaList && this.mediaIndex < this.mediaList.length - 1) {
            this.mediaIndex++;
            this.updateMedia();
        }
    }
    updateMedia() {
        this.media = this.mediaList[this.mediaIndex];
        const urlParts = this.url.split("/"); // Décompose l'URL en parties séparées par "/"
        const parentPath = urlParts.slice(0, -1).join("/"); // Récupère toutes les parties de l'URL sauf la dernière (le nom du fichier)
        const newUrl = `${parentPath}/${this.media.image}`; // Construit la nouvelle URL en utilisant le titre du média
        this.url = newUrl;
        this.render();
    }
}
