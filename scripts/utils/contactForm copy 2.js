class Modal {
  constructor(photographer) {
    this.photographer = photographer,
      // Création d'un élément div pour le wrapper du formulaire de tri
      this.$wrapper = document.createElement('div');
    // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
    this.$wrapper.classList.add('contact_modal');
    this.$filterFormWrapper = document.querySelector('body');
    console.log('test')
  }
  
  
  render() {

    const Modale =

      `
          <form name="reserve" action="index.html" method="get" id="form">
  <div id="contact_modal">
    <div role="dialog" class="modal" aria-describedby="contact">
      <div class="headermodal">
        <div>
          <h2> Contactez moi</h2>
          <img class="fermermodale"src="assets/icons/close.svg"  alt="Fermer Modal" />
        </div>
        

      </div>
      <div class="modaltitre">
<h2></h2>
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
        </form>`
    // Injecte le HTML du formulaire dans le wrapper du formulaire

    this.$wrapper.innerHTML = Modale;

    // Ajoute le formulaire rendu au wrapper du formulaire dans le document
    this.$filterFormWrapper.appendChild(this.$wrapper);

  }

}