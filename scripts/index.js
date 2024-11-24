/**
 * Saves the changes from the form and updates
 * the user's profile information
 * @param {*} e (event object)
 */
function saveProfileChanges(e, modal, formDetails) {
  e.preventDefault();

  formDetails.profile.querySelector(".profile__profile-name").textContent =
    formDetails.input.querySelector(".name-field").value;

  formDetails.profile.querySelector(".profile__profile-job").textContent =
    formDetails.input.querySelector(".job-field").value;

  closePopup(modal, "modal_opened");
}

/**
 * Opens the popup
 */
function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.classList.add("display-img-modal-visibility");
}

/**
 * Close the modal
 */
function closePopup(m) {
  // remove the class from modal to close it
  m.classList.remove("modal_opened");

  // After the animation is finished remove the visibility of the modal
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
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__name").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Like Card
  cardElement.addEventListener("click", (e) => {
    if (e.target.closest(".card__like-button")) {
      likeCard(cardElement);
    }
  });

  // Delete Card
  cardElement.addEventListener("click", (e) => {
    if (e.target.closest(".card__trash-btn")) {
      console.log("wow");
      cardElement.remove();
    }
  });

  // Open card modal
  cardElement.addEventListener("click", (e) => {
    // Make sure what was clicked was not the delete button or like button
    if (e.target.closest(".card")) {
      if (
        !e.target.closest(".card__trash-btn") &&
        !e.target.closest(".card__like-button")
      ) {
        // Get the card information and pass it to the open card modal function
        openCardImageModal(cardElement);
      }
    }

    console.log("Did I even get this far?");
  });

  return cardElement;
}

function openCardImageModal(card) {
  // Get the modal img url and img title fields
  const image = imgModal.querySelector(".image-modal__image");
  const imageTitle = imgModal.querySelector(".image-modal__image-title");

  // Set their values to the value of the card that was clicked
  image.src = card.querySelector(".card__image").src;
  image.alt = card.querySelector(".card__name").textContent;
  imageTitle.textContent = card.querySelector(".card__name").textContent;

  // Make the modal visible
  imgModal.classList.add("modal_opened");
  imgModal.classList.add("display-img-modal-visibility");
}

function likeCard(card) {
  // Get the src of the card
  let cardSrc = card.querySelector(".card__like-button-svg").src;

  // Check if the card is currently liked or not
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

const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const editProfileModal = page.querySelector(".editProfile");
const editProfileButton = profile.querySelector(".profile__edit-profile");

const closeEditModalBtn = page.querySelector(".editProfile .modal__close");
const addCardModal = page.querySelector(".addNewCardModal");

const cardTemplate = page.querySelector("#card").content;
const gallery = page.querySelector(".gallery");
const editProfileForm = page.querySelector(".editProfile .form");
const addCardBtn = page.querySelector(".profile__add-button");
const imgModal = page.querySelector(".image-modal");

/*
    Propagate the page with cards with information drawn from
    the initialCards array
*/

initialCards.forEach((card) => {
  gallery.append(getCardElement(card));
});

// Call the openModal function
editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModal);

  console.log(editProfileForm.querySelector(".name-field"));
  editProfileForm.querySelector(".name-field").value = profile.querySelector(
    ".profile__profile-name"
  ).textContent;
  editProfileForm.querySelector(".job-field").value = profile.querySelector(
    ".profile__profile-job"
  ).textContent;
});

// Call the closeModal function
closeEditModalBtn.addEventListener("click", () => {
  closePopup(editProfileModal, "modal_opened");
});

// Call the saveChanges function
editProfileForm.addEventListener("submit", (e) => {
  let formModal = {
    profile: profile,
    input: editProfileModal,
  };
  saveProfileChanges(e, editProfileModal, formModal);
});

addCardBtn.addEventListener("click", () => {
  openPopup(addCardModal);
});

// Close the add card modal
addCardModal.querySelector(".modal__close").addEventListener("click", () => {
  closePopup(addCardModal);
});

// Create a new card
addCardModal.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  card = {
    name: addCardModal.querySelector(".title-field").value,
    link: addCardModal.querySelector(".link-field").value,
  };

  gallery.prepend(getCardElement(card));
  closePopup(addCardModal, "modal_opened");

  addCardModal.querySelector(".title-field").value = "";
  addCardModal.querySelector(".link-field").value = "";
});

imgModal.querySelector(".modal__close").addEventListener("click", () => {
  closePopup(imgModal, "display-img-modal");
});
