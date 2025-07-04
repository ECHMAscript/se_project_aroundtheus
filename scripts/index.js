



const toggleButtonState = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(".form__input-fields"));
  const formButton = formElement.closest(".form").querySelector(".form__button");

  // Modify this to check the entire list not just for some
  if (hasInvalidInput(inputList)) {
    formButton.classList.add("button_inactive")
  } else {
    formButton.classList.remove("button_inactive")
  }

  // const formButton = formElement.closest(".form").querySelector(".form__button");
  // if (!inputElement.validity.valid) {
  //   formButton.classList.add("button_inactive");
  // } else {
  //   formButton.classList.remove("button_inactive");
  // }

  
};



/**
 * Saves the changes from the form and updates
 * the user's profile information
 * @param {*} e (event object)
 */
function saveProfileChanges(e, modal) {
  e.preventDefault();

  profileName.textContent = profileNameFieldInput.value;

  profileJob.textContent = profileJobFieldInput.value;

  closePopup(modal);
}

/**
 * Opens the popup
 */
function openPopup(popup) {
  popup.classList.add("modal_opened");

}

/**
 * Close the modal
 */
function closePopup(popup) {
  // remove the class from modal to close it
  popup.classList.remove("modal_opened");
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
  const cardLikeButton = cardElement.querySelector(".card__like-button svg");

  cardElement.querySelector(".card__name").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Like Card
  cardLikeButton.addEventListener("click", (e) => {
    if (e.target.closest(".card__like-button")) {
      likeCard(cardLikeButton);
    }
  });

  // Delete Card
  cardElement
    .querySelector(".card__trash-btn")
    .addEventListener("click", (e) => {
      if (e.target.closest(".card__trash-btn")) {
        cardElement.remove();
      }
    });

  // Open card modal
  cardImage.addEventListener("click", (e) => {
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

  });

  return cardElement;
}

function openCardImageModal(card) {
  // Set their values to the value of the card that was clicked
  image.src = card.querySelector(".card__image").src;
  image.alt = card.querySelector(".card__name").textContent;
  imageTitle.textContent = card.querySelector(".card__name").textContent;

  // Make the modal visible

  openPopup(imgModal);
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_active");
}

// Initialize variables
const initialCards = [
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
const profileName = profile.querySelector(".profile__profile-name");
const profileJob = profile.querySelector(".profile__profile-job");
const editProfileModal = page.querySelector(".editProfile");
const editProfileButton = profile.querySelector(".profile__edit-profile");
const profileNameFieldInput = editProfileModal.querySelector(".name-field");
const profileJobFieldInput = editProfileModal.querySelector(".job-field");
const closeEditModalBtn = page.querySelector(".editProfile .modal__close");
const addCardModal = page.querySelector(".addNewCardModal");
const addCardModalTitleField = addCardModal.querySelector(".title-field");
const addCardModalLinkField = addCardModal.querySelector(".link-field");
const cardTemplate = page.querySelector("#card").content;
const gallery = page.querySelector(".gallery");
const editProfileForm = page.querySelector(".editProfile .form");
const editProfileFormNameField = editProfileForm.querySelector(".name-field");
const editProfileFormJobField = editProfileForm.querySelector(".job-field");
const addCardBtn = page.querySelector(".profile__add-button");
const imgModal = page.querySelector(".image-modal");
const image = imgModal.querySelector(".image-modal__image");
const imageTitle = imgModal.querySelector(".image-modal__image-title");





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

  editProfileFormNameField.value = profileName.textContent;
  editProfileFormJobField.value = profileJob.textContent;
});

// Call the closeModal function
closeEditModalBtn.addEventListener("click", () => {
  closePopup(editProfileModal);
});

// Call the saveChanges function
editProfileForm.addEventListener("submit", (e) => {
  saveProfileChanges(e, editProfileModal);
});

addCardBtn.addEventListener("click", () => {

  const form = addCardModal.querySelector(".form")
  let inputFields = Array.from(addCardModal.querySelectorAll(".form__input-fields"));
  
  inputFields.forEach(field => field.value = "");

  toggleButtonState(form);
  openPopup(addCardModal);
});

// Close the add card modal
addCardModal.querySelector(".modal__close").addEventListener("click", () => {
  closePopup(addCardModal);
});

// Create a new card
addCardModal.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const card = {
    name: addCardModalTitleField.value,
    link: addCardModalLinkField.value,
  };


  gallery.prepend(getCardElement(card));
  closePopup(addCardModal);

  addCardModalTitleField.value = "";
  addCardModalLinkField.value = "";
});

imgModal.querySelector(".modal__close").addEventListener("click", () => {
  closePopup(imgModal);
});


// FINISH IMPLEMENTING THIS!
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__inputs",
  submitButtonSelector: "",
  inactiveButtonClass: "",
  inputErrorClass: "",
  errorClass: ""
});


page.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    const container = modal.querySelector('.modal__container') || modal.querySelector('.image-modal__inner-container');

    if (!container.contains(e.target)) {
      modal.classList.remove('modal_opened'); 
    }
  });


});


document.addEventListener("keydown", (e) => {
  page.querySelectorAll(".modal").forEach(modal => {
    if (e.key === "Escape") modal.classList.remove('modal_opened');
  });

})
