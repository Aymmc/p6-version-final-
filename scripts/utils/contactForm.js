class Modal {
    constructor(photographer) {
        this.photographer = photographer,
            // Création d'un élément div pour le wrapper du formulaire de tri
            this.$wrapper = document.createElement('div');
        // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
        this.$wrapper.classList.add('contact_modal');
        this.$filterFormWrapper = document.querySelector('body');
        this.body = document.querySelector('body')
        this.modalcontent = document.querySelector('.contact_modal')
        this.main = document.querySelector('main')
    }
    closeModal() {
        this.$wrapper.style.display = 'none'
        this.body.classList.remove('no-scroll')
        this.main.classList.add('block')
        this.main.classList.remove('none')
    }
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    render() {
        const Modale = `
        <form name="reserve" action="index.html" method="get" id="form">
            <div id="contact_modal" aria-hidden=true role="dialog" aria-describedby="modalTitle" >
                <div role="dialog" class="modal" aria-hidden=true aria-describedby="contact">
                    <div class="headermodal">
                        <div>
                            <h2 tabindex= 300 > Contactez moi</h2>
                            
                            <button class="fermermodale">
                            <img class="fermermodale" src="assets/icons/close.svg" alt="Fermer Modal" />
                            </button>
                        </div>
                        <h2 tabindex="101" > ${app.name}</h2>
                    </div>
                    <div class="modaltitre">
                        
                    </div>
                    <div class="formData">
                        <label for="first">Prénom</label><br>
                        <input class="text-control" type="text" id="first" name="first" minlength="2" /><br>
                    </div>
                    <div class="formData">
                        <label for="last">Nom</label><br>
                        <input class="text-control" type="text" id="last" name="last" minlength="2" /><br>
                    </div>
                    <div class="formData">
                        <label for="email">E-mail</label><br>
                        <input class="text-control" type="email" id="email" name="email" /><br>
                    </div>
                    <div class="formMessage">
                        <label for="Commentaire">Commentaire</label><br>
                        <input class="text-control" type="commentaire" id="commentaire" name="commentaire" /><br>
                    </div>
                    <input class="contact_button" type="submit" class="button" value="C'est parti" id="submit" />
                </div>
            </div>
        </form>`;
        this.$wrapper.innerHTML = Modale;
        // Ajout du gestionnaire d'événements
        this.$wrapper.querySelector(".fermermodale").addEventListener("click", (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            this.closeModal();
        });
        this.$wrapper.querySelector("#form").addEventListener("submit", (event) => {
            event.preventDefault();
            const firstValue = document.getElementById("first").value.trim();
            const lastValue = document.getElementById("last").value.trim();
            const emailValue = document.getElementById("email").value.trim();
            const commentaireValue = document.getElementById('commentaire').value.trim();
            if (firstValue.length < 2 || lastValue.length < 2 || !this.isValidEmail(emailValue) || commentaireValue.length < 2) {
                console.log("Veuillez remplir correctement tous les champs.");
                console.log(lastValue)
            } else {
                // Vous pouvez effectuer ici les actions nécessaires après la validation réussie du formulaire
                console.log("Formulaire valide :", firstValue, lastValue, emailValue, commentaireValue);
            }
        });
        // Ajoute le formulaire rendu au wrapper du formulaire dans le document
        this.$filterFormWrapper.appendChild(this.$wrapper);
    }
}