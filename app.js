"use strict";
// Grab Elements
const bookContainer = document.querySelector("[data-book-container]");
const addBookModal = document.querySelector("#add-book-modal");
const addBookBtn = document.querySelector("[data-add-book-btn]");
const addBookForm = document.querySelector("#modal-form");
const modalCloseBtn = document.querySelector("#modal-close-btn");

// Array to store books
let myLibrary = [];

// Book constructor
function Book(title, author, pageCount, isRead, id) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

// Open Modal
addBookBtn.addEventListener("click", () => {
  addBookForm.reset();
  addBookModal.showModal();
});

// Close Modal
modalCloseBtn.addEventListener("click", () => {
  addBookForm.reset();
  addBookModal.close();
});

// Event Listener to add Book to library
addBookModal.addEventListener("close", () => {
  let newBook = getABook(); // Get new book

  addBookToLibrary(newBook); // Add book to library

  updateDisplay();
});

// Get new book details
function getABook() {
  const bookTitleEl = document.querySelector("#modal-book-title");
  const bookAuthorEl = document.querySelector("#modal-author");
  const pageCountEl = document.querySelector("#modal-page-count");
  const isReadEl = document.querySelector("#isBookRead");

  let newBook = new Book(
    bookTitleEl.value,
    bookAuthorEl.value,
    pageCountEl.value,
    isReadEl.value
  );

  return newBook;
}

// Function to add book to library after validation
function addBookToLibrary(book) {
  if (!book.title) return;
  else myLibrary.push(book);

  return book;
}

// Create a Book Card
function createBook(fromBookObj) {
  let bookItem = document.createElement("article");
  bookItem.dataset.bookItem = "";
  bookItem.classList.add("book");

  let bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");
  bookItem.append(bookDetails);

  let bookTitle = document.createElement("h2");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = fromBookObj.title;
  bookDetails.append(bookTitle);

  let bookAuthor = document.createElement("h3");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = fromBookObj.author;
  bookDetails.append(bookAuthor);

  let bookPageCount = document.createElement("p");
  bookPageCount.classList.add("book-page-count");
  bookPageCount.textContent = fromBookObj.pageCount + " Pages";
  bookDetails.append(bookPageCount);

  let bookButtonsContainer = document.createElement("div");
  bookButtonsContainer.classList.add("book-buttons-container");
  bookItem.append(bookButtonsContainer);

  let readButton = document.createElement("button");
  readButton.setAttribute("type", "button");
  readButton.innerText = fromBookObj.isRead;
  if (fromBookObj.isRead === "Read") {
    readButton.classList.add("btn", "book-btn", "read-toggle");
  } else {
    readButton.classList.add("btn", "book-btn", "read-toggle", "not-read");
  }

  bookButtonsContainer.append(readButton);

  let removeButton = document.createElement("button");
  removeButton.setAttribute("type", "button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("btn", "book-btn", "remove-book");
  bookButtonsContainer.append(removeButton);

  return bookItem;
}

// Function to update Dislay
function updateDisplay() {
  // Empty container
  bookContainer.innerHTML = "";

  // Load screen again
  myLibrary.forEach((book) => {
    let createdBook = createBook(book);
    bookContainer.append(createdBook);
  });
}

// Event Listener to remove books
bookContainer.addEventListener("click", removeBook);

// Function to remove book
function removeBook(e) {
  // Turning html book Elements to book Array
  let booksArray = Array.from(bookContainer.children);

  if (e.target.matches("button.remove-book")) {
    let clickedBookItem = e.target.parentElement.parentElement;
    let clickedBookIndex = booksArray.indexOf(clickedBookItem);
    myLibrary.splice(clickedBookIndex, 1);
    updateDisplay();
  }
}

// Event Listener to remove books
bookContainer.addEventListener("click", toggleRead);

function toggleRead(e) {
  if (e.target.matches("button.read-toggle")) {
    let readBtn = e.target;
    readBtn.innerText = "Read";
    readBtn.classList.remove("not-read");
  }
}
