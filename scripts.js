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
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;
  myLib.addBookToLibrary(title, author, pages, read);
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