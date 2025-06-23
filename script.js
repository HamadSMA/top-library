const bookLibrary = [];

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to construct an object");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  bookLibrary.push(book);
}

function displayBook() {
  const booksContainer = document.querySelector(".books-container");
  booksContainer.innerHTML = "";
  bookLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const title = document.createElement("h3");
    title.textContent = book.title;
    const author = document.createElement("p");
    author.textContent = "By " + book.author;
    const isRead = document.createElement("p");
    isRead.textContent = book.isRead ? "Read" : "Not yet read";

    const bookButtons = document.createElement("div");
    bookButtons.setAttribute("class", "book-buttons");
    const readButton = document.createElement("button");
    readButton.textContent = "Toggle Read";
    const delButton = document.createElement("button");
    delButton.textContent = "Delete Book";

    card.append(title, author, isRead, bookButtons);
    bookButtons.append(readButton, delButton);
    booksContainer.append(card);
  });
}

const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {
  dialog.showModal();
});

const addToLibrary = document.querySelector(".addButton");
addToLibrary.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead =
    document.querySelector("input[name='yes-no']:checked").value === "true";

  addBookToLibrary(title, author, pages, isRead);
  displayBook();

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document
    .querySelectorAll("input[name='yes-no']")
    .forEach((el) => (el.checked = false));

  dialog.close();
});

addBookToLibrary("Game Programming Patterns", "Robert Nystrom", 354, false);
addBookToLibrary("Eloquent JavaScript", "Marijn Haverbake", 472, false);
displayBook();
