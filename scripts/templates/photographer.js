class photographerCard {
    constructor(photographer, media, photographerName) {
        this.photographer = photographer
        this.media = media
        this.photographerName = photographerName
    }
    getHeader() {
        const $wrapper = document.createElement('div');
        const header = `
        <div class="cardsection">
        <article> 
        <h2>${this.photographer.name}</h2>
        <h3> ${this.photographer.city} , ${this.photographer.country} </h3>
        <p>${this.photographer.tagline}</p>
        </article>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div class="image ">
        <img alt="${this.photographer.name}" src="../../assets/photographers/${this.photographer.portrait}"/>
        </div>
        </div> 
        `
        $wrapper.innerHTML = header
        return $wrapper
    }
    getUserCardDOM() {
        const $wrapper = document.createElement('div')

        const photographerCard = `
        <article>
        <a href="photographer.html?id=${this.photographer.id}">
        <img alt="${this.photographer.name}" src="../../assets/photographers/${this.photographer.portrait}"/>
            </a>
            <h2>${this.photographer.name}</h2>
            <h3> ${this.photographer.city} , ${this.photographer.country} </h3>
            <p>
            <span>${this.photographer.tagline}</span>
            <span>${this.photographer.price}/jour</span> 
            </p>
        </article>
        `

        $wrapper.innerHTML = photographerCard
        return $wrapper
    }
    getUserCardMedia() {
        const $wrapper = document.createElement('div');
    
        if (this.media && this.media.image) { // Vérification de la définition de 'media' et de 'image'
            const photographerCardMedia = `
            <article>
                <div>
                    <div class="imagegalerie">
                        <img class="imggalerie" src="../assets/sample_photo/${this.photographerName}/${this.media.image}">
                    </div>
                    <div class="titregalerie">
                        <h4>${this.media.title}</h4>
                        <div class="divcoeur">
                            <p class="nombrelike">${this.media.likes}</p><img class="coeur" src="../../assets/coeur.png" alt="image coeur" tabindex="0">
                        </div>
                    </div>
                </div>
            </article>
            `;
        
            $wrapper.innerHTML = photographerCardMedia;
        } else {
            console.error("La propriété 'media' ou 'media.image' est indéfinie.");
        }
    
        return $wrapper;
    }
}    