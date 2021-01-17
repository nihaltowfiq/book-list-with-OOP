// Get the UI element
let form = document.querySelector("#bookForm");
let bookList = document.querySelector("#bookList");

// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  static addToBookList(book) {
    let list = document.querySelector("#bookList");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td> 
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector(".container");
    let form = document.querySelector("#bookForm");
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static deleteFromBookList(target) {
    if (target.hasAttribute("href")) {
      target.parentElement.parentElement.remove();
      UI.showAlert("Book removed!", "success");
    }
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    let books = Store.getBooks();
    books.forEach((book) => {
      UI.addToBookList(book);
    });
  }
}

// add event listener
form.addEventListener("submit", addNewBook);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", Store.displayBooks());

// define functions
function addNewBook(e) {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all the fields!", "error");
  } else {
    let book = new Book(title, author, isbn);

    UI.addToBookList(book);
    Store.addBook(book);
    UI.clearFields();
    UI.showAlert("Book added!", "success");
  }
  e.preventDefault();
}

function removeBook(e) {
  UI.deleteFromBookList(e.target);
  e.preventDefault();
}
