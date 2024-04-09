class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url; // Définit la propriété _url de l'instance de la classe avec la valeur passée en paramètre
    }

    async get() {
        return fetch(this._url) // Effectue une requête HTTP GET vers l'URL stockée dans _url
            .then(res => res.json()) // Transforme la réponse en JSON
            .then(res => res) // Renvoie les données JSON
            .catch(err => console.log('an error occurs', err)); // Affiche une erreur si la requête échoue
    }
}

class photographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url); // Appelle le constructeur de la classe parente (Api) avec l'URL passée en paramètre
    }

    async getPhotographers() {
        const photographersData = await this.get(); // Appelle la méthode get() de la classe parente pour récupérer les données
        this.photographersData = photographersData.photographers; // Stocke les données des photographes dans une propriété de la classe
        return await this.photographersData; // Renvoie les données des photographes
    }

    async getMedias() {
        const photographersData = await this.get(); // Appelle la méthode get() de la classe parente pour récupérer les données
        this.mediaData = photographersData.media; // Stocke les données des médias dans une propriété de la classe
        return await this.mediaData; // Renvoie les données des médias
    }
}
