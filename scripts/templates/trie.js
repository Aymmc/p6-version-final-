class ProxyRatingSorter {
    // Constructeur de la classe
    constructor() {
        // Initialisation d'un tableau vide pour le cache
        this.cache = []
    }
    // Méthode asynchrone pour trier les medias avec mise en cache
    async sorter(media, orderBy) {
        // Recherche d'un résultat déjà mis en cache pour cet orderBy
        const cachedResult = this.cache.find(elt => elt.key === orderBy)
        // Vérification si un résultat est trouvé dans le cache
        if (cachedResult) {
            // Affichage d'un message indiquant que les données sont récupérées depuis le cache
            // Retourne le résultat trouvé dans le cache
            return cachedResult
        }
        // Si aucune donnée n'est trouvée dans le cache, appelle l'API pour effectuer le tri
        const data = await RatingSorterApi.sorter(media, orderBy)

        // Ajoute les données triées au cache pour une utilisation ultérieure
        this.cache.push(data)
        // Retourne les données triées
        return data
    }
}
class RatingSorterApi {
    // Définit une méthode statique pour trier les données selon un critère spécifié
    static async sorter(data, orderBy) {
        // Vérifie le critère de tri spécifié
        if (orderBy === 'date') {
            // Si le critère est 'date', effectue un tri par date
            return new Promise((resolve) => {
                // Retourne une promesse pour effectuer le tri de manière asynchrone
                setTimeout(() => {
                    // Utilise setTimeout pour simuler une opération asynchrone
                    const result = {
                        key: orderBy, // Clé du critère de tri
                        data: Array.from(data).sort( // Trie les données par date
                            (a, b) => new Date(a.date) - new Date(b.date))
                    };
                    resolve(result); // Résout la promesse avec le résultat du tri
                }, 1000); // Délai d'attente de 1 seconde (simulé)
            });
        } else if (orderBy === 'popularity') {
            // Si le critère est 'popularity', effectue un tri par popularité (nombre de likes)
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy, // Clé du critère de tri
                        data: Array.from(data).sort((a, b) => b.likes - a.likes) // Trie les données par popularité décroissante
                    };
                    resolve(result); // Résout la promesse avec le résultat du tri
                }, 1000); // Délai d'attente de 1 seconde (simulé)
            });
        } else if (orderBy === 'Titre') {
            // Si le critère est 'Titre', effectue un tri alphabétique par titre
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy, // Clé du critère de tri
                        data: Array.from(data).sort(function (a, b) {
                            return a.title.localeCompare(b.title); // Trie les données par titre (ordre alphabétique)
                        })
                    };
                    resolve(result); // Résout la promesse avec le résultat du tri
                }, 1000); // Délai d'attente de 1 seconde (simulé)
            });
        } else {
            // Si le critère de tri n'est pas reconnu, lance une erreur
            throw 'unknow orderBy type'; // Lance une erreur avec un message spécifié
        }
    }
}
