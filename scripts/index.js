/**
 * Saves the changes from the form and updates
 * the user's profile information
 * @param {*} e (event object)
 */
function saveChanges(e) {
  e.preventDefault();
  profileName.textContent = modalNameField.value;
  profileJob.textContent = modalJobField.value;

  closeModal();
}

/**
 * Opens the modal
 */
function openModal() {
  modal.classList.add("modal_opened");

  modalNameField.value = profileName.textContent;
  modalJobField.value = profileJob.textContent;
}

/**
 * Close the modal
 */
function closeModal() {
  modal.classList.remove("modal_opened");
}

/**
 * Clones the card element template and fills the card element with the
 * data from the initialCards array
 * @param {*} data (Array Data)
 * @returns <Card Element>
 */
function getCardElement(data) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__name").textContent = data.name;
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;

  return cardElement;
}

// Initialize variables
let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
let profile = document.querySelector(".profile");
let editProfile = profile.querySelector(".profile__edit-profile");
let closeModalBtn = document.querySelector(".form__close-btn");
let modal = document.querySelector(".modal");
let modalNameField = modal.querySelector(".name-field");
let modalJobField = modal.querySelector(".job-field");
let profileName = profile.querySelector(".profile__profile-name");
let profileJob = profile.querySelector(".profile__profile-job");
let formSaveBtn = modal.querySelector(".form__button");
let cardTemplate = document.querySelector("#card").content;
let gallery = document.querySelector(".gallery");
let form = document.querySelector(".form");

console.log(modalJobField, modalNameField);

/*
    Propagate the page with cards with information drawn from
    the initialCards array
*/
for (let i = 0; i < initialCards.length; i++) {
  // Create card
  let card = getCardElement(initialCards[i]);

  // Add card to the gallery
  gallery.append(card);
}

// Call the openModal function
editProfile.addEventListener("click", openModal);

// Call the closeModal function
closeModalBtn.addEventListener("click", closeModal);

// Call the saveChanges function
form.addEventListener("submit", saveChanges);
