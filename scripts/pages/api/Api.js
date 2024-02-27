class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log('an error occurs', err))
    }
}


class photographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        const photographersData = await this.get();
        this.photographersData = photographersData.photographers;
        return await this.photographersData
    }

    async getMedias() {
        const photographersData = await this.get();
        this.mediaData = photographersData.media;
        return await this.mediaData
    }
}