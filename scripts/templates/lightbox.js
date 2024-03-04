class Lightbox {
    constructor(photographer, media, url) {
        this.photographer = photographer,
            this.media = media,
            this.url = url
        // Création d'un élément div pour le wrapper du formulaire de tri
        this.$wrapper = document.createElement('div');
        // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
        this.$wrapper.classList.add('lightbox');
        this.$filterFormWrapper = document.querySelector('body');

    }
    closeModal(){
        this.$filterFormWrapper.removeChild(this.$wrapper);
    
      }
    setUrl(url) {
        this.url = url
    }
    render(url) {
        //  console.log(this.url)
        const lightbox =

            `
            <div class="divcontainer">
            <button class="lightbox__close">Fermer</button>
               <button class="lightbox__next">Suivant</button>
               <button class="lightbox__prev">Précédent</button>
               <div class="lightbox__container">
               <img src="${this.url}">
               </div>
               <div class="lightbox__name">
               </div>
               </div>`




        // Injecte le HTML du formulaire dans le wrapper du formulaire
        this.$wrapper.innerHTML = lightbox;

        // Ajoute le formulaire rendu au wrapper du formulaire dans le document
        this.$filterFormWrapper.appendChild(this.$wrapper);
        console.log("Affichage de l'image dans la lightbox :", url);
        this.$wrapper.querySelector(".lightbox__close").addEventListener("click", (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            this.closeModal();
        });
    }
    

}