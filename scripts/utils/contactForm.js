const body = document.querySelector('.body')
const main = document.querySelector('#main')
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    body.classList.add('no-scroll');
    main.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.setAttribute('aria-hidden', 'false')
    body.classList.remove('no-scroll');
    modal.setAttribute('aria-hidden', 'true')

}

const formData = document.querySelectorAll(".formData");
const submit = document.querySelector('#submit')
modalBtn = document.querySelector('.contact_button')
// launch modal event
// btnclose.addEventListener('click', closemodal);
submit.addEventListener('click', launchModal);
// launch modal form
function launchModal() {
 
}
// close modal 
function closemodal() {
  modalbg.style.display = "none";
}// formulaire 
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  // Récupérer les valeurs des champs de formulaire
  const firstValue = document.getElementById("first").value.trim();
  const lastValue = document.getElementById("last").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const commentaireValue = document.getElementById('commentaire').value.trim();


  // Verifier pour le prenom
  if (firstValue.length < 2) {
    event.preventDefault();
  } else {

  }

  // Verifier pour le nom
  if (lastValue.length < 2) {
    event.preventDefault();
  } else {

  }

  // Verifier pour l'e-mail
  if (!isValidEmail(emailValue)) {
    event.preventDefault();
   
  } else {

  }
  if (commentaireValue.length < 2) {
    event.preventDefault();

  } else {
  }
  // Verifier pour le message de validation
  if (firstValue && lastValue && emailValue && commentaireValue) {
    console.log("Affichage de errorMsg8");
    console.log( firstValue, lastValue, emailValue, commentaireValue)
  } else {
    console.log("Affichage de errorMsg8block");

  }

});
