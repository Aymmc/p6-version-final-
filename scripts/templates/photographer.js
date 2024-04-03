class photographerCard {
    constructor(photographer, media, photographerName, mediaItem, photographerPrice) {
        this.photographer = photographer
        this.media = media
        this.photographerName = photographerName
        this.mediaItem = mediaItem
        this.photographerPrice = photographerPrice
    }
    getHeader() {
        const $wrapper = document.createElement('div');
        const header = `
        <div class="cardsection">
        <article> 
        <h2 tabindex="0">${this.photographer.name}</h2>
        <h3 tabindex="0"> ${this.photographer.city} , ${this.photographer.country} </h3>
        <p tabindex="0">${this.photographer.tagline}</p>
        </article>
        <button class="contact_button" >Contactez-moi</button>
        <div class="image ">
        <img alt="${this.photographer.name}" src="../../assets/photographers/${this.photographer.portrait}"/>
        </div>
        </div> 
        `
        $wrapper.innerHTML = header
        return $wrapper
    }
    getUserCardDOM() {
        const photographer = this.photographer
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
            </p>
            <p>
            <span>${this.photographer.price}€/jour</span> 
            </p>
        </article>
        `
        $wrapper.innerHTML = photographerCard
        return $wrapper
    }
    getUserCardMedia() {
        const $wrapper = document.createElement('div');
        let mediaContent;
        if (this.media.video) {
            // Si la clé "video" est présente dans l'objet media, cela signifie qu'il s'agit d'une vidéo
            mediaContent = `
            <article alt="${this.media.title}">
                <div>
                    <a arial-label="cliquez ici pour ouvrir la lightbox" alt="${this.media.title}" href="../assets/sample_photo/${this.photographerName}/${this.media.video}">
                        <div class="videogalerie">
                            <video alt="${this.media.title}" class="video" controls>
                                <source src="../assets/sample_photo/${this.photographerName}/${this.media.video}" type="video/mp4">
                 
                            </video>
                        </div>
                    </a>
                    <div class="titregalerie">
                        <h4>${this.media.title}</h4>
                        <div class="divcoeur">
                            <p class="nombrelike">${this.media.likes}</p><img class="coeur" src="../../assets/coeur.png" alt=" ${this.media.likes} Likes Cliquer pour ajouté un like" tabindex="0">
                        </div>
                    </div>
                </div>
            </article>
            `;
        } else {
            // Si la clé "video" n'est pas présente, cela signifie qu'il s'agit d'une image (par défaut)
            mediaContent = `
            <article alt="${this.media.title}">
                <div>
                    <a tabindex=-1 arial-label="cliquez ici pour ouvrir la lightbox" alt="${this.media.title}" href="../assets/sample_photo/${this.photographerName}/${this.media.image}">
                        <div class="imagegalerie">
                            <img tabindex=0 class="imggalerie" alt="${this.media.title} cliquez ici pour ouvrir la lightbox" src="../assets/sample_photo/${this.photographerName}/${this.media.image}">
                        </div>
                    </a>
                    <div class="titregalerie">
                        <h4>${this.media.title}</h4>
                        <div class="divcoeur">
                            <p class="nombrelike">${this.media.likes}</p><img class="coeur" src="../../assets/coeur.png" alt=" ${this.media.likes} Likes Cliquer pour ajouté un like" tabindex="0">
                        </div>
                    </div>
                </div>
            </article>
            `;
        }
        $wrapper.innerHTML = mediaContent;
        return $wrapper;
    }
    getCompteurLike() {
        const $wrapper = document.createElement('div');
        $wrapper.classList.add('compteurargent')
        const compteur = `
        <div class="compteur"> ${app.totalLikes}<img class="coeur" src="../../assets/coeurnoir.svg" alt="image coeur noir" tabindex="0">
      </div>
      <div class="argent">
        <p>${app.price}€/jour </p>
      </div>
        `
        $wrapper.innerHTML = compteur;
        return $wrapper;
    }
}    