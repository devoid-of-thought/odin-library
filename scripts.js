// Add your JavaScript code here
let myLibrary = [new Book("The Wandering Inn Volume 1", "Pirateaba", 1362, true)];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  
}

function addBookToLibrary(title,author,pages,read) {
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function displayBooks() {
  const bookList = document.getElementById('book-table-body');
  bookList.innerHTML = '';
  myLibrary.forEach(book => {
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
  addBookToLibrary(title, author, pages, read);
  bookDialog.close();
  displayBooks();
});

let updateButtons = document.getElementsByClassName('toggle-read-btn');
let deleteButtons = document.getElementsByClassName('delete-btn');
const bookTableBody = document.getElementById('book-table-body');
bookTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-read-btn')) {
    const bookId = e.target.getAttribute('data-id');
    const book = myLibrary.find(b => b.id === bookId);
    if (book) {
      book.toggleRead();
      displayBooks();
    }
  } else if (e.target.classList.contains('delete-btn')) {
    const bookId = e.target.getAttribute('data-id');
    myLibrary = myLibrary.filter(b => b.id !== bookId);
    displayBooks();
  } 
});
displayBooks();