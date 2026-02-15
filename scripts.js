// Add your JavaScript code here
let myLibrary = [{id: 1, title: "The Wandering inn Volume 1", author: "Pirateaba", pages: 1362, read: true}];

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

function displayBooks() {
  const bookList = document.getElementById('book-table-body');
  bookList.innerHTML = '';
  myLibrary.forEach(book => {
    const bookItem = document.createElement('tr');
    bookItem.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? 'Yes' : 'No'}</td>
    `;
    bookList.appendChild(bookItem);
  });
}
displayBooks();