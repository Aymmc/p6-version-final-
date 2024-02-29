class Lightbox {

 /**
     * @param {string} url URL de l'image 
     */
   static init() {
        const links = document.querySelectorAll(a[href$ = '.png'], a[href$ = '.jpg'], a[href$ = '.jpeg'])
        .forEach(link => link.addEventListener('click', e =>{
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'))
        }))
    }
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
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
      }




}