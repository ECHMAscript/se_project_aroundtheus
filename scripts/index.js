/**
 * Saves the changes from the form and updates
 * the user's profile information
 * @param {*} e (event object)
 */
function saveChanges(e, m, formDetails) {
  e.preventDefault();
  // profileName.textContent = modalNameField.value;
  // profileJob.textContent = modalJobField.value;

  formDetails.profile.querySelector(".profile__profile-name").textContent =
    formDetails.input.querySelector(".name-field").value;

  formDetails.profile.querySelector(".profile__profile-job").textContent =
    formDetails.input.querySelector(".job-field").value;

  closeModal(m, "modal_opened");
}

/**
 * Opens the modal
 */
function openModal(m, formDetails) {
  m.classList.add("modal_opened");
  m.classList.add("display-img-modal-visibility");

  if (formDetails !== "") {
    formDetails.input.querySelector(".name-field").value =
      formDetails.profile.querySelector(".profile__profile-name").textContent;

    formDetails.input.querySelector(".job-field").value =
      formDetails.profile.querySelector(".profile__profile-job").textContent;
  }
}

/**
 * Close the modal
 */
function closeModal(m, className) {
  m.classList.remove(className);

  setTimeout(() => {
    m.classList.remove("display-img-modal-visibility");
  }, 300);
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

function createCard() {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__name").textContent =
    addCardModal.querySelector(".title-field").value;
  cardElement.querySelector(".card__image").src =
    addCardModal.querySelector(".link-field").value;
  cardElement.querySelector(".card__image").alt =
    addCardModal.querySelector(".title-field").value;

  console.log(cardElement);

  return cardElement;
}

function openCardImageModal(card) {
  console.log(card);
  const imageURL = document.querySelector(".image-modal__image");
  const imageTitle = document.querySelector(".image-modal__image-title");

  imageURL.src = card.querySelector(".card__image").src;
  imageTitle.textContent = card.querySelector(".card__name").textContent;

  imgModal.classList.add("display-img-modal");
  imgModal.classList.add("display-img-modal-visibility");
}

function likeCard(card) {
  let cardSrc = card.querySelector(".card__like-button-svg").src;
  console.log(cardSrc);
  if (cardSrc.includes("svg/heart.svg")) {
    card.querySelector(".card__like-button-svg").src = "svg/black-heart.svg";
  } else {
    card.querySelector(".card__like-button-svg").src = "svg/heart.svg";
  }
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
let closeModalBtn = document.querySelector(".editProfile .form__close-btn");
let addCardModal = document.querySelector(".addNewCardModal");

let modal = document.querySelector(".editProfile");
let modalNameField = modal.querySelector(".editProfile .name-field");
let modalJobField = modal.querySelector(".editProfile .job-field");
let profileName = profile.querySelector(".profile__profile-name");
let profileJob = profile.querySelector(".profile__profile-job");
let formSaveBtn = modal.querySelector(".form__button");
let cardTemplate = document.querySelector("#card").content;
let gallery = document.querySelector(".gallery");
let form = document.querySelector(".editProfile .form");
const addCardBtn = document.querySelector(".profile__add-button");
const imgModal = document.querySelector(".image-modal");

/*
    Propagate the page with cards with information drawn from
    the initialCards array
*/

initialCards.forEach((card) => {
  gallery.append(getCardElement(card));
});

// Call the openModal function
editProfile.addEventListener("click", () => {
  let formModal = {
    profile: profile,
    input: modal,
  };
  openModal(modal, formModal);
});

// Call the closeModal function
closeModalBtn.addEventListener("click", () => {
  closeModal(modal, "modal_opened");
});

// Call the saveChanges function
form.addEventListener("submit", (e) => {
  let formModal = {
    profile: profile,
    input: modal,
  };
  saveChanges(e, modal, formModal);
});

addCardBtn.addEventListener("click", () => {
  openModal(addCardModal, "");
});

addCardModal.querySelector(".form__close-btn").addEventListener("click", () => {
  closeModal(addCardModal, "modal_opened");
});

addCardModal.querySelector(".form__button").addEventListener("click", () => {
  gallery.append(createCard());
  closeModal(addCardModal, "modal_opened");
});

gallery.addEventListener("click", (e) => {
  // Open the image modal
  if (e.target.closest(".card")) {
    if (
      !e.target.closest(".card__trash-btn") &&
      !e.target.closest(".card__like-button")
    ) {
      let card = e.target.closest(".card");

      openCardImageModal(card);
    }
  }
});

gallery.addEventListener("click", (e) => {
  // Open the image modal
  if (e.target.closest(".card__trash-btn")) {
    let card = e.target.closest(".card");
    card.remove();
    console.log(card);
    console.log("Did you just try to delete me???!");
  }
});

gallery.addEventListener("click", (e) => {
  // Like an image
  if (e.target.closest(".card__like-button")) {
    let card = e.target.closest(".card");

    likeCard(card);
    console.log("Thanks for the likes!");
  }
});

imgModal
  .querySelector(".image-modal__close-button")
  .addEventListener("click", () => {
    closeModal(imgModal, "display-img-modal");
  });
