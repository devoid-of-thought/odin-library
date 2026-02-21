// Add your JavaScript code here

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

class myLibrary {
  constructor() {
    this.books = [];
  }
  addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
  }
  displayBooks(id) {
    const bookList = document.getElementById(id);
    bookList.innerHTML = '';
    this.books.forEach(book => {
      const bookItem = document.createElement('tr');
      bookItem.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read ? 'Yes' : 'No'}</td>
        <td><button class="toggle-read-btn" data-id="${book.id}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button></td>
        <td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
      `;
      bookList.appendChild(bookItem);
    });
  }
}

myLib = new myLibrary();

let wanderingInn = new Book("The Wandering Inn Volume 1", "Pirateaba", 1362, true);
myLib.addBookToLibrary(wanderingInn.title, wanderingInn.author, wanderingInn.pages, wanderingInn.read);

const addBookButton = document.getElementById('add-book-btn');
const bookDialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');

addBookButton.addEventListener('click', () => {
  bookDialog.showModal();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInpt = document.getElementById('title');
  const authorInpt = document.getElementById('author');
  const pagesInpt = document.getElementById('pages');
  const read = document.getElementById('read').checked;

  titleInpt.setCustomValidity("");
  authorInpt.setCustomValidity("");
  pagesInpt.setCustomValidity("");

  if (titleInpt.value.trim() === "") {  
    titleInpt.setCustomValidity("Please enter a title.");
    titleInpt.reportValidity();
    return;
  }
  if (authorInpt.value.trim() === "") {
    authorInpt.setCustomValidity("Please enter an author.");
    authorInpt.reportValidity();
    return;
  }
  if (isNaN(pagesInpt.value) || parseInt(pagesInpt.value) <= 0) {
    pagesInpt.setCustomValidity("Please enter a valid number of pages.");
    pagesInpt.reportValidity(); 
    return;
  }


  myLib.addBookToLibrary(titleInpt.value.trim(), authorInpt.value.trim(), parseInt(pagesInpt.value), read);
  bookDialog.close();
  myLib.displayBooks("book-table-body");

});

let updateButtons = document.getElementsByClassName('toggle-read-btn');
let deleteButtons = document.getElementsByClassName('delete-btn');
const bookTableBody = document.getElementById('book-table-body');
bookTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-read-btn')) {
    const bookId = e.target.getAttribute('data-id');
    const book = myLib.books.find(b => b.id === bookId);
    if (book) {
      book.toggleRead();
      myLib.displayBooks("book-table-body");
    }
  } else if (e.target.classList.contains('delete-btn')) {
    const bookId = e.target.getAttribute('data-id');
    myLib.books = myLib.books.filter(b => b.id !== bookId);
    myLib.displayBooks("book-table-body");
  } 
});

myLib.displayBooks("book-table-body");