class Lightbox {

    /**
        * @param {string} url URL de l'image 
        */
       constructor(photographer, media , url) {
           this.photographer = photographer
           this.media = media
           const element = this.buildDOM(url)
           document.body.appendChild(element)
       }
    
       /**
        * @param {string} url URL de l'image 
        * @return {HTMLElement}
        */
       buildDOM(url) {
           const dom = document.createElement('div')
           dom.classList.add('lightbox')
           dom.innerHTML = `<button class="lightbox__close">Fermer</button>
               <button class="lightbox__next">Suivant</button>
               <button class="lightbox__prev">Précédent</button>
               <div class="lightbox__container"></div>`
           return dom
         }
   
   
   
   
   }