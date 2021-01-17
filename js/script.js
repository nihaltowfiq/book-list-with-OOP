// Get the UI element
let form = document.querySelector("#bookForm");

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
  constructor() {}

  addToBookList(book) {
    let list = document.querySelector("#bookList");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td> 
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showAlert(message, className) {
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
}

// add event listener
form.addEventListener("submit", addNewBook);

// define functions
function addNewBook(e) {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  let ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the fields!", "error");
  } else {
    let book = new Book(title, author, isbn);

    ui.addToBookList(book);

    ui.clearFields();

    ui.showAlert("Book added!", "success");
  }

  e.preventDefault();
}
